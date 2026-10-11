# Spunti MPX Gestionale

Idee raccolte durante la giornata, da valutare a inizio sessione.
Formato: `## data — titolo`, **Area**, **Spunto**, **Stato** (`da valutare` / `approvato` / `scartato` / `fatto`).

---

## 2026-09-06 — Riconciliazione automatica ordini fornitore / DDT / fatture
**Area:** Acquisti / Amministrazione
**Spunto:** Confronto automatico tra ordine a fornitore, DDT di consegna e fattura passiva, con evidenza delle discrepanze.
**Stato:** `da valutare`

---

## 2026-09-06 — Officina progettuale (progetti custom)
**Area:** Configuratore / Ruoli
**Spunto:** Editor dedicato per porte su misura/fuori standard, con creazione al volo di nuovi articoli di magazzino. Accesso solo a responsabile tecnico e super admin.
**Stato:** `da valutare`

---

## 2026-09-06 — Audit qualità "alla cieca"
**Area:** Produzione / Qualità
**Spunto:** Il direttore di produzione marca di nascosto una porta come caso di test (con difetto voluto) per verificare se ogni reparto se ne accorge prima dell'imballo. Il controllo qualità non deve sapere quale porta è il test.
**Stato:** `da valutare`

---

## 2026-09-06 — Step mantovana nel configuratore
**Area:** Configuratore
**Spunto:** Per le tipologie scorrevoli esterno muro, step di scelta del tipo di mantovana con supplemento per tipo.
**Stato:** `da valutare`

---

## 2026-09-06 — Servizi accessori su preventivi/ordini
**Area:** Preventivi / Ordini
**Spunto:** Trasporto per zona geografica, imballo, posa (a scaglioni per quantità di porte, tariffe separate per blindate e relativi telai), trasferta.
**Stato:** `approvato` — imballo per riga e trasporto nei totali FATTI (ott 2026); restano zone/tariffe trasporto e posa/trasferta.

---

## 2026-09-06 — Modulo porte blindate
**Area:** Configuratore / Magazzino / Produzione
**Spunto:** Integrazione completa: arrivano finite, internamente subiscono taglio/foratura/montaggio pannelli (lavorazioni CNC).
**Stato:** `da valutare`

---

## 2026-09-06 — Calcolo automatico allargatori telaio
**Area:** Configuratore
**Spunto:** Se lo spessore muro supera la copertura del telaio, calcolo automatico degli allargatori necessari.
**Stato:** `da valutare`

---

## 2026-09-06 — Fatturazione/DDT tramite piattaforma certificata esterna
**Area:** Amministrazione
**Spunto:** Valutare l'integrazione via API con un software esterno certificato invece di sviluppare internamente fatturazione elettronica e DDT.
**Stato:** `da valutare`

---

## 2026-09-06 — Pianificazione giri di consegna
**Area:** Logistica
**Spunto:** Integrazione con strumenti di ottimizzazione percorsi per le consegne con mezzi propri.
**Stato:** `da valutare`

---

## 2026-09-07 — Dashboard dinamiche per ruolo
**Area:** UX / Reporting
**Spunto:** Dashboard con KPI per ruolo. Direttore produzione: porte prodotte da inizio anno, avanzamento lotti (barre semaforo in orario/ritardo). Titolare: tutto + fatturato annuo/mensile, obiettivi. Da capire quanto configurabile dall'utente vs predefinita.
**Stato:** `da valutare`

---

## 2026-09-07 — Costo industriale e formazione listino
**Area:** Produzione / Pricing
**Spunto:** Costo reale per prodotto da materie prime, manodopera, tempi/costi delle lavorazioni; ricarichi per generare il listino. Da fare dopo che preventivi/ordini/produzione/magazzino sono consolidati.
**Stato:** `da valutare`

---

## 2026-09-07 — Modulo controtelai con cassonetto (serramenti)
**Area:** Configuratore / Produzione
**Spunto:** Gestione completa come modulo dedicato. Flusso da definire (configuratore, distinta base, produzione).
**Stato:** `da valutare`

---

## 2026-10-11 — Codice cliente non modificabile
**Area:** Anagrafica clienti
**Spunto:** Una volta assegnato, il codice cliente è in sola lettura.
**Stato:** `fatto` — 11/10

---

## 2026-10-11 — Archivio modalità di pagamento in admin
**Area:** Admin / Anagrafica
**Spunto:** Archivio admin dei codici pagamento, usati nel dropdown di preventivi e ordini.
**Stato:** `fatto` — 11/10 (Admin › Prezzi › Modalità pagamento)

---

## 2026-10-11 — Modalità di pagamento sul singolo documento
**Area:** Preventivi / Ordini
**Spunto:** Modalità di pagamento impostabile sul singolo preventivo/conferma, indipendente da quella in anagrafica.
**Stato:** `fatto` — 11/10

---

## 2026-10-11 — Fido cliente con blocco produzione
**Area:** Anagrafica / Ordini / Produzione
**Spunto:** Con fido impostato, impedire la messa in produzione di ordini che lo sforano. Da decidere: blocco duro o alert con conferma admin.
**Stato:** `fatto` — 11/10: esposizione = conferme lanciate non pagate + questa, su imponibile netto; blocco, forzabile da admin; flag Pagato sulla conferma

---

## 2026-10-11 — Tracciamento provvigioni agenti
**Area:** Agenti / Commerciale
**Spunto:** Interfaccia provvigioni maturate per agente, periodo, ordine. Da decidere se su conferme d'ordine o fatture.
**Stato:** `da valutare`

---

## 2026-10-11 — Magazzino reale + due magazzini teorici
**Area:** Magazzino
**Spunto:** Tre livelli: magazzino reale (utenti abilitati) e due magazzini teorici in simbiosi, visibili solo a super admin e titolari. Logica di interazione da definire.
**Stato:** `da valutare`
