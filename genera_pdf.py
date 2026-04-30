#!/usr/bin/env python3
"""Motore generazione PDF preventivi/ordini Max Porte - approccio in-place"""
import sys, json, os, subprocess, copy, shutil
from openpyxl import load_workbook
from openpyxl.cell.cell import MergedCell

TEMPLATE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template_preventivo.xlsx')
# Fallback per Railway o ambienti diversi
if not os.path.exists(TEMPLATE_PATH):
    for candidate in [
        '/app/template_preventivo.xlsx',
        os.path.join(os.getcwd(), 'template_preventivo.xlsx'),
    ]:
        if os.path.exists(candidate):
            TEMPLATE_PATH = candidate
            break

def fmt_euro(v):
    if not v and v != 0: return ''
    try:
        f = float(v)
        if f == 0: return ''  # zero = campo vuoto nel PDF
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
    """
    Nasconde le righe della sezione posizione dove il valore è vuoto.
    Una riga va nascosta se:
    - col 16 (valore) è vuota o ha solo segnaposto rimasti
    - le colonne prezzi hanno solo '€ ' senza numeri
    """
    import re

    def ha_valore_reale(v):
        if not v: return False
        s = str(v).strip()
        if not s: return False
        if '*' in s: return False  # segnaposto non sostituito
        # Ignora "€ " senza numero, "50%" standalone, "-", "X", "x"
        if re.match(r'^€\s*$', s): return False
        if re.match(r'^\d+%$', s): return False
        if s in ('-', 'X', 'x', '€'): return False
        return True

    for row in ws.iter_rows(min_row=31):  # solo sezione posizione
        row_idx = row[0].row
        cells = {cell.column: cell for cell in row if not isinstance(cell, MergedCell)}

        # Ottieni valore colonna 16 (P = descrizione)
        val16 = cells.get(16)
        desc_vuoto = not ha_valore_reale(val16.value if val16 else None)

        # Ottieni valori colonne prezzi (28, 31, 33, 36)
        prezzi_vuoti = all(
            not ha_valore_reale(cells.get(c).value if cells.get(c) else None)
            for c in [28, 33, 36]
        )

        # Nascondi se descrizione vuota E prezzi vuoti
        if desc_vuoto and prezzi_vuoti:
            ws.row_dimensions[row_idx].hidden = True

def genera_preventivo(dati_json, output_path):
    data = json.loads(dati_json)
    doc = data['documento']
    righe = data['righe']

    sc1 = float(doc.get('sconto1', 0))
    tot_imp = float(doc.get('totale_imponibile', 0))
    tot_netto = round(tot_imp * (1 - sc1/100), 2)
    iva_pct = 22
    iva_euro = round(tot_netto * iva_pct / 100, 2)
    tot_iva = round(tot_netto + iva_euro, 2)

    # Mapping documento
    mapping_doc = {
        '*TIPO_DOCUMENTO*': doc.get('tipo_documento', 'PREVENTIVO'),
        '*DATA_GENERAZIONE_DOCUMENTO': doc.get('data', ''),
        '*CODICE_PREVENTIVO*': doc.get('numero', ''),
        '*DATA_ULTIMA_MODIFICA*': doc.get('data_modifica', ''),
        '*NOME_COGNOME_COMPILATORE*': doc.get('compilatore', ''),
        '*RAGIONE SOCIALE*': doc.get('ragione_sociale', ''),
        '*RAGIONE SOCIALE RIGA 2*': doc.get('ragione_sociale_riga2', ''),
        '*INDIRIZZO*': doc.get('indirizzo', ''),
        '*INDIRIZZO RIGA 2*': '',
        '*CAP* *CITTÀ* *(PROVINCIA)*': f"{doc.get('cap','')} {doc.get('citta','')} ({doc.get('provincia','')})",
        '*PAESE*': doc.get('paese', 'Italia'),
        '*NOME DESTINAZIONE*': doc.get('dest_nome', doc.get('ragione_sociale','')),
        '*NOME DESTINAZIONE RIGA 2*': '',
        '*NOME DESTINAZIONE RIGA 2': '',
        '*INDIRIZZO DESTINAZIONE*': doc.get('dest_indirizzo', doc.get('indirizzo','')),
        '*CAP* *CITTÀ DEST* *(PROVINCIA DEST)*': f"{doc.get('dest_cap','')} {doc.get('dest_citta','')} ({doc.get('dest_provincia','')})",
        '*PAESE DEST*': doc.get('dest_paese', 'Italia'),
        '*RIFERIMENTO_CLIENTE*': doc.get('riferimento_cliente', ''),
        '*CODICE_CLIENTE*': doc.get('codice_cliente', ''),
        '*AGENTE*': doc.get('agente', ''),
        '*RESA*': doc.get('resa', ''),
        '*TRASPORTO*': doc.get('trasporto', ''),
        '*PARTITA_IVA*': doc.get('partita_iva', ''),
        '*CODICE_FISCALE*': doc.get('codice_fiscale', ''),
        '*TELEFONO*': doc.get('telefono', ''),
        '*CELLULARE*': doc.get('cellulare', ''),
        '*REFERENTE*': doc.get('referente', ''),
        '*RIFERIMENTI_DESTINAZIONE*': doc.get('dest_riferimenti', ''),
        '*CONDIZIONI_DI_PAGAMENTO*': doc.get('condizioni_pagamento', ''),
        '*BANCA_DI_APPOGGIO*': doc.get('banca', ''),
        '*CIN* *ABI* *CAB*': doc.get('cin_abi_cab', ''),
        '*EMAIL_1*': doc.get('email1', ''),
        '*EMAIL_2*': doc.get('email2', ''),
        '*SDI*': doc.get('sdi', ''),
        '*PEC*': doc.get('pec', ''),
        '*GIORNI_VALIDITÀ_OFFERTA*': str(doc.get('validita_offerta', '30')),
        '*BARCODE_DOCUMENTO*': '',
        '*SOMMA_TOTALI_POSIZIONI*': fmt_euro(tot_imp),
        '*SCONTO*': f"{int(sc1)}%" if sc1 else '',
        '*OMAGGI*': '',
        '*SCONTO_PAGAMENTO*': '',
        '*TOTALE_MERCE_SCONTATO*': fmt_euro(tot_netto),
        '*TOTALE_IMPONIBILE*': fmt_euro(tot_netto),
        '*TOTALE_IVA*': fmt_euro(iva_euro),
        '*TOTALE_IMBALLO*': fmt_euro(doc.get('totale_imballo', '')),
        '*TOTALE_TRASPORTO*': '',
        '*TOTALE_SPESE*': '',
        '*SOMMA_RIEPILOGO_OFFERTA*': fmt_euro(tot_iva),
    }

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
            '*COD_APERTURA*': r.get('codice_apertura','') or r.get('apertura','').split()[0] if r.get('apertura') else '',
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
            '*TIPOLOGIA*': r.get('apertura',''),
            '*SERRATURA*': r.get('serratura',''),
            '*SPALLA*': r.get('spalla',''),
            '*FERRAMENTA*': r.get('ferramenta',''),
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

    # Carica template fresco per ogni generazione
    wb = load_workbook(TEMPLATE_PATH)

    if len(righe) == 0:
        print("Nessuna riga", file=sys.stderr)
        sys.exit(1)

    # PRIMA PAGINA: intestazione + posizione 1
    ws1 = wb['PRIMA_PAGINA']
    sostituisci_foglio(ws1, {**mapping_doc, **mapping_riga(righe[0], sc1)})
    nascondi_righe_vuote(ws1)

    # PAGINE INTERMEDIE: duplicate per posizioni 2..N
    # Partiamo dal foglio template e duplichiamo per ogni posizione extra
    ws_inter_tmpl = wb['PAGINE_INTERMEDIE']

    if len(righe) > 1:
        # Compila il foglio intermedio con la seconda posizione
        sostituisci_foglio(ws_inter_tmpl, {**mapping_doc, **mapping_riga(righe[1], sc1)})
        nascondi_righe_vuote(ws_inter_tmpl)

        # Per le posizioni 3..N aggiungi fogli intermedi
        for i, riga in enumerate(righe[2:], 3):
            # Carica un template fresco per la nuova pagina
            wb_fresh = load_workbook(TEMPLATE_PATH)
            ws_fresh = wb_fresh['PAGINE_INTERMEDIE']
            sostituisci_foglio(ws_fresh, {**mapping_doc, **mapping_riga(riga, sc1)})
            nascondi_righe_vuote(ws_fresh)
            # Copia il foglio nel workbook principale
            new_ws = wb.copy_worksheet(ws_inter_tmpl)
            new_ws.title = f'POS_{i}'
            # Risostituisci con i valori corretti
            sostituisci_foglio(new_ws, {**mapping_doc, **mapping_riga(riga, sc1)})
            nascondi_righe_vuote(new_ws)
    else:
        # Solo una riga: nascondi tutto il foglio intermedio
        for r in ws_inter_tmpl.iter_rows():
            ws_inter_tmpl.row_dimensions[r[0].row].hidden = True

    # PAGINA FINALE: totali
    ws_fin = wb['PAGINA_FINALE']
    sostituisci_foglio(ws_fin, {**mapping_doc})
    nascondi_righe_vuote(ws_fin)

    # Salva e converti
    tmp_xlsx = output_path.replace('.pdf', '_tmp.xlsx')
    wb.save(tmp_xlsx)

    # Ripristina immagini, drawing e rels dal template originale
    import zipfile as zf_mod, re as re_mod
    tmp_patched = tmp_xlsx.replace('.xlsx', '_p.xlsx')
    try:
        with zf_mod.ZipFile(TEMPLATE_PATH, 'r') as zt:
            tmpl_files = {}
            for name in zt.namelist():
                if (name.startswith('xl/media/') or
                    name.startswith('xl/drawings/') or
                    name.startswith('xl/worksheets/_rels/')):
                    tmpl_files[name] = zt.read(name)
            inter_rels = tmpl_files.get('xl/worksheets/_rels/sheet2.xml.rels', b'')

        with zf_mod.ZipFile(tmp_xlsx, 'r') as zin:
            items = [(item, zin.read(item.filename)) for item in zin.infolist()]

        existing = {item.filename for item, _ in items}

        # Trova fogli extra senza rels
        ws_files = {n for n in existing if re_mod.match(r'xl/worksheets/sheet\d+\.xml$', n)}
        extra_rels = []
        for ws_name in ws_files:
            rels_name = ws_name.replace('xl/worksheets/', 'xl/worksheets/_rels/') + '.rels'
            if rels_name not in existing and rels_name not in tmpl_files:
                extra_rels.append(rels_name)

        with zf_mod.ZipFile(tmp_patched, 'w', zf_mod.ZIP_DEFLATED) as zout:
            for item, data in items:
                zout.writestr(item, data)
            for name, data in tmpl_files.items():
                if name not in existing:
                    zout.writestr(name, data)
            for rels_name in extra_rels:
                zout.writestr(rels_name, inter_rels)

        os.replace(tmp_patched, tmp_xlsx)
    except Exception as e:
        print(f"Media copy warning: {e}", file=sys.stderr)
        import traceback; traceback.print_exc(file=sys.stderr)
        try: os.remove(tmp_patched)
        except: pass



    out_dir = os.path.dirname(os.path.abspath(output_path))
    r = subprocess.run([
        'libreoffice', '--headless',
        '--convert-to', 'pdf',
        '--outdir', out_dir, tmp_xlsx
    ], capture_output=True, text=True, timeout=60,
    env={**os.environ, 'HOME': '/tmp'})

    tmp_pdf = tmp_xlsx.replace('.xlsx', '.pdf')
    if os.path.exists(tmp_pdf):
        os.replace(tmp_pdf, output_path)
        try: os.remove(tmp_xlsx)
        except: pass
        print(f"PDF generato: {output_path}", file=sys.stderr)
    else:
        print(f"Errore LibreOffice (rc={r.returncode}): {r.stderr}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            input_json = f.read()
    else:
        input_json = sys.stdin.read()
    output = sys.argv[2] if len(sys.argv) > 2 else '/tmp/output.pdf'
    genera_preventivo(input_json, output)
