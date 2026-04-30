#!/usr/bin/env python3
"""Motore generazione PDF preventivi/ordini Max Porte - approccio in-place"""
import sys, json, os, subprocess, copy, shutil
from openpyxl import load_workbook
from openpyxl.cell.cell import MergedCell

TEMPLATE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template_preventivo.xlsx')

def fmt_euro(v):
    if not v and v != 0: return ''
    try:
        return f"{float(v):,.2f}".replace(',','X').replace('.',',').replace('X','.')
    except: return str(v)

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
    for row in ws.iter_rows():
        row_idx = row[0].row
        has_real = False
        has_placeholder = False
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and isinstance(cell.value, str):
                v = cell.value.strip()
                if '*' in v: has_placeholder = True
                elif v: has_real = True
            elif cell.value is not None:
                has_real = True
        if has_placeholder and not has_real:
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
            '*SENSO*': r.get('senso',''),
            '*APERTURA*': r.get('apertura',''),
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

    # Prima pagina: intestazione + prima riga
    ws_prima = wb['PRIMA_PAGINA']
    full_mapping = {**mapping_doc, **mapping_riga(righe[0], sc1)}
    sostituisci_foglio(ws_prima, full_mapping)
    nascondi_righe_vuote(ws_prima)

    # Pagine intermedie: righe 2..N-1 (se esistono)
    ws_inter = wb['PAGINE_INTERMEDIE']
    if len(righe) > 2:
        # Per ora usa la prima riga intermedia come placeholder
        sostituisci_foglio(ws_inter, {**mapping_doc, **mapping_riga(righe[1], sc1)})
        nascondi_righe_vuote(ws_inter)
    else:
        # Nascondi tutto il foglio intermedio
        for row in ws_inter.iter_rows():
            ws_inter.row_dimensions[row[0].row].hidden = True

    # Pagina finale: ultima riga + totali
    ws_finale = wb['PAGINA_FINALE']
    ultima = righe[-1] if len(righe) > 1 else righe[0]
    sostituisci_foglio(ws_finale, {**mapping_doc, **mapping_riga(ultima, sc1)})
    nascondi_righe_vuote(ws_finale)

    # Salva e converti
    tmp_xlsx = output_path.replace('.pdf', '_tmp.xlsx')
    wb.save(tmp_xlsx)

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
