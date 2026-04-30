#!/usr/bin/env python3
"""Motore generazione PDF preventivi/ordini Max Porte"""
import sys, json, os, subprocess, copy, re, zipfile
from openpyxl import load_workbook
from openpyxl.cell.cell import MergedCell

TEMPLATE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template_preventivo.xlsx')
if not os.path.exists(TEMPLATE_PATH):
    for c in ['/app/template_preventivo.xlsx', os.path.join(os.getcwd(), 'template_preventivo.xlsx')]:
        if os.path.exists(c):
            TEMPLATE_PATH = c; break

def fmt_euro(v):
    if not v and v != 0: return ''
    try:
        f = float(v)
        if f == 0: return ''
        return f"{f:,.2f}".replace(',','X').replace('.',',').replace('X','.')
    except: return str(v) if v else ''

def sostituisci_foglio(ws, mapping):
    for row in ws.iter_rows():
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and isinstance(cell.value, str):
                val = cell.value
                for k, v in mapping.items():
                    val = val.replace(k, str(v) if v is not None else '')
                cell.value = val

def nascondi_righe_vuote(ws):
    def ha_valore(v):
        if not v: return False
        s = str(v).strip()
        if not s or '*' in s: return False
        if re.match(r'^€\s*$', s): return False
        if re.match(r'^\d+%$', s): return False
        if s in ('-','X','x','€'): return False
        return True
    for row in ws.iter_rows(min_row=31):
        cells = {cell.column: cell for cell in row if not isinstance(cell, MergedCell)}
        val16 = cells.get(16)
        desc_vuoto = not ha_valore(val16.value if val16 else None)
        prezzi_vuoti = all(not ha_valore(cells.get(c).value if cells.get(c) else None) for c in [28,33,36])
        if desc_vuoto and prezzi_vuoti:
            ws.row_dimensions[row[0].row].hidden = True

def mapping_riga(r, sc):
    sc = float(sc)
    def scont(v):
        try: return fmt_euro(round(float(v)*(1-sc/100),2)) if v else ''
        except: return ''
    return {
        '*POSIZIONE*': r.get('posizione',''),
        '*L*': str(r.get('larghezza','')),
        '*H*': str(r.get('altezza','')),
        '*S*': str(r.get('spessore','')),
        '*COD_SENSO*': r.get('senso',''),
        '*COD_APERTURA*': r.get('codice_apertura','') or r.get('apertura',''),
        '*SENSO*': r.get('senso',''),
        '*APERTURA*': r.get('nome_apertura', r.get('apertura','')),
        '*QUANTITÀ*': str(r.get('quantita',1)),
        '*UM*': r.get('um','NR'),
        '*PRODOTTO*': r.get('modello',''),
        '*SERIE*': r.get('serie',''),
        '*MODELLO*': r.get('modello',''),
        '*FINITURA*': r.get('finitura',''),
        '*FINITURA_TELAIO*': r.get('finitura_telaio',''),
        '*FINITURA_COPRIFILI*': r.get('finitura_coprifili',''),
        '*COLORE_PIETRA*': r.get('colore_pietra',''),
        '*COLORE_INSERTO_ALLUMINIO*': r.get('colore_inserto',''),
        '*TIPO_DI_VETRO*': r.get('vetro',''),
        '*INCISIONI_O_STAMPE_DECORATIVE*': r.get('incisioni',''),
        '*BUGNA_O_PANNELLO*': r.get('bugna',''),
        '*TIPOLOGIA*': r.get('nome_apertura', r.get('apertura','')),
        '*SERRATURA*': r.get('serratura',''),
        '*SPALLA*': r.get('spalla',''),
        '*FERRAMENTA*': r.get('ferramenta',''),
        '*MANIGLIA* - *VERSIONE_MANIGLIA*': (r.get('maniglia','') + (' - ' + r.get('versione_maniglia','') if r.get('versione_maniglia') else '')).strip(' -') or '',
        '*MANIGLIA*': r.get('maniglia',''),
        '*VERSIONE_MANIGLIA*': r.get('versione_maniglia',''),
        '*COLORE_MANIGLIA*': r.get('colore_maniglia',''),
        '*KIT_VARSAVIA_SCORREVOLE*': r.get('kit_varsavia',''),
        '*KIT_RIM_16_SCORREVOLE*': r.get('kit_rim16',''),
        '*LAVORAZIONI_EXTRA*': '',
        '*ACCESSORI*': '',
        '*SUPPLEMENTO_FUORI_MISURA_L_SI_NO*': r.get('fuori_misura_l',''),
        '*SUPPLEMENTO_FUORI_MISURA_H_SI_NO*': r.get('fuori_misura_h',''),
        '*SUPPLEMENTO_RIFILATURA_SI_NO*': '',
        '*STANZA*': r.get('stanza',''),
        '*NOTE_RIGA*': r.get('note_riga',''),
        '*SC*': str(int(sc)) if sc else '',
        '*PREZZO_MODELLO_LISTINO*': fmt_euro(r.get('prezzo_base',0)),
        '*PREZZO_MODELLO_SCONTATO*': scont(r.get('prezzo_base',0)),
        '*PREZZO_FINITURA_LISTINO*': fmt_euro(r.get('prezzo_finitura','')) if r.get('prezzo_finitura') else '',
        '*PREZZO_FINITURA_SCONTATO*': scont(r.get('prezzo_finitura',0)) if r.get('prezzo_finitura') else '',
        '*SUPPLEMENTO_BICOLORE_LISTINO*': '',
        '*SUPPLEMENTO_BICOLORE_SCONTATO*': '',
        '*SUPPLEMENTO_COLORE_INSERTO_LISTINO*': '',
        '*SUPPLEMENTO_COLORE_INSERTO_SCONTATO*': '',
        '*PREZZO_VETRO_LISTINO*': fmt_euro(r.get('prezzo_vetro','')) if r.get('prezzo_vetro') else '',
        '*PREZZO_VETRO_SCONTATO*': scont(r.get('prezzo_vetro',0)) if r.get('prezzo_vetro') else '',
        '*PREZZO_INCISIONE_O_STAMPA_LISTINO*': '',
        '*PREZZO_INCISIONE_O_STAMPA_SCONTATO*': '',
        '*SUPPLEMENTO_SERRATURA_LISTINO*': fmt_euro(r.get('prezzo_serratura','')) if r.get('prezzo_serratura') else '',
        '*SUPPLEMENTO_SERRATURA_SCONTATO*': scont(r.get('prezzo_serratura',0)) if r.get('prezzo_serratura') else '',
        '*SUPPLEMENTO_STIPITE_LISTINO*': fmt_euro(r.get('prezzo_telaio','')) if r.get('prezzo_telaio') else '',
        '*SUPPLEMENTO_STIPITE_SCONTATO*': scont(r.get('prezzo_telaio',0)) if r.get('prezzo_telaio') else '',
        '*SUPPLEMENTO_COLORE_FERRAMENTA_LISTINO*': fmt_euro(r.get('prezzo_ferramenta','')) if r.get('prezzo_ferramenta') else '',
        '*SUPPLEMENTO_COLORE_FERRAMENTA_SCONTATO*': scont(r.get('prezzo_ferramenta',0)) if r.get('prezzo_ferramenta') else '',
        '*PREZZO_MANIGLIA_LISTINO*': fmt_euro(r.get('prezzo_maniglia','')) if r.get('prezzo_maniglia') else '',
        '*PREZZO_MANIGLIA_SCONTATO*': scont(r.get('prezzo_maniglia',0)) if r.get('prezzo_maniglia') else '',
        '*PREZZO_KIT_VARSAVIA_SCORREVOLE_LISTINO*': '',
        '*PREZZO_KIT_VARSAVIA_SCORREVOLE_SCONTATO*': '',
        '*PREZZO_KIT_RIM_16_SCORREVOLE_LISTINO*': '',
        '*PREZZO_KIT_RIM_16_SCORREVOLE_SCONTATO*': '',
        '*PREZZO_LAVORAZIONI_EXTRA_LISTINO*': fmt_euro(r.get('prezzo_extra','')) if r.get('prezzo_extra') else '',
        '*PREZZO_LAVORAZIONI_EXTRA_SCONTATO*': '',
        '*PREZZO_ACCESSORI_LISTINO*': '',
        '*PREZZO_ACCESSORI_SCONTATO*': '',
        '*SUPPLEMENTO_FUORI_MISURA_L_LISTINO*': '',
        '*SUPPLEMENTO_FUORI_MISURA_L_SCONTATO*': '',
        '*SUPPLEMENTO_FUORI_MISURA_H_LISTINO*': '',
        '*SUPPLEMENTO_FUORI_MISURA_H_SCONTATO*': '',
        '*SUPPLEMENTO_RIFILATURA_LISTINO*': '',
        '*SUPPLEMENTO_RIFILATURA_SCONTATO*': '',
        '*TOTALE_RIGA*': '',
        '*TOTALE_POSIZIONE*': fmt_euro(r.get('prezzo_totale',0)),
        '*IMMAGINE*': '',
    }

def genera_preventivo(dati_json, output_path):
    data = json.loads(dati_json)
    doc = data['documento']
    righe = data['righe']

    sc1 = float(doc.get('sconto1', 0))
    tot_imp = float(doc.get('totale_imponibile', 0))
    tot_netto = round(tot_imp * (1-sc1/100), 2)
    iva_pct = 22
    iva_euro = round(tot_netto * iva_pct/100, 2)
    tot_iva = round(tot_netto + iva_euro, 2)

    mapping_doc = {
        '*TIPO_DOCUMENTO*': doc.get('tipo_documento','PREVENTIVO'),
        '*DATA_GENERAZIONE_DOCUMENTO': doc.get('data',''),
        '*CODICE_PREVENTIVO*': doc.get('numero',''),
        '*DATA_ULTIMA_MODIFICA*': doc.get('data_modifica',''),
        '*NOME_COGNOME_COMPILATORE*': doc.get('compilatore',''),
        '*RAGIONE SOCIALE*': doc.get('ragione_sociale',''),
        '*RAGIONE SOCIALE RIGA 2*': doc.get('ragione_sociale_riga2',''),
        '*INDIRIZZO*': doc.get('indirizzo',''),
        '*INDIRIZZO RIGA 2*': '',
        '*CAP* *CITTÀ* *(PROVINCIA)*': f"{doc.get('cap','')} {doc.get('citta','')} ({doc.get('provincia','')})",
        '*PAESE*': doc.get('paese','Italia'),
        '*NOME DESTINAZIONE*': doc.get('dest_nome', doc.get('ragione_sociale','')),
        '*NOME DESTINAZIONE RIGA 2*': '',
        '*INDIRIZZO DESTINAZIONE*': doc.get('dest_indirizzo', doc.get('indirizzo','')),
        '*CAP* *CITTÀ DEST* *(PROVINCIA DEST)*': f"{doc.get('dest_cap','')} {doc.get('dest_citta','')} ({doc.get('dest_provincia','')})",
        '*PAESE DEST*': doc.get('dest_paese','Italia'),
        '*RIFERIMENTO_CLIENTE*': doc.get('riferimento_cliente',''),
        '*CODICE_CLIENTE*': doc.get('codice_cliente',''),
        '*AGENTE*': doc.get('agente',''),
        '*RESA*': doc.get('resa',''),
        '*TRASPORTO*': doc.get('trasporto',''),
        '*PARTITA_IVA*': doc.get('partita_iva',''),
        '*CODICE_FISCALE*': doc.get('codice_fiscale',''),
        '*TELEFONO*': doc.get('telefono',''),
        '*CELLULARE*': doc.get('cellulare',''),
        '*REFERENTE*': doc.get('referente',''),
        '*RIFERIMENTI_DESTINAZIONE*': doc.get('dest_riferimenti',''),
        '*CONDIZIONI_DI_PAGAMENTO*': doc.get('condizioni_pagamento',''),
        '*BANCA_DI_APPOGGIO*': doc.get('banca',''),
        '*CIN* *ABI* *CAB*': doc.get('cin_abi_cab',''),
        '*EMAIL_1*': doc.get('email1',''),
        '*EMAIL_2*': doc.get('email2',''),
        '*SDI*': doc.get('sdi',''),
        '*PEC*': doc.get('pec',''),
        '*GIORNI_VALIDITÀ_OFFERTA*': str(doc.get('validita_offerta','30')),
        '*BARCODE_DOCUMENTO*': '',
        '*SOMMA_TOTALI_POSIZIONI*': fmt_euro(tot_imp),
        '*SCONTO*': f"{int(sc1)}%" if sc1 else '',
        '*OMAGGI*': '',
        '*SCONTO_PAGAMENTO*': '',
        '*TOTALE_MERCE_SCONTATO*': fmt_euro(tot_netto),
        '*TOTALE_IMPONIBILE*': fmt_euro(tot_netto),
        '*TOTALE_IVA*': fmt_euro(iva_euro),
        '*TOTALE_IMBALLO*': fmt_euro(doc.get('totale_imballo','')),
        '*TOTALE_TRASPORTO*': '',
        '*TOTALE_SPESE*': '',
        '*SOMMA_RIEPILOGO_OFFERTA*': fmt_euro(tot_iva),
    }

    if len(righe) == 0:
        print("Nessuna riga", file=sys.stderr); sys.exit(1)

    # Genera ogni foglio come xlsx separato, poi unisce via zipfile
    # Struttura: sheet1=PRIMA_PAGINA, sheet2..N=PAGINE_INTERMEDIE, sheetN+1=PAGINA_FINALE
    tmp_dir = os.path.dirname(os.path.abspath(output_path))
    base = os.path.basename(output_path).replace('.pdf','')
    tmp_files = []

    def genera_foglio(sheet_name, full_mapping, idx):
        wb = load_workbook(TEMPLATE_PATH)
        ws = wb[sheet_name]
        sostituisci_foglio(ws, full_mapping)
        nascondi_righe_vuote(ws)
        # Elimina gli altri fogli
        for s in list(wb.sheetnames):
            if s != sheet_name:
                del wb[s]
        path = os.path.join(tmp_dir, f'{base}_s{idx}.xlsx')
        wb.save(path)
        tmp_files.append(path)
        return path

    # Prima pagina
    genera_foglio('PRIMA_PAGINA', {**mapping_doc, **mapping_riga(righe[0], sc1)}, 1)

    # Pagine intermedie (posizioni 2..N)
    for i, riga in enumerate(righe[1:], 2):
        genera_foglio('PAGINE_INTERMEDIE', {**mapping_doc, **mapping_riga(riga, sc1)}, i)

    # Pagina finale
    genera_foglio('PAGINA_FINALE', {**mapping_doc}, len(righe)+1)

    # Unisci tutti gli xlsx in uno solo via zipfile
    tmp_xlsx = output_path.replace('.pdf','_tmp.xlsx')
    _merge_xlsx(tmp_files, tmp_xlsx, TEMPLATE_PATH)

    # Converti in PDF
    out_dir = os.path.dirname(os.path.abspath(output_path))
    r = subprocess.run(['libreoffice','--headless','--convert-to','pdf',
        '--outdir', out_dir, tmp_xlsx],
        capture_output=True, text=True, timeout=120,
        env={**os.environ, 'HOME':'/tmp'})

    tmp_pdf = tmp_xlsx.replace('.xlsx','.pdf')
    if os.path.exists(tmp_pdf):
        os.replace(tmp_pdf, output_path)
        print(f"PDF generato: {output_path}", file=sys.stderr)
    else:
        print(f"Errore LibreOffice: {r.stderr[:300]}", file=sys.stderr)
        sys.exit(1)

    # Pulizia
    for f in tmp_files:
        try: os.remove(f)
        except: pass
    try: os.remove(tmp_xlsx)
    except: pass


def _merge_xlsx(sheet_files, output_path, template_path):
    """
    Unisce più xlsx single-sheet in un unico xlsx multi-sheet.
    Ogni file in sheet_files contribuisce con il suo unico foglio.
    Copia media e drawing dal template originale.
    """
    import xml.etree.ElementTree as ET

    # Leggi il template originale per prendere le parti comuni
    with zipfile.ZipFile(template_path,'r') as zt:
        tmpl = {name: zt.read(name) for name in zt.namelist()}

    # Parti comuni da mantenere (tutto tranne i fogli e i loro rels)
    skip_patterns = [
        r'^xl/worksheets/sheet\d+\.xml$',
        r'^xl/worksheets/_rels/sheet\d+\.xml\.rels$',
        r'^xl/sharedStrings\.xml$',  # sarà ricalcolato
    ]

    def should_skip(name):
        for p in skip_patterns:
            if re.match(p, name): return True
        return False

    # Leggi ogni foglio xlsx
    sheets_data = []
    for fpath in sheet_files:
        with zipfile.ZipFile(fpath,'r') as zf:
            all_names = zf.namelist()
            # Trova il foglio (sheet1.xml)
            ws_name = next((n for n in all_names if re.match(r'^xl/worksheets/sheet1\.xml$',n)), None)
            rels_name = 'xl/worksheets/_rels/sheet1.xml.rels'
            ws_data = zf.read(ws_name) if ws_name else b''
            rels_data = zf.read(rels_name) if rels_name in all_names else b''
            # SharedStrings
            ss_data = zf.read('xl/sharedStrings.xml') if 'xl/sharedStrings.xml' in all_names else b''
            sheets_data.append({'ws': ws_data, 'rels': rels_data, 'ss': ss_data})

    # Costruisci il workbook.xml con N fogli
    # Usa il workbook.xml del template come base e aggiorna i sheet refs
    wb_xml = tmpl.get('xl/workbook.xml', b'').decode('utf-8')
    wb_rels = tmpl.get('xl/_rels/workbook.xml.rels', b'').decode('utf-8')

    # Ricostruisci la lista sheets nel workbook.xml
    # Sostituisci il blocco <sheets>...</sheets>
    n = len(sheets_data)
    sheets_xml = '<sheets>'
    for i in range(1, n+1):
        name_map = {1:'PRIMA_PAGINA', len(sheets_data):'PAGINA_FINALE'}
        sh_name = name_map.get(i, f'PAGINE_INTERMEDIE_{i-1}')
        sheets_xml += f'<sheet name="{sh_name}" sheetId="{i}" r:id="rId{i}"/>'
    sheets_xml += '</sheets>'
    wb_xml = re.sub(r'<sheets>.*?</sheets>', sheets_xml, wb_xml, flags=re.DOTALL)

    # Ricostruisci workbook.xml.rels
    rels_xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    rels_xml += '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    for i in range(1, n+1):
        rels_xml += f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>'
    # Aggiungi styles e sharedStrings
    existing_rels = re.findall(r'<Relationship[^/]*/>', wb_rels)
    for rel in existing_rels:
        if 'worksheet' not in rel and 'sharedStrings' not in rel:
            # Rinumera l'Id
            rel = re.sub(r'Id="rId\d+"', f'Id="rId{n + existing_rels.index(rel) + 1}"', rel)
            rels_xml += rel
    rels_xml += '</Relationships>'

    # Costruisci il file output
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zout:
        # Scrivi tutte le parti comuni dal template
        for name, data in tmpl.items():
            if should_skip(name): continue
            if name == 'xl/workbook.xml':
                zout.writestr(name, wb_xml.encode('utf-8'))
            elif name == 'xl/_rels/workbook.xml.rels':
                zout.writestr(name, rels_xml.encode('utf-8'))
            else:
                zout.writestr(name, data)

        # Scrivi i fogli
        for i, sheet in enumerate(sheets_data, 1):
            zout.writestr(f'xl/worksheets/sheet{i}.xml', sheet['ws'])
            if sheet['rels']:
                zout.writestr(f'xl/worksheets/_rels/sheet{i}.xml.rels', sheet['rels'])


if __name__ == '__main__':
    if len(sys.argv) > 1:
        with open(sys.argv[1],'r') as f: input_json = f.read()
    else:
        input_json = sys.stdin.read()
    output = sys.argv[2] if len(sys.argv) > 2 else '/tmp/output.pdf'
    genera_preventivo(input_json, output)
