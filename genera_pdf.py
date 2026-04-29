#!/usr/bin/env python3
"""
Motore generazione PDF preventivi/ordini Max Porte
Uso: python3 genera_pdf.py <input_json> <output_pdf>
"""
import sys, json, os, subprocess, shutil, copy
from openpyxl import load_workbook
from openpyxl.cell.cell import MergedCell
from openpyxl.utils import get_column_letter

TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), 'template_preventivo.xlsx')

def sostituisci(val, mapping):
    """Sostituisce tutti i segnaposto in una stringa."""
    if not isinstance(val, str): return val
    for k, v in mapping.items():
        val = val.replace(k, str(v) if v is not None else '')
    return val

def riga_vuota(ws, row_idx, ncols=41):
    """Controlla se una riga è tutta vuota."""
    for c in range(1, ncols+1):
        cell = ws.cell(row=row_idx, column=c)
        if isinstance(cell, MergedCell): continue
        if cell.value and str(cell.value).strip() and '*' not in str(cell.value):
            return False
    return True

def ha_segnaposto_valorizzati(ws, row_idx, dati, ncols=41):
    """Controlla se almeno un segnaposto in una riga ha un valore non vuoto."""
    for c in range(1, ncols+1):
        cell = ws.cell(row=row_idx, column=c)
        if isinstance(cell, MergedCell): continue
        if cell.value and isinstance(cell.value, str) and '*' in cell.value:
            sostituto = sostituisci(cell.value, dati)
            if sostituto.strip():
                return True
    return False

def compila_foglio(ws, mapping):
    """Sostituisce tutti i segnaposto nel foglio."""
    for row in ws.iter_rows():
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and isinstance(cell.value, str):
                cell.value = sostituisci(cell.value, mapping)

def genera_qr(testo, size_px=80):
    return None

def copia_riga_template(ws_dest, ws_src, src_row, dest_row):
    """Copia una riga dal foglio sorgente al foglio destinazione."""
    for cell in ws_src[src_row]:
        if isinstance(cell, MergedCell): continue
        dest_cell = ws_dest.cell(row=dest_row, column=cell.column)
        dest_cell.value = cell.value
        if cell.has_style:
            import copy
            dest_cell.font = copy.copy(cell.font)
            dest_cell.fill = copy.copy(cell.fill)
            dest_cell.alignment = copy.copy(cell.alignment)
            dest_cell.border = copy.copy(cell.border)
            dest_cell.number_format = cell.number_format

def genera_preventivo(dati_json, output_path):
    data = json.loads(dati_json)
    doc = data['documento']
    righe = data['righe']
    tipo = data.get('tipo', 'preventivo')

    # Mapping globale documento
    sc1 = doc.get('sconto1', 0)
    sc2 = doc.get('sconto2', 0)
    sc_label = f"{sc1}%" if sc2 == 0 else f"{sc1}%+{sc2}%"
    
    tot_imponibile = doc.get('totale_imponibile', 0)
    tot_netto = doc.get('totale_netto', tot_imponibile * (1-sc1/100) * (1-sc2/100))
    iva_pct = 22
    iva_euro = round(tot_netto * iva_pct / 100, 2)
    tot_iva = round(tot_netto + iva_euro, 2)

    mapping_doc = {
        '*TIPO_DOCUMENTO*': doc.get('tipo_documento', 'PREVENTIVO'),
        '*DATA_GENERAZIONE_DOCUMENTO': doc.get('data', ''),
        '*CODICE_PREVENTIVO*': doc.get('numero', ''),
        '*DATA_ULTIMA_MODIFICA*': doc.get('data_modifica', ''),
        '*NOME_COGNOME_COMPILATORE*': doc.get('compilatore', ''),
        '*RAGIONE SOCIALE*': doc.get('ragione_sociale', ''),
        '*RAGIONE SOCIALE RIGA 2*': doc.get('ragione_sociale_riga2', ''),
        '*INDIRIZZO*': doc.get('indirizzo', ''),
        '*CAP* *CITTÀ* *(PROVINCIA)*': f"{doc.get('cap','')} {doc.get('citta','')} ({doc.get('provincia','')})",
        '*PAESE*': doc.get('paese', 'Italia'),
        '*NOME DESTINAZIONE*': doc.get('dest_nome', doc.get('ragione_sociale','')),
        '*NOME DESTINAZIONE RIGA 2*': '',
        '*CAP* *CITTÀ* *(PROVINCIA)*': f"{doc.get('dest_cap','')} {doc.get('dest_citta','')} ({doc.get('dest_provincia','')})",
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
        '*GIORNI_VALIDITÀ_OFFERTA*': doc.get('validita_offerta', '30'),
        '*BARCODE_DOCUMENTO*': '',  # inserito come immagine
        # Riepilogo finale
        '*SOMMA_TOTALI_POSIZIONI*': f"{tot_imponibile:,.2f}".replace(',','X').replace('.',',').replace('X','.'),
        '*SCONTO*': '',
        '*OMAGGI*': '',
        '*SCONTO_PAGAMENTO*': '',
        '*TOTALE_MERCE_SCONTATO*': f"{tot_netto:,.2f}".replace(',','X').replace('.',',').replace('X','.'),
        '*TOTALE_IMPONIBILE*': f"{tot_netto:,.2f}".replace(',','X').replace('.',',').replace('X','.'),
        '*TOTALE_IVA*': f"{iva_euro:,.2f}".replace(',','X').replace('.',',').replace('X','.'),
        '*TOTALE_IMBALLO*': '',
        '*TOTALE_TRASPORTO*': '',
        '*TOTALE_SPESE*': '',
        '*SOMMA_RIEPILOGO_OFFERTA*': f"{tot_iva:,.2f}".replace(',','X').replace('.',',').replace('X','.'),
    }

    # Carica template
    wb_tmpl = load_workbook(TEMPLATE_PATH)
    ws_prima = wb_tmpl['PRIMA_PAGINA']
    ws_inter = wb_tmpl['PAGINE_INTERMEDIE']
    ws_finale = wb_tmpl['PAGINA_FINALE']

    # Trova le righe di una posizione nel foglio intermedio
    # La posizione inizia alla riga con *POSIZIONE* e finisce alla riga con *TOTALE_POSIZIONE*
    pos_start = None
    pos_end = None
    for row in ws_inter.iter_rows():
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and '*POSIZIONE*' in str(cell.value):
                pos_start = cell.row
            if cell.value and '*TOTALE_POSIZIONE*' in str(cell.value):
                pos_end = cell.row
                break
        if pos_end: break

    # Crea workbook output
    from openpyxl import Workbook
    wb_out = Workbook()
    wb_out.remove(wb_out.active)

    def crea_foglio_da_template(ws_src, sheet_name):
        ws_new = wb_out.create_sheet(sheet_name)
        ws_new.sheet_view.showGridLines = False
        # Copia dimensioni colonne
        for col, dim in ws_src.column_dimensions.items():
            ws_new.column_dimensions[col].width = dim.width
        # Copia altezze righe
        for row, dim in ws_src.row_dimensions.items():
            ws_new.row_dimensions[row].height = dim.height
        # Copia merge
        for merge in ws_src.merged_cells.ranges:
            ws_new.merge_cells(str(merge))
        # Copia celle
        import copy
        for row in ws_src.iter_rows():
            for cell in row:
                if isinstance(cell, MergedCell): continue
                nc = ws_new.cell(row=cell.row, column=cell.column)
                nc.value = cell.value
                if cell.has_style:
                    nc.font = copy.copy(cell.font)
                    nc.fill = copy.copy(cell.fill)
                    nc.alignment = copy.copy(cell.alignment)
                    nc.border = copy.copy(cell.border)
                    nc.number_format = cell.number_format
        # Copia page setup dal template originale
        ws_new.page_setup.paperSize = ws_src.page_setup.paperSize or ws_new.PAPERSIZE_A4
        ws_new.page_setup.orientation = ws_src.page_setup.orientation or 'portrait'
        ws_new.page_setup.fitToPage = True
        ws_new.page_setup.fitToWidth = 1
        ws_new.page_setup.fitToHeight = 0
        ws_new.sheet_properties.pageSetUpPr.fitToPage = True
        # Copia margini
        if ws_src.page_margins:
            from openpyxl.worksheet.page import PageMargins
            ws_new.page_margins = PageMargins(
                left=ws_src.page_margins.left,
                right=ws_src.page_margins.right,
                top=ws_src.page_margins.top,
                bottom=ws_src.page_margins.bottom,
                header=ws_src.page_margins.header,
                footer=ws_src.page_margins.footer
            )
        # Copia print area
        if ws_src.print_area:
            ws_new.print_area = ws_src.print_area
        return ws_new

    # Determina come distribuire le righe nei fogli
    # Prima pagina: 1 porta, Pagine intermedie: N porte, Ultima pagina: ultima porta + totali
    n = len(righe)
    
    if n == 0:
        print("Nessuna riga", file=sys.stderr)
        return

    def compila_posizione(ws, riga_tmpl_start, riga_tmpl_end, dest_start, riga_data, sc):
        """Compila il blocco di una posizione con i dati della riga."""
        fmt = lambda v: f"{v:,.2f}".replace(',','X').replace('.',',').replace('X','.') if isinstance(v,(int,float)) and v else ''
        pr = riga_data.get('prezzo_base', 0)
        pr_netto = round(pr * (1-sc/100), 2) if pr else 0
        
        mapping_riga = {
            '*POSIZIONE*': riga_data.get('posizione',''),
            '*L*': str(riga_data.get('larghezza','')),
            '*H*': str(riga_data.get('altezza','')),
            '*S*': str(riga_data.get('spessore','')),
            '*SENSO*': riga_data.get('senso',''),
            '*APERTURA*': riga_data.get('apertura',''),
            '*QUANTITÀ*': str(riga_data.get('quantita',1)),
            '*UM*': riga_data.get('um','NR'),
            '*PRODOTTO*': riga_data.get('modello',''),
            '*SERIE*': riga_data.get('serie',''),
            '*MODELLO*': riga_data.get('modello',''),
            '*FINITURA*': riga_data.get('finitura',''),
            '*FINITURA_TELAIO*': riga_data.get('finitura_telaio',''),
            '*FINITURA_COPRIFILI*': riga_data.get('finitura_coprifili',''),
            '*COLORE_PIETRA*': riga_data.get('colore_pietra',''),
            '*COLORE_INSERTO_ALLUMINIO*': riga_data.get('colore_inserto',''),
            '*TIPO_DI_VETRO*': riga_data.get('vetro',''),
            '*INCISIONI_O_STAMPE_DECORATIVE*': riga_data.get('incisioni',''),
            '*BUGNA_O_PANNELLO*': riga_data.get('bugna',''),
            '*TIPOLOGIA*': riga_data.get('apertura',''),
            '*SENSO*': riga_data.get('senso_apertura',''),
            '*SERRATURA*': riga_data.get('serratura',''),
            '*SPALLA*': riga_data.get('spalla',''),
            '*FERRAMENTA*': riga_data.get('ferramenta',''),
            '*MANIGLIA*': riga_data.get('maniglia',''),
            '*VERSIONE_MANIGLIA*': riga_data.get('versione_maniglia',''),
            '*COLORE_MANIGLIA*': riga_data.get('colore_maniglia',''),
            '*KIT_VARSAVIA_SCORREVOLE*': riga_data.get('kit_varsavia',''),
            '*KIT_RIM_16_SCORREVOLE*': riga_data.get('kit_rim16',''),
            '*LAVORAZIONI_EXTRA*': '',
            '*ACCESSORI*': '',
            '*SUPPLEMENTO_FUORI_MISURA_L_SI_NO*': riga_data.get('fuori_misura_l',''),
            '*SUPPLEMENTO_FUORI_MISURA_H_SI_NO*': riga_data.get('fuori_misura_h',''),
            '*SUPPLEMENTO_RIFILATURA_SI_NO*': '',
            '*STANZA*': riga_data.get('stanza',''),
            '*NOTE_RIGA*': riga_data.get('note_riga',''),
            # Prezzi
            '*SC*': str(int(sc)) if sc else '',
            '*PREZZO_MODELLO_LISTINO*': fmt(riga_data.get('prezzo_base',0)),
            '*PREZZO_MODELLO_SCONTATO*': fmt(round(riga_data.get('prezzo_base',0)*(1-sc/100),2)),
            '*PREZZO_FINITURA_LISTINO*': fmt(riga_data.get('prezzo_finitura',0)) if riga_data.get('prezzo_finitura') else '',
            '*PREZZO_FINITURA_SCONTATO*': fmt(round(riga_data.get('prezzo_finitura',0)*(1-sc/100),2)) if riga_data.get('prezzo_finitura') else '',
            '*SUPPLEMENTO_BICOLORE_LISTINO*': '',
            '*SUPPLEMENTO_BICOLORE_SCONTATO*': '',
            '*SUPPLEMENTO_COLORE_INSERTO_LISTINO*': '',
            '*SUPPLEMENTO_COLORE_INSERTO_SCONTATO*': '',
            '*PREZZO_VETRO_LISTINO*': fmt(riga_data.get('prezzo_vetro',0)) if riga_data.get('prezzo_vetro') else '',
            '*PREZZO_VETRO_SCONTATO*': fmt(round(riga_data.get('prezzo_vetro',0)*(1-sc/100),2)) if riga_data.get('prezzo_vetro') else '',
            '*PREZZO_INCISIONE_O_STAMPA_LISTINO*': '',
            '*PREZZO_INCISIONE_O_STAMPA_SCONTATO*': '',
            '*SUPPLEMENTO_SERRATURA_LISTINO*': fmt(riga_data.get('prezzo_serratura',0)) if riga_data.get('prezzo_serratura') else '',
            '*SUPPLEMENTO_SERRATURA_SCONTATO*': fmt(round(riga_data.get('prezzo_serratura',0)*(1-sc/100),2)) if riga_data.get('prezzo_serratura') else '',
            '*SUPPLEMENTO_STIPITE_LISTINO*': fmt(riga_data.get('prezzo_telaio',0)) if riga_data.get('prezzo_telaio') else '',
            '*SUPPLEMENTO_STIPITE_SCONTATO*': fmt(round(riga_data.get('prezzo_telaio',0)*(1-sc/100),2)) if riga_data.get('prezzo_telaio') else '',
            '*SUPPLEMENTO_COLORE_FERRAMENTA_LISTINO*': fmt(riga_data.get('prezzo_ferramenta',0)) if riga_data.get('prezzo_ferramenta') else '',
            '*SUPPLEMENTO_COLORE_FERRAMENTA_SCONTATO*': fmt(round(riga_data.get('prezzo_ferramenta',0)*(1-sc/100),2)) if riga_data.get('prezzo_ferramenta') else '',
            '*PREZZO_MANIGLIA_LISTINO*': fmt(riga_data.get('prezzo_maniglia',0)) if riga_data.get('prezzo_maniglia') else '',
            '*PREZZO_MANIGLIA_SCONTATO*': fmt(round(riga_data.get('prezzo_maniglia',0)*(1-sc/100),2)) if riga_data.get('prezzo_maniglia') else '',
            '*PREZZO_KIT_VARSAVIA_SCORREVOLE_LISTINO*': '',
            '*PREZZO_KIT_VARSAVIA_SCORREVOLE_SCONTATO*': '',
            '*PREZZO_KIT_RIM_16_SCORREVOLE_LISTINO*': '',
            '*PREZZO_KIT_RIM_16_SCORREVOLE_SCONTATO*': '',
            '*PREZZO_LAVORAZIONI_EXTRA_LISTINO*': fmt(riga_data.get('prezzo_extra',0)) if riga_data.get('prezzo_extra') else '',
            '*PREZZO_LAVORAZIONI_EXTRA_SCONTATO*': '',
            '*PREZZO_ACCESSORI_LISTINO*': '',
            '*PREZZO_ACCESSORI_SCONTATO*': '',
            '*SUPPLEMENTO_FUORI_MISURA_L_LISTINO*': '',
            '*SUPPLEMENTO_FUORI_MISURA_L_SCONTATO*': '',
            '*SUPPLEMENTO_FUORI_MISURA_H_LISTINO*': '',
            '*SUPPLEMENTO_FUORI_MISURA_H_SCONTATO*': '',
            '*SUPPLEMENTO_RIFILATURA_LISTINO*': '',
            '*SUPPLEMENTO_RIFILATURA_SCONTATO*': '',
            '*TOTALE_RIGA*': '',  # non usato per singola riga
            '*TOTALE_POSIZIONE*': fmt(riga_data.get('prezzo_totale',0)),
            '*IMMAGINE*': '',
        }
        return mapping_riga

    # Per semplicità generiamo un unico foglio con prima pagina + posizioni + finale
    # La struttura multi-foglio la implementeremo nella versione avanzata
    ws_out = crea_foglio_da_template(ws_prima, 'Preventivo')
    # Forza area di stampa A1:AO fino all'ultima riga usata
    ws_out.print_area = 'A1:AO200'
    
    # Compila dati documento nella prima pagina
    compila_foglio(ws_out, {**mapping_doc})

    # Ora aggiungi le righe posizioni dopo la riga *POSIZIONE* nella prima pagina
    # Trova riga *POSIZIONE* nel foglio output
    pos_row_out = None
    pos_end_out = None
    for row in ws_out.iter_rows():
        for cell in row:
            if isinstance(cell, MergedCell): continue
            if cell.value and '*POSIZIONE*' in str(cell.value):
                pos_row_out = cell.row
            if cell.value and '*TOTALE_POSIZIONE*' in str(cell.value):
                pos_end_out = cell.row
                break
        if pos_end_out: break

    if pos_row_out and pos_end_out and len(righe) > 0:
        sc = doc.get('sconto1', 0)
        
        # Prima porta: usa le righe già nel template
        mapping_r0 = compila_posizione(ws_out, pos_row_out, pos_end_out, pos_row_out, righe[0], sc)
        compila_foglio(ws_out, mapping_r0)

    # Compila anche il foglio finale per i totali
    ws_fin = crea_foglio_da_template(ws_finale, 'Finale')
    compila_foglio(ws_fin, {**mapping_doc})

    # Salva workbook temporaneo
    tmp_xlsx = output_path.replace('.pdf', '_tmp.xlsx')
    wb_out.save(tmp_xlsx)

    # Converti in PDF con LibreOffice
    out_dir = os.path.dirname(output_path)
    r = subprocess.run([
        'libreoffice', '--headless',
        '--convert-to', 'pdf',
        '--infilter', 'Calc MS Excel 2007 XML',
        '--outdir', out_dir, tmp_xlsx
    ], capture_output=True, text=True, timeout=60,
    env={**os.environ, 'PYTHONPATH': ''})
    
    # Rinomina output
    tmp_pdf = tmp_xlsx.replace('.xlsx', '.pdf')
    if os.path.exists(tmp_pdf):
        os.rename(tmp_pdf, output_path)
        os.remove(tmp_xlsx)
        print(f"PDF generato: {output_path}", file=sys.stderr)
    else:
        print(f"Errore LibreOffice: {r.stderr}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        # sys.argv[1] è il path del file JSON
        with open(sys.argv[1], 'r') as f:
            input_json = f.read()
    else:
        input_json = sys.stdin.read()
    output = sys.argv[2] if len(sys.argv) > 2 else '/tmp/output.pdf'
    genera_preventivo(input_json, output)
