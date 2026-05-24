#!/usr/bin/env python3
"""genera_pdf.py — Motore PDF Max Porte (Excel dinamico + LibreOffice)
   Usa il template Excel come sorgente di stili, costruisce fogli dinamici
   con solo le righe valorizzate. Le posizioni si accorpano automaticamente.
"""
import sys, json, os, subprocess, re, tempfile, shutil
from copy import copy
from openpyxl import Workbook, load_workbook
from openpyxl.cell.cell import MergedCell
from openpyxl.utils import get_column_letter

VERSION = "2026-05-25-v1"

# ── Costanti impaginazione (pt) ────────────────────────────────────────────
ROW_H = 13.9          # altezza riga default del template
PAGE_H = 700           # altezza utile stimata per pagina (conservativa)
HEADER_FIRST = 30      # righe header prima pagina (1-30)
HEADER_INTER = 18      # righe header pagine intermedie (1-18)

# ── Mappa dettagli riga → (label, campo_valore, campo_prezzo, campo_netto, campo_totale)
DETAIL_MAP = [
    ('Prodotto',                'prodotto',                None, None, None),
    ('Serie',                   'serie',                   None, None, None),
    ('Modello',                 'modello',                 'prezzo_base', 'prezzo_modello_scontato', 'totale_riga_modello'),
    ('Colore',                  'finitura',                'prezzo_finitura', 'prezzo_finitura_scontato', 'totale_riga_colore'),
    ('Colore telaio',           'finitura_telaio',         'supplemento_bicolore', 'supplemento_bicolore_scontato', 'totale_riga_colore_telaio'),
    ('Colore coprifili',        'finitura_coprifili',      'supplemento_bicolore', 'supplemento_bicolore_scontato', 'totale_riga_colore_coprifili'),
    ('Colore pietra',           'colore_pietra',           'supplemento_colore_pietra', 'supplemento_colore_pietra_scontato', 'totale_riga_colore_pietra'),
    ('Colore inserto',          'colore_inserto',          'supplemento_colore_inserto', 'supplemento_colore_inserto_scontato', 'totale_riga_colore_inserto'),
    ('Vetro',                   'vetro',                   'prezzo_vetro', 'prezzo_vetro_scontato', 'totale_riga_vetro'),
    ('Incisione/stampa vetro',  'incisioni',               'prezzo_incisione', 'prezzo_incisione_scontato', 'totale_riga_incisione'),
    ('Bugna/pannello',          'bugna',                   None, None, None),
    ('Tipologia',               'tipologia',               'prezzo_tipologia', 'prezzo_tipologia_scontato', 'totale_riga_tipologia'),
    ('Senso di apertura',       'senso',                   None, None, None),
    ('Serratura',               'serratura',               'supplemento_serratura', 'supplemento_serratura_scontato', 'totale_riga_serratura'),
    ('Stipite',                 'spalla',                  'supplemento_stipite', 'supplemento_stipite_scontato', 'totale_riga_stipite'),
    ('Colore ferramenta',       'ferramenta',              'supplemento_colore_ferramenta', 'supplemento_colore_ferramenta_scontato', 'totale_riga_colore_ferramenta'),
    ('Maniglia',                'maniglia',                'prezzo_maniglia', 'prezzo_maniglia_scontato', 'totale_riga_maniglia'),
    ('Colore maniglia',         'colore_maniglia',         None, None, None),
    ('Acc. Varsavia scorrevole','kit_varsavia',             'prezzo_kit_varsavia', 'prezzo_kit_varsavia_scontato', 'totale_riga_kit_varsavia'),
    ('Acc. RIM 16 scorrevole',  'kit_rim16',               'prezzo_kit_rim16', 'prezzo_kit_rim16_scontato', 'totale_riga_kit_rim16'),
    ('Lavorazioni extra',       'lavorazioni_extra',       'prezzo_lavorazioni_extra', 'prezzo_lavorazioni_extra_scontato', 'totale_riga_lavorazioni_extra'),
    ('Accessori',               'accessori',               'prezzo_accessori', 'prezzo_accessori_scontato', 'totale_riga_accessori'),
    ('Fuori misura larghezza (L)','fuori_misura_l',        'supplemento_fuori_misura_l', 'supplemento_fuori_misura_l_scontato', 'totale_riga_fuori_misura_l'),
    ('Fuori misura altezza (H)','fuori_misura_h',          'supplemento_fuori_misura_h', 'supplemento_fuori_misura_h_scontato', 'totale_riga_fuori_misura_h'),
    ('Rifilatura telaio',       'rifilatura',              'supplemento_rifilatura', 'supplemento_rifilatura_scontato', 'totale_riga_rifilatura'),
    ('Stanza',                  'stanza',                  None, None, None),
    ('Note posizione',          'note_riga',               None, None, None),
]

# ── Helpers ────────────────────────────────────────────────────────────────

def v(d, k, default=''):
    """Prendi valore dal dict, gestisci None."""
    val = d.get(k, default)
    return str(val) if val is not None else ''

def has_val(val):
    """Valore è significativo (non vuoto/zero)?"""
    if val is None: return False
    s = str(val).strip()
    if not s: return False
    try:
        f = float(s.replace('€','').replace('.','').replace(',','.').strip())
        return f != 0
    except:
        return bool(s)

def fmt_eur(val):
    """Formatta come € 123,45 — stringa vuota se zero/None."""
    if val is None or val == '' or val == 0: return ''
    try:
        f = float(val)
        if f == 0: return ''
        s = f"{f:,.2f}".replace(',','X').replace('.',',').replace('X','.')
        return f"€ {s}"
    except:
        return str(val) if val else ''

def copy_style(src, dst):
    if isinstance(src, MergedCell): return
    if src.font: dst.font = copy(src.font)
    if src.fill: dst.fill = copy(src.fill)
    if src.border: dst.border = copy(src.border)
    if src.alignment: dst.alignment = copy(src.alignment)
    if src.number_format: dst.number_format = src.number_format

def get_merges_for_row(ws, row_num):
    return [(mr.min_col, mr.max_col) for mr in ws.merged_cells.ranges
            if mr.min_row == row_num and mr.max_row == row_num]

def get_merges_range(ws, min_r, max_r):
    return [(mr.min_row, mr.max_row, mr.min_col, mr.max_col) 
            for mr in ws.merged_cells.ranges
            if mr.min_row >= min_r and mr.max_row <= max_r]

# ── Copia blocco di righe dal template ────────────────────────────────────

def copy_rows(ws_src, ws_dst, src_start, src_end, dst_start, mapping=None):
    """Copia righe src_start..src_end dal template a ws_dst a partire da dst_start.
       Applica mapping per sostituire placeholder *NOME* con valori."""
    cur = dst_start
    for sr in range(src_start, src_end + 1):
        for cell in ws_src[sr]:
            if isinstance(cell, MergedCell): continue
            dst_cell = ws_dst.cell(row=cur, column=cell.column)
            val = cell.value
            if val and isinstance(val, str) and mapping:
                for k, repl in mapping.items():
                    val = val.replace(k, str(repl) if repl is not None else '')
                # Pulisci placeholder rimasti
                val = re.sub(r'\*[A-ZÀ_0-9]+\*', '', val)
                if not val.strip(): val = None
            dst_cell.value = val
            copy_style(cell, dst_cell)
        h = ws_src.row_dimensions.get(sr)
        if h and h.height:
            ws_dst.row_dimensions[cur].height = h.height
        cur += 1
    # Merge
    for mr in ws_src.merged_cells.ranges:
        if mr.min_row >= src_start and mr.max_row <= src_end:
            offset = dst_start - src_start
            ws_dst.merge_cells(
                start_row=mr.min_row + offset, end_row=mr.max_row + offset,
                start_column=mr.min_col, end_column=mr.max_col)
    return cur

# ── Scrivi una posizione dinamica ─────────────────────────────────────────

def write_position(ws_dst, ws_tmpl_inter, cur_row, riga, sconto_str):
    """Scrive una posizione con solo righe valorizzate. Ritorna (next_row, num_rows_written)."""
    start_row = cur_row
    
    # Riga top (template PAGINE_INTERMEDIE riga 19)
    for cell in ws_tmpl_inter[19]:
        if isinstance(cell, MergedCell): continue
        dst = ws_dst.cell(row=cur_row, column=cell.column)
        copy_style(cell, dst)
    
    ws_dst.cell(row=cur_row, column=2).value = v(riga, 'posizione')
    ws_dst.cell(row=cur_row, column=8).value = v(riga, 'larghezza')
    ws_dst.cell(row=cur_row, column=10).value = 'X'
    ws_dst.cell(row=cur_row, column=11).value = v(riga, 'altezza')
    ws_dst.cell(row=cur_row, column=13).value = 'X'
    ws_dst.cell(row=cur_row, column=14).value = v(riga, 'spessore')
    
    senso = v(riga, 'senso')
    apertura = v(riga, 'codice_apertura', v(riga, 'apertura'))
    ws_dst.cell(row=cur_row, column=16).value = f"{senso} {apertura}".strip()
    ws_dst.cell(row=cur_row, column=23).value = v(riga, 'quantita', '1')
    ws_dst.cell(row=cur_row, column=25).value = v(riga, 'um', 'NR')
    
    for mc, xc in get_merges_for_row(ws_tmpl_inter, 19):
        ws_dst.merge_cells(start_row=cur_row, start_column=mc, end_row=cur_row, end_column=xc)
    ws_dst.row_dimensions[cur_row].height = ws_tmpl_inter.row_dimensions[19].height or ROW_H
    cur_row += 1
    
    # Righe dettaglio — solo quelle valorizzate
    for label, campo_val, campo_prz, campo_net, campo_tot in DETAIL_MAP:
        value = v(riga, campo_val)
        
        # Gestione speciale maniglia: aggiungi versione
        if campo_val == 'maniglia' and v(riga, 'versione_maniglia'):
            value = f"{value} - {v(riga, 'versione_maniglia')}"
        
        prezzo = v(riga, campo_prz) if campo_prz else ''
        netto = v(riga, campo_net) if campo_net else ''
        totale = v(riga, campo_tot) if campo_tot else ''
        
        # Salta riga se non ha né valore né prezzo
        if not has_val(value) and not has_val(prezzo):
            continue
        
        # Scegli stile template: riga 22 (con prezzi) o 21 (senza)
        has_price = has_val(prezzo)
        src_row = 22 if has_price else 21
        
        for cell in ws_tmpl_inter[src_row]:
            if isinstance(cell, MergedCell): continue
            dst = ws_dst.cell(row=cur_row, column=cell.column)
            copy_style(cell, dst)
        
        ws_dst.cell(row=cur_row, column=8).value = label
        val_cell = ws_dst.cell(row=cur_row, column=16)
        val_cell.value = value
        # Assicura wrap_text per testi lunghi
        from openpyxl.styles import Alignment as Al
        old_al = val_cell.alignment or Al()
        val_cell.alignment = Al(
            horizontal=old_al.horizontal, vertical=old_al.vertical or 'top',
            wrap_text=True, shrink_to_fit=old_al.shrink_to_fit,
            indent=old_al.indent, text_rotation=old_al.text_rotation)
        
        if has_price:
            ws_dst.cell(row=cur_row, column=28).value = fmt_eur(prezzo)
            ws_dst.cell(row=cur_row, column=31).value = sconto_str
            ws_dst.cell(row=cur_row, column=33).value = fmt_eur(netto)
            ws_dst.cell(row=cur_row, column=36).value = fmt_eur(totale)
        
        # Merge
        merges = get_merges_for_row(ws_tmpl_inter, src_row)
        for mc, xc in merges:
            ws_dst.merge_cells(start_row=cur_row, start_column=mc, end_row=cur_row, end_column=xc)
        
        # NON forzare altezza riga → si espande automaticamente con wrap_text
        cur_row += 1
    
    # Footer posizione (template riga 47)
    for cell in ws_tmpl_inter[47]:
        if isinstance(cell, MergedCell): continue
        dst = ws_dst.cell(row=cur_row, column=cell.column)
        copy_style(cell, dst)
    
    ws_dst.cell(row=cur_row, column=2).value = "** L'immagine è puramente rappresentativa"
    ws_dst.cell(row=cur_row, column=22).value = "Totale posizione (IVA esclusa)"
    ws_dst.cell(row=cur_row, column=36).value = fmt_eur(v(riga, 'totale_posizione', v(riga, 'prezzo_unitario')))
    
    for mc, xc in get_merges_for_row(ws_tmpl_inter, 47):
        ws_dst.merge_cells(start_row=cur_row, start_column=mc, end_row=cur_row, end_column=xc)
    ws_dst.row_dimensions[cur_row].height = ws_tmpl_inter.row_dimensions[47].height or ROW_H
    cur_row += 1
    
    rows_written = cur_row - start_row
    return cur_row, rows_written

# ── Stima righe visibili per una posizione ────────────────────────────────

def count_visible_rows(riga):
    """Conta quante righe avrebbe una posizione (top + dettagli + footer)."""
    count = 2  # top + footer
    for label, campo_val, campo_prz, campo_net, campo_tot in DETAIL_MAP:
        value = v(riga, campo_val)
        prezzo = v(riga, campo_prz) if campo_prz else ''
        if has_val(value) or has_val(prezzo):
            count += 1
    return count

# ── Setup pagina ──────────────────────────────────────────────────────────

def setup_page(ws, ws_tmpl):
    """Applica setup pagina dal template."""
    ws.sheet_format.defaultColWidth = 2.42578125
    ws.sheet_format.defaultRowHeight = ROW_H
    ws.sheet_format.customHeight = True
    ws.page_setup.paperSize = 9
    ws.page_setup.orientation = 'portrait'
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_margins = copy(ws_tmpl.page_margins)

# ── Genera il workbook completo ───────────────────────────────────────────

def genera_workbook(data, template_path):
    tmpl = load_workbook(template_path)
    ws_prima = tmpl['PRIMA_PAGINA']
    ws_inter = tmpl['PAGINE_INTERMEDIE']
    ws_finale = tmpl['PAGINA_FINALE']
    
    doc = data.get('documento', data.get('doc', {}))
    righe = data.get('righe', [])
    sconto_pct = v(doc, 'sconto1', '0')
    sconto_str = f"{sconto_pct}%" if sconto_pct and sconto_pct != '0' else ''
    
    # Mapping placeholder → valori per header/cliente
    tipo_doc = v(doc, 'tipo_documento', 'PREVENTIVO')
    codice_campo = 'codice_preventivo' if 'preventivo' in tipo_doc.lower() else 'codice_ordine'
    
    m = {
        '*TIPO_DOCUMENTO*': v(doc, 'tipo_documento', 'PREVENTIVO'),
        '*RAGIONE SOCIALE*': v(doc, 'ragione_sociale'),
        '*INDIRIZZO*': v(doc, 'indirizzo'),
        '*CAP*': v(doc, 'cap'),
        '*CITTÀ*': v(doc, 'citta'),
        '*(PROVINCIA)*': f"({v(doc, 'provincia')})" if v(doc, 'provincia') else '',
        '*PAESE*': v(doc, 'paese', 'Italia'),
        '*NOME DESTINAZIONE*': v(doc, 'dest_nome', v(doc, 'ragione_sociale')),
        '*DATA_GENERAZIONE_DOCUMENTO': v(doc, 'data'),
        '*CODICE_PREVENTIVO*': v(doc, 'numero', v(doc, codice_campo)),
        '*DATA_ULTIMA_MODIFICA*': v(doc, 'data_modifica', v(doc, 'data')),
        '*NOME_COGNOME_COMPILATORE*': v(doc, 'compilatore'),
        '*RIFERIMENTO_CLIENTE*': v(doc, 'riferimento_cliente'),
        '*CODICE_CLIENTE*': v(doc, 'codice_cliente'),
        '*AGENTE*': v(doc, 'agente'),
        '*RESA*': v(doc, 'resa'),
        '*TRASPORTO*': v(doc, 'trasporto'),
        '*PARTITA_IVA*': v(doc, 'partita_iva'),
        '*CODICE_FISCALE*': v(doc, 'codice_fiscale'),
        '*TELEFONO*': v(doc, 'telefono'),
        '*CELLULARE*': v(doc, 'cellulare'),
        '*REFERENTE*': v(doc, 'referente'),
        '*TELEFONO_REFERENTE*': v(doc, 'dest_telefono', v(doc, 'telefono_referente')),
        '*CELLULARE_REFERENTE*': v(doc, 'dest_cellulare', v(doc, 'cellulare_referente')),
        '*EMAIL_REFERENTE*': v(doc, 'dest_email', v(doc, 'email_referente')),
        '*CONDIZIONI_DI_PAGAMENTO*': v(doc, 'condizioni_pagamento'),
        '*BANCA_DI_APPOGGIO*': v(doc, 'banca'),
        '*CIN*': v(doc, 'cin'),
        '*ABI*': v(doc, 'abi'),
        '*CAB*': v(doc, 'cab'),
        '*EMAIL_1*': v(doc, 'email1'),
        '*EMAIL_ORDINI*': v(doc, 'email_ordini'),
        '*CODICE_SDI*': v(doc, 'sdi'),
        '*PEC_FATTURAZIONE*': v(doc, 'pec_fatturazione', v(doc, 'pec')),
        '*GIORNI_VALIDITÀ_OFFERTA*': v(doc, 'validita_offerta', '30'),
        '*BARCODE_DOCUMENTO*': '',
        # Riepilogo
        '*SOMMA_TOTALI_POSIZIONI*': fmt_eur(v(doc, 'totale_imponibile')),
        '*SCONTO*': fmt_eur(v(doc, 'sconto_euro', v(doc, 'totale_sconto'))),
        '*OMAGGI*': fmt_eur(v(doc, 'omaggi')),
        '*SCONTO_PAGAMENTO*': fmt_eur(v(doc, 'sconto_pagamento')),
        '*TOTALE_MERCE_SCONTATO*': fmt_eur(v(doc, 'totale_netto')),
        '*TOTALE_IMPONIBILE*': fmt_eur(v(doc, 'totale_imponibile_netto', v(doc, 'totale_netto'))),
        '*TOTALE_IVA*': fmt_eur(v(doc, 'totale_iva')),
        '*TOTALE_IMBALLO*': fmt_eur(v(doc, 'totale_imballo')),
        '*TOTALE_TRASPORTO*': fmt_eur(v(doc, 'totale_trasporto')),
        '*TOTALE_SPESE*': fmt_eur(v(doc, 'totale_spese')),
        '*SOMMA_RIEPILOGO_OFFERTA*': fmt_eur(v(doc, 'totale_documento')),
    }
    
    wb = Workbook()
    
    # ── Foglio 1: Prima pagina + posizioni ────────────────────────────────
    ws = wb.active
    ws.title = 'Pag1'
    setup_page(ws, ws_prima)
    
    # Copia header prima pagina (righe 1-30)
    cur = copy_rows(ws_prima, ws, 1, 30, 1, m)
    
    # Calcola spazio disponibile sulla prima pagina
    header_h = HEADER_FIRST * ROW_H
    avail_h = PAGE_H - header_h
    used_h = 0
    page_num = 1
    pos_idx = 0
    
    while pos_idx < len(righe):
        riga = righe[pos_idx]
        pos_rows = count_visible_rows(riga)
        pos_h = pos_rows * ROW_H
        
        if used_h + pos_h > avail_h and used_h > 0:
            # Non ci sta — nuova pagina
            page_num += 1
            ws = wb.create_sheet(title=f'Pag{page_num}')
            setup_page(ws, ws_inter)
            cur = copy_rows(ws_inter, ws, 1, 18, 1, m)
            used_h = 0
            avail_h = PAGE_H - (HEADER_INTER * ROW_H)
        
        cur, written = write_position(ws, ws_inter, cur, riga, sconto_str)
        used_h += written * ROW_H
        pos_idx += 1
    
    # ── Ultimo foglio: Pagina finale (riepilogo) ──────────────────────────
    page_num += 1
    ws_last = wb.create_sheet(title=f'Pag{page_num}')
    setup_page(ws_last, ws_finale)
    
    # Copia tutto il contenuto della pagina finale
    max_row_finale = ws_finale.max_row
    copy_rows(ws_finale, ws_last, 1, max_row_finale, 1, m)
    
    return wb

# ── Conversione PDF ───────────────────────────────────────────────────────

def xlsx_to_pdf(xlsx_path, pdf_path):
    """Converti xlsx in PDF con LibreOffice, poi unisci i fogli."""
    outdir = tempfile.mkdtemp()
    lo_home = tempfile.mkdtemp()
    
    try:
        r = subprocess.run(
            ['libreoffice', '--headless', '--norestore', '--convert-to', 'pdf',
             '--outdir', outdir, xlsx_path],
            capture_output=True, timeout=120,
            env={**os.environ, 'HOME': lo_home}
        )
        
        basename = os.path.splitext(os.path.basename(xlsx_path))[0]
        generated = os.path.join(outdir, f'{basename}.pdf')
        
        if os.path.exists(generated):
            shutil.move(generated, pdf_path)
        else:
            raise RuntimeError(f"PDF non generato. stderr: {r.stderr[:300]}")
    finally:
        shutil.rmtree(outdir, ignore_errors=True)
        shutil.rmtree(lo_home, ignore_errors=True)

# ── Main ──────────────────────────────────────────────────────────────────

def genera_preventivo(json_path, pdf_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    template_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(template_dir, 'template_preventivo.xlsx')
    
    if not os.path.exists(template_path):
        for p in ['/app/template_preventivo.xlsx', 
                  os.path.join(template_dir, '..', 'template_preventivo.xlsx')]:
            if os.path.exists(p):
                template_path = p
                break
    
    wb = genera_workbook(data, template_path)
    
    tmp_xlsx = pdf_path.replace('.pdf', '_tmp.xlsx')
    wb.save(tmp_xlsx)
    
    try:
        xlsx_to_pdf(tmp_xlsx, pdf_path)
    finally:
        try: os.unlink(tmp_xlsx)
        except: pass
    
    print(f"genera_pdf.py {VERSION} OK → {pdf_path}", file=sys.stderr)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(f"Uso: python3 genera_pdf.py <input.json> <output.pdf>", file=sys.stderr)
        sys.exit(1)
    genera_preventivo(sys.argv[1], sys.argv[2])
