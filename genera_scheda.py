#!/usr/bin/env python3
"""
Scheda di produzione + packing list (una per ordine).

Uso: python3 genera_scheda.py payload.json out.pdf

Riempie template_produzione.xlsx (fogli SCHEDA_PRODUZIONE e PACKING_LIST):
- testata (righe 1-6) uguale sui due fogli, ripetuta su ogni pagina (righe titolo)
- righe posizione dinamiche dalla riga 9 (stile copiato dalla riga 9 del template)
- packing list a tre blocchi dalla riga 11 (stile copiato dalla riga 11)
- barcode Code128 del numero ordine + logo come immagini
poi converte in PDF con LibreOffice.
"""
import json, sys, os, io, copy, math, shutil, subprocess, tempfile
import openpyxl
from openpyxl.drawing.image import Image as XLImage
from openpyxl.utils import get_column_letter, column_index_from_string
from openpyxl.worksheet.cell_range import CellRange

BASE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(BASE, 'template_produzione.xlsx')
LOGO = os.path.join(BASE, 'logo-maxporte.png')

# ── colonne riga posizione (cella iniziale del merge → campo payload) ──
POS_COLS = [
    ('A', 'pos'), ('C', 'modello'), ('K', 'finitura'), ('S', 'l'), ('U', 'h'), ('W', 's'),
    ('Y', 'senso'), ('AA', 'qta'), ('AC', 'tipo'), ('AG', 'serratura'), ('AJ', 'ferramenta'),
    ('AM', 'inserto'), ('AP', 'telaio'), ('AS', 'finitura_telaio'), ('BA', 'coprifili'), ('BD', 'note'),
]
POS_ROW = 9            # riga dati modello nel template
POS_ROW_H = 19.75
LAST_COL = 61          # BI

# packing list: blocchi (col. inizio, col. fine, mappa cella→campo)
PK_ROW = 11
PK_BLOCKS = {
    'minuteria':  (1, 20,  [('A', 'articolo'), ('L', 'um'), ('O', 'qta')]),
    'commessa':   (21, 41, [('U', 'articolo'), ('AG', 'um'), ('AJ', 'qta')]),
    'ubicazioni': (42, 61, [('AP', 'articolo'), ('BC', 'ubicazione')]),
}

HEADER_MAP = {
    '*DATA_STAMPA*': 'data_stampa', '*RAGIONE SOCIALE*': 'cliente',
    '*RIFERIMENTO_CLIENTE*': 'riferimento', '*SETTIMANA_LAVORAZIONE*': 'sett_lavorazione',
    '*SETTIMANA_APPRONTAMENTO*': 'sett_approntamento', '*CODICE_ORDINE_ABBREVIATO*': 'ordine_abbr',
    '*TRASPORTO*': 'trasporto', '*POSA_SI_O_NO*': 'posa', '*ZONA_CONSEGNA*': 'zona', '*NOTE_ORDINE*': 'note',
}


def s(v):
    if v is None:
        return ''
    if isinstance(v, float) and v.is_integer():
        v = int(v)
    return str(v)


def merges_in_row(ws, row):
    return [CellRange(str(m)) for m in ws.merged_cells.ranges if m.min_row == row and m.max_row == row]


def ensure_row_like(ws, src_row, dst_row, col_from=1, col_to=LAST_COL, height=None):
    """Copia stile celle + merge della riga src su dst (limitato alle colonne indicate)."""
    if src_row == dst_row:
        return
    for c in range(col_from, col_to + 1):
        sc = ws.cell(src_row, c); dc = ws.cell(dst_row, c)
        if sc.has_style:
            dc._style = copy.copy(sc._style)
    existing = {(m.min_col, m.max_col) for m in merges_in_row(ws, dst_row)}
    for m in merges_in_row(ws, src_row):
        if m.min_col >= col_from and m.max_col <= col_to and (m.min_col, m.max_col) not in existing:
            ws.merge_cells(start_row=dst_row, start_column=m.min_col, end_row=dst_row, end_column=m.max_col)
    if height:
        ws.row_dimensions[dst_row].height = height
    elif ws.row_dimensions[src_row].height:
        ws.row_dimensions[dst_row].height = ws.row_dimensions[src_row].height


def fill_header(ws, t):
    for row in ws.iter_rows(min_row=1, max_row=7):
        for c in row:
            if isinstance(c.value, str) and c.value in HEADER_MAP:
                key = HEADER_MAP[c.value]
                c.value = s(t.get(key))
                if key not in ('ordine_abbr',):
                    al = copy.copy(c.alignment); al.shrink_to_fit = True; al.wrap_text = False
                    c.alignment = al
    # il placeholder barcode viene sostituito dall'immagine
    for row in ws.iter_rows(min_row=1, max_row=7):
        for c in row:
            if c.value == '*BARCODE_ORDINE*':
                c.value = None


def fix_footer(ws):
    for hf in (ws.oddFooter, ws.evenFooter, ws.firstFooter):
        for part in (hf.left, hf.center, hf.right):
            if part.text and '*' in part.text:
                part.text = part.text.replace('*NUMERO_PAGINA*', '&P').replace('*TOTALE_PAGINE*', '&N')


def make_barcode_png(code):
    try:
        import barcode
        from barcode.writer import ImageWriter
    except Exception:
        return None
    buf = io.BytesIO()
    bc = barcode.get('code128', code, writer=ImageWriter())
    bc.write(buf, options={'module_height': 9.0, 'module_width': 0.28, 'quiet_zone': 2.0,
                           'font_size': 7, 'text_distance': 3.5, 'dpi': 300, 'write_text': True})
    buf.seek(0)
    return buf


def add_images(ws, numero):
    # logo nell'area A1:E6
    if os.path.exists(LOGO):
        img = XLImage(LOGO)
        h = 82
        img.height = h; img.width = int(h * 5244 / 5559)
        ws.add_image(img, 'B1')
    # barcode nell'area AI4:AR6
    png = make_barcode_png(numero) if numero else None
    if png:
        from PIL import Image as PILImage
        im = PILImage.open(png); w, hh = im.size; png.seek(0)
        img = XLImage(png)
        img.height = 46; img.width = min(int(46 * w / hh), 170)
        ws.add_image(img, 'AJ4')


def est_lines(text, chars):
    if not text:
        return 1
    return max(1, sum(max(1, math.ceil(len(part) / chars)) for part in str(text).split('\n')))


def build_scheda(ws, t, posizioni):
    fill_header(ws, t)
    if isinstance(ws['AM8'].value, str) and ws['AM8'].value.startswith('*'):
        ws['AM8'].value = 'Inserto / Bugna / Pietra'
    fix_footer(ws)
    add_images(ws, t.get('ordine_numero'))
    n = max(1, len(posizioni))
    for i in range(n):
        r = POS_ROW + i
        ensure_row_like(ws, POS_ROW, r)
        p = posizioni[i] if i < len(posizioni) else {}
        for col, key in POS_COLS:
            c = ws[f'{col}{r}']
            c.value = s(p.get(key))
            al = copy.copy(c.alignment)
            if key in ('telaio', 'serratura', 'ferramenta', 'tipo', 'senso', 'l', 'h', 's', 'qta', 'pos'):
                al.wrap_text = False
                al.shrink_to_fit = True
            else:
                al.wrap_text = True
            al.vertical = 'center'
            c.alignment = al
        # altezza: la nota e i campi lunghi vanno a capo
        lines = max(est_lines(p.get('note'), 28), est_lines(p.get('modello'), 22),
                    est_lines(p.get('finitura'), 22), est_lines(p.get('finitura_telaio'), 22),
                    est_lines(p.get('coprifili'), 10), est_lines(p.get('inserto'), 9))
        ws.row_dimensions[r].height = max(POS_ROW_H, 13.5 * lines + 7)
    last = POS_ROW + n - 1
    ws.print_area = f'A1:BI{last}'
    ws.print_title_rows = '1:8'


def build_packing(ws, t, pk):
    fill_header(ws, t)
    fix_footer(ws)
    add_images(ws, t.get('ordine_numero'))
    lens = {k: len(pk.get(k) or []) for k in PK_BLOCKS}
    n = max(1, max(lens.values()))
    for i in range(n):
        r = PK_ROW + i
        if r != PK_ROW:
            ws.row_dimensions[r].height = ws.row_dimensions[PK_ROW].height or 13.5
        for key, (c1, c2, cols) in PK_BLOCKS.items():
            items = pk.get(key) or []
            if i < len(items):
                ensure_row_like(ws, PK_ROW, r, c1, c2)
                for col, field in cols:
                    c = ws[f'{col}{r}']
                    c.value = s(items[i].get(field))
                    al = copy.copy(c.alignment); al.shrink_to_fit = True; al.wrap_text = False
                    c.alignment = al
            else:
                # blocco senza voci su questa riga: niente testo né casella, resta solo la riga divisoria
                for col, field in cols:
                    ws[f'{col}{r}'].value = None
                if r == PK_ROW:
                    for c in range(c1, c2 + 1):
                        cell = ws.cell(r, c)
                        b = cell.border
                        if b.left.style == 'medium' and b.right.style == 'medium':
                            cell.border = openpyxl.styles.Border()
                    if key != 'minuteria':
                        pass
        # mantiene la linea verticale di separazione tra i blocchi
        for col in ('T', 'AO'):
            src = ws[f'{col}{PK_ROW}']
            if src.has_style:
                ws[f'{col}{r}']._style = copy.copy(src._style)
        for col in ('U', 'AP'):
            src = ws[f'{col}{PK_ROW}']
            ws[f'{col}{r}'].border = copy.copy(src.border)
    last = max(PK_ROW + n - 1, 40)
    ws.print_area = f'A1:BI{last}'
    ws.print_title_rows = '1:10'


def main():
    src, out = sys.argv[1], sys.argv[2]
    with open(src) as f:
        data = json.load(f)
    t = data.get('testata', {})
    wb = openpyxl.load_workbook(TEMPLATE)
    build_scheda(wb['SCHEDA_PRODUZIONE'], t, data.get('posizioni') or [])
    build_packing(wb['PACKING_LIST'], t, data.get('packing') or {})

    tmpdir = tempfile.mkdtemp()
    try:
        xlsx = os.path.join(tmpdir, 'scheda.xlsx')
        wb.save(xlsx)
        subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', tmpdir, xlsx],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
        shutil.copy(os.path.join(tmpdir, 'scheda.pdf'), out)
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


if __name__ == '__main__':
    main()
