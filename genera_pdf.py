#!/usr/bin/env python3
"""Motore generazione PDF preventivi/ordini Max Porte"""
import sys, json, os, subprocess, re, glob
from openpyxl import load_workbook
from openpyxl.cell.cell import MergedCell

TEMPLATE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template_preventivo.xlsx')
if not os.path.exists(TEMPLATE_PATH):
    for c in ['/app/template_preventivo.xlsx', os.path.join(os.getcwd(), 'template_preventivo.xlsx')]:
        if os.path.exists(c): TEMPLATE_PATH = c; break

def fmt_euro(v):
    if not v and v != 0: return ''
    try:
        f = float(v)
        if f == 0: return ''
        return f"{f:,.2f}".replace(',','X').replace('.',',').replace('X','.')
    except: return str(v) if v else ''

def sostituisci(ws, mapping):
    for row in ws.iter_rows():
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and isinstance(cell.value, str):
                val = cell.value
                for k, v in mapping.items():
                    val = val.replace(k, str(v) if v is not None else '')
                cell.value = val

def nascondi_vuote(ws):
    def ok(v):
        if not v: return False
        s = str(v).strip()
        if not s or '*' in s: return False
        if re.match(r'^€\s*$', s) or re.match(r'^\d+%$', s): return False
        if s in ('-','X','x','€'): return False
        return True
    # Trova riga inizio sezione posizione
    min_r = None
    for row in ws.iter_rows():
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and '*POSIZIONE*' in str(cell.value):
                min_r = cell.row + 1; break
        if min_r: break
    if not min_r: min_r = 19
    for row in ws.iter_rows(min_row=min_r):
        cells = {c.column: c for c in row if not isinstance(c, MergedCell)}
        v16 = cells.get(16)
        desc_ok = ok(v16.value if v16 else None)
        prz_ok = any(ok(cells.get(c).value if cells.get(c) else None) for c in [28,33,36])
        if not desc_ok and not prz_ok:
            ws.row_dimensions[row[0].row].hidden = True

def map_riga(r, sc):
    sc = float(sc)
    def s(v): 
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
        '*PREZZO_TIPOLOGIA_LISTINO*': '',
        '*PREZZO_TIPOLOGIA_SCONTATO*': '',
        '*SERRATURA*': r.get('serratura',''),
        '*SPALLA*': r.get('spalla',''),
        '*FERRAMENTA*': r.get('ferramenta',''),
        '*MANIGLIA* - *VERSIONE_MANIGLIA*': '',
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
        '*PREZZO_MODELLO_SCONTATO*': s(r.get('prezzo_base',0)),
        '*PREZZO_FINITURA_LISTINO*': fmt_euro(r.get('prezzo_finitura','')) if r.get('prezzo_finitura') else '',
        '*PREZZO_FINITURA_SCONTATO*': s(r.get('prezzo_finitura',0)) if r.get('prezzo_finitura') else '',
        '*SUPPLEMENTO_BICOLORE_LISTINO*': '', '*SUPPLEMENTO_BICOLORE_SCONTATO*': '',
        '*SUPPLEMENTO_COLORE_INSERTO_LISTINO*': '', '*SUPPLEMENTO_COLORE_INSERTO_SCONTATO*': '',
        '*PREZZO_VETRO_LISTINO*': fmt_euro(r.get('prezzo_vetro','')) if r.get('prezzo_vetro') else '',
        '*PREZZO_VETRO_SCONTATO*': s(r.get('prezzo_vetro',0)) if r.get('prezzo_vetro') else '',
        '*PREZZO_INCISIONE_O_STAMPA_LISTINO*': '', '*PREZZO_INCISIONE_O_STAMPA_SCONTATO*': '',
        '*SUPPLEMENTO_SERRATURA_LISTINO*': fmt_euro(r.get('prezzo_serratura','')) if r.get('prezzo_serratura') else '',
        '*SUPPLEMENTO_SERRATURA_SCONTATO*': s(r.get('prezzo_serratura',0)) if r.get('prezzo_serratura') else '',
        '*SUPPLEMENTO_STIPITE_LISTINO*': fmt_euro(r.get('prezzo_telaio','')) if r.get('prezzo_telaio') else '',
        '*SUPPLEMENTO_STIPITE_SCONTATO*': s(r.get('prezzo_telaio',0)) if r.get('prezzo_telaio') else '',
        '*SUPPLEMENTO_COLORE_FERRAMENTA_LISTINO*': fmt_euro(r.get('prezzo_ferramenta','')) if r.get('prezzo_ferramenta') else '',
        '*SUPPLEMENTO_COLORE_FERRAMENTA_SCONTATO*': s(r.get('prezzo_ferramenta',0)) if r.get('prezzo_ferramenta') else '',
        '*PREZZO_MANIGLIA_LISTINO*': fmt_euro(r.get('prezzo_maniglia','')) if r.get('prezzo_maniglia') else '',
        '*PREZZO_MANIGLIA_SCONTATO*': s(r.get('prezzo_maniglia',0)) if r.get('prezzo_maniglia') else '',
        '*PREZZO_KIT_VARSAVIA_SCORREVOLE_LISTINO*': '', '*PREZZO_KIT_VARSAVIA_SCORREVOLE_SCONTATO*': '',
        '*PREZZO_KIT_RIM_16_SCORREVOLE_LISTINO*': '', '*PREZZO_KIT_RIM_16_SCORREVOLE_SCONTATO*': '',
        '*PREZZO_LAVORAZIONI_EXTRA_LISTINO*': fmt_euro(r.get('prezzo_extra','')) if r.get('prezzo_extra') else '',
        '*PREZZO_LAVORAZIONI_EXTRA_SCONTATO*': '',
        '*PREZZO_ACCESSORI_LISTINO*': '', '*PREZZO_ACCESSORI_SCONTATO*': '',
        '*SUPPLEMENTO_FUORI_MISURA_L_LISTINO*': '', '*SUPPLEMENTO_FUORI_MISURA_L_SCONTATO*': '',
        '*SUPPLEMENTO_FUORI_MISURA_H_LISTINO*': '', '*SUPPLEMENTO_FUORI_MISURA_H_SCONTATO*': '',
        '*SUPPLEMENTO_RIFILATURA_LISTINO*': '', '*SUPPLEMENTO_RIFILATURA_SCONTATO*': '',
        '*TOTALE_RIGA*': '',
        '*TOTALE_POSIZIONE*': fmt_euro(r.get('prezzo_totale',0)),
        '*IMMAGINE*': '',
    }

def xlsx_to_pdf(xlsx_path, out_dir):
    """Converti un xlsx in PDF e ritorna il path del PDF."""
    r = subprocess.run(
        ['libreoffice','--headless','--convert-to','pdf','--outdir', out_dir, xlsx_path],
        capture_output=True, text=True, timeout=60,
        env={**os.environ, 'HOME':'/tmp'})
    pdf = xlsx_path.replace('.xlsx','.pdf')
    return pdf if os.path.exists(pdf) else None

def genera_foglio(sheet_name, mapping, tmp_path):
    """Carica il template, compila il foglio indicato, salva come xlsx."""
    wb = load_workbook(TEMPLATE_PATH)
    ws = wb[sheet_name]
    sostituisci(ws, mapping)
    nascondi_vuote(ws)
    # Rimuovi gli altri fogli
    for s in list(wb.sheetnames):
        if s != sheet_name: del wb[s]
    wb.save(tmp_path)
    return tmp_path

def genera_preventivo(dati_json, output_path):
    data = json.loads(dati_json)
    doc = data['documento']
    righe = data['righe']
    if not righe: print("Nessuna riga", file=sys.stderr); sys.exit(1)

    sc1 = float(doc.get('sconto1', 0))
    tot_imp = float(doc.get('totale_imponibile', 0))
    tot_netto = round(tot_imp*(1-sc1/100), 2)
    iva_euro = round(tot_netto*22/100, 2)
    tot_iva = round(tot_netto+iva_euro, 2)

    md = {
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
        '*OMAGGI*': '', '*SCONTO_PAGAMENTO*': '',
        '*TOTALE_MERCE_SCONTATO*': fmt_euro(tot_netto),
        '*TOTALE_IMPONIBILE*': fmt_euro(tot_netto),
        '*TOTALE_IVA*': fmt_euro(iva_euro),
        '*TOTALE_IMBALLO*': fmt_euro(doc.get('totale_imballo','')),
        '*TOTALE_TRASPORTO*': '', '*TOTALE_SPESE*': '',
        '*SOMMA_RIEPILOGO_OFFERTA*': fmt_euro(tot_iva),
    }

    tmp_dir = os.path.dirname(os.path.abspath(output_path))
    base = os.path.basename(output_path).replace('.pdf','')
    xlsx_files = []
    pdf_files = []

    # PRIMA PAGINA
    p = os.path.join(tmp_dir, f'{base}_p1.xlsx')
    genera_foglio('PRIMA_PAGINA', {**md, **map_riga(righe[0], sc1)}, p)
    xlsx_files.append(p)

    # PAGINE INTERMEDIE (pos 2..N)
    for i, riga in enumerate(righe[1:], 2):
        p = os.path.join(tmp_dir, f'{base}_p{i}.xlsx')
        genera_foglio('PAGINE_INTERMEDIE', {**md, **map_riga(riga, sc1)}, p)
        xlsx_files.append(p)

    # PAGINA FINALE
    p = os.path.join(tmp_dir, f'{base}_fin.xlsx')
    genera_foglio('PAGINA_FINALE', {**md}, p)
    xlsx_files.append(p)

    # Converti ogni xlsx in PDF
    for xlsx in xlsx_files:
        pdf = xlsx_to_pdf(xlsx, tmp_dir)
        if pdf:
            pdf_files.append(pdf)
        else:
            print(f"Errore conversione: {xlsx}", file=sys.stderr)

    if not pdf_files:
        print("Nessun PDF generato", file=sys.stderr); sys.exit(1)

    # Unisci tutti i PDF con pdftk
    if len(pdf_files) == 1:
        os.replace(pdf_files[0], output_path)
    else:
        r = subprocess.run(
            ['pdftk'] + pdf_files + ['cat', 'output', output_path],
            capture_output=True, text=True, timeout=60)
        if r.returncode != 0:
            print(f"Errore pdftk: {r.stderr[:200]}", file=sys.stderr); sys.exit(1)

    # Pulizia
    for f in xlsx_files + pdf_files:
        try: os.remove(f)
        except: pass

    print(f"PDF generato: {output_path}", file=sys.stderr)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        with open(sys.argv[1],'r') as f: input_json = f.read()
    else:
        input_json = sys.stdin.read()
    output = sys.argv[2] if len(sys.argv) > 2 else '/tmp/output.pdf'
    genera_preventivo(input_json, output)
