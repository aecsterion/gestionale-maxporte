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
**Stato:** `approvato` — PRIORITÀ (18 ott): importante per la corretta configurazione di preventivi e ordini
**Decisioni (18 ott):** per ora due tipi: *in tinta* (stessa finitura della porta) e *in alluminio*; supplemento fisso per tipo; scelta obbligatoria per tutti gli scorrevoli esterno muro (anche doppia anta); "senza mantovana" solo per alcune tipologie di scorrevole esterno speciale, ancora da aggiungere al gestionale; la mantovana va sia nella scheda di produzione sia nella distinta.

---

## 2026-09-06 — Servizi accessori su preventivi/ordini
**Area:** Preventivi / Ordini
**Spunto:** Trasporto per zona geografica, imballo, posa (a scaglioni per quantità di porte, tariffe separate per blindate e relativi telai), trasferta.
**Stato:** `fatto` — imballo per riga, trasporto nei totali e tariffe trasporto per zona/mezzo (porta, blindata, accessorio, minimo) FATTI (11 ott 2026); posa (categorie di posa per apertura, tariffe a fasce per categoria × privato/impresa, blindate porta+telaio) e trasferta (giornate × posatori × tariffa) FATTE (17 ott 2026) — tariffe da compilare.

---

## 2026-09-06 — Modulo porte blindate
**Area:** Configuratore / Magazzino / Produzione
**Spunto:** Integrazione completa: arrivano finite, internamente subiscono taglio/foratura/montaggio pannelli (lavorazioni CNC).
**Stato:** `da valutare`

---

## 2026-09-06 — Calcolo automatico allargatori telaio
**Area:** Configuratore
**Spunto:** Se lo spessore muro supera la copertura del telaio, calcolo automatico degli allargatori necessari.
**Stato:** `approvato` — PRIORITÀ (18 ott): importante per la corretta configurazione di preventivi e ordini
**Decisioni (18 ott):** copertura telaio e misure/prezzi allargatori forse già nel gestionale (tabella regole_telaio: famiglia apertura + spessore da/a → spalla + accessorio cm + prezzo A/P; Admin › Telaio e componenti › Regole) — da verificare cosa manca; più allargatori combinabili; usabili su entrambi i lati; scarico da magazzino al lancio, come i coprifili.

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

---

## 2026-10-11 — Notifiche interne al gestionale
**Area:** Trasversale
**Spunto:** Campanella con notifiche per utente/ruolo: cosa c'è da fare, cosa manca, problemi, ordini pronti. Proposta: tabella notifiche + aggiornamento in tempo reale (Supabase Realtime); due tipi: eventi (es. ordine da approvare, fido forzato, giacenza negativa dopo scarico, ordine pronto) e liste "da fare" calcolate (es. approntamento vicino e commessa non pronta). In futuro anche email/push.
**Stato:** `fatto` (v1, 11 ott) — campanella in tempo reale, eventi: approvazioni, verifica tecnica, conferma inviata, fido forzato, materiale in negativo, commessa pronta. Restano promemoria calcolati ed email/push

---

## 2026-10-11 — Compatibilità dinamiche + blocco in produzione
**Area:** Configuratore / Produzione / Ufficio tecnico
**Spunto:** Non tutte le combinazioni sono configurate. Proposta: regole di compatibilità a tabella (vietato / da verificare / consentito); le combinazioni non coperte da nessuna regola = "non verificate" → l'ordine richiede approvazione tecnica; il resp. tecnico approva o vieta con "ricorda" → nasce la regola (la configurazione cresce dai casi reali). Doppio controllo: nel configuratore e al lancio in produzione (blocco se ci sono righe vietate o non verificate).
**Stato:** `fatto` — 11 ott: verifiche per valore/categoria, consentite e vietate, verifica tecnica sui documenti, blocco già su invio preventivo (scelta Simone), modalità blocco/solo avviso

---

## 2026-10-11 — Comunicazioni automatiche al cliente sull'ordine
**Area:** Conferme / Produzione / Logistica
**Spunto:** Email automatiche al cliente per: lancio in produzione, slittamento della data di consegna/approntamento, commessa pronta (approntata). Tutte dal mittente ufficio@maxporte.it (come le conferme d'ordine); commerciale@maxporte.it resta solo per i preventivi.
**Stato:** `fatto` — 11 ott: email (da ufficio@) proposte già compilate dopo lancio, commessa pronta e cambio settimana di approntamento

---

## 2026-07-12 (ripreso 18 ott) — Ottimizzazione ordine posizioni per la produzione
**Area:** Produzione / Scheda di produzione
**Spunto:** Prima del lancio, riordinare le posizioni della commessa per ridurre i cambi di setup e la confusione in reparto. Criteri definiti con Simone (luglio): 1) tipologia apertura (tutte le BAT insieme, poi CS, SI, SE…); 2) larghezza crescente; 3) altezza crescente; 4) spessore telaio crescente. Criteri aggiuntivi approvati in linea di principio: finitura (colori uguali consecutivi, utile per le laccate), modello, serratura.
**Decisioni (luglio):** pulsante "Ottimizza per produzione" (non automatico): il documento commerciale tiene la numerazione voluta dal cliente (001, 002…), la scheda di produzione mostra le righe riordinate con la posizione cliente sempre visibile ("Pos. cliente 003"). Evidenziare nella scheda tutto ciò che è fuori standard: misure fuori standard (giallo), colori speciali RAL/NCS/Pantone (arancio), tipologie particolari FM/COM/Varsavia (rosso chiaro), accessori obbligatori come staffe e pinna (badge).
**Deciso (19 ott):** l'ordine ottimizzato si calcola una volta al lancio e si salva su ogni riga (sequenza di produzione); vale per tutto ciò che è interno (scheda, terminali, packing list, ordine delle etichette). La posizione cliente resta sempre visibile e resta il riferimento su etichette collo e documenti al cliente. Ricalcolabile con il pulsante finché la produzione non è iniziata.
**Stato:** `fatto` (v1, 19 ott) — proposta confermata da Simone; sequenza salvata in righe_ordine.seq_produzione al lancio, pulsante "Ottimizza per produzione" sulla conferma in produzione, scheda di produzione in sequenza con Pos = posizione cliente. RESTANO: evidenziazioni fuori standard nella scheda; uso della sequenza in terminali ed etichette quando li costruiamo.
