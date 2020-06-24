---
title: "Regulus"
date: "2018-12-03"
slug: "regulus"
tags: ["data-management", "project"]
---

## Regulus

__Regulus__ è un Data Warehouse finanziario che gestisce i dati finanziari relativi agli investimenti del Gruppo Generali.
Ad oggi Regulus rappresenta un sistema del Global Head Office che raccoglie e storicizza periodicamente i dati delle ”posizioni” degli strumenti finanziari (FI) che appartengono al Gruppo Generali. All’interno del Global Head Office del Gruppo Generali, i principali fruitori delle informazioni raccolte ed elaborate dalla piattaforma Regulus sono: 

•	Dipartimento Group Chief Investment Officer (GCIO): Elaborano le informazioni statistiche degli investimenti effettuati dal Gruppo Generali (e.g. durata investimenti, etc.)
•	Dipartimento Group Chief Risk Officer (GCRO): Utilizzano i dati di Regulus elaborate dal Financial Risk Engine per calcolare i requisiti di capitali richiesti dalla normativa Solvency 2.
•	Group Chief Financial Officer (GCFO): Utilizzano i dati di Regulus per integrare e/o meglio analizzare le informazioni di bilancio del Gruppo Generali. 

I dati finanziari (chiamati anche posizioni) di Regulus vengono ricavati dai sistemi transazionali utilizzati dai “traders” delle compagnie del Gruppo Generali per comprare e vendere FI

In particolare:
•	Middle Office: effettua un arricchimento anagrafico sui dati transazionali.
•	Back Office: utilizza i dati del middle office per produrre dati propedeutici che alimenteranno il sistema di accounting per la creazione del bilancio disaggregato delle rispettive compagnie del Gruppo Generali.
•	ADW: è una nuova piattaforma in fase di realizzazione che riceverà da ogni compagnia, appartenente al perimetro del Gruppo Generali, i dati contabili di investimento disaggregati. Tali dati saranno collegati con i rispettivi di Regulus beneficiando quindi della sua sua visione centralizzata in termini di dati transazionali analitici (e.g., FI pricing) e statistici (e.g., FI stressed pricing).


## Layer

- DW0: Le fonti alimentanti caricano qui i dati dei vari FI e delle Legal Entity
- DW1: Generazione di RMCODFI univoco (da migrare su MDM) e selezione degli attributi in modo che eventuali ripetizioni di FI abbiano comunque un solo valore di attributo corrispondente (p.e. descrizione)
- DW2: Calcolo del rating, anagrafiche storicizzate (posizioni*), esecuzione algoritmi finanziari (p.e. modello derivati)
- DW3: Generazione datamart (Global Position, Look Through, Financial Risk Engine e Credit Risk Engine**).

*: Le posizioni nel DW1 sono rappresentate per data di validità. Nel DW2 sono invece indicate in modo giornaliero.
**: Il calcolo del rischio di interesse (variazione del valore del FI a causa di variazioni dei tassi di interesse) e di credito (variazione del valore del FI al variare del merito di credito - spread - dell'emittente)

## Applicazioni finali:

    + CUBO
    + Controllo Qualità GP
    + Asset Liabilities Management (ALM)
    + Strategic Asset Allocation (SAA)
    + Benchmark Performance e Applicazioni Java (Fund Navigator, Index Navigator, Forex Navigator)
     


## Rating

Il Rating è la misura del rischio di credito associato ad un issuer (e.g., stato, azienda, organizzazione, etc.) o ad un FI (i.e. bond) fornito da agenzie e rilasciato sulla base di un set di caratteristiche, come per esempio la situazione finanziaria dell’issuer, area di business, posizione di mercato e altri.

Si identificano due tipologie di Rating:
•	Rating di FI (vengono associati ai bond)
•	Rating di Emittenti (i.e. issuer)

I “Rating di Emittenti” si classificano in quattro categorie:
•	Domestic Long: rating che caratterizza un emittente quando emette nella sua currency locale strumenti di lungo termine.
•	Domestic Short: rating che caratterizza un emittente quando emette nella sua currency locale strumenti di breve termine.
•	Foreign Long: rating che caratterizza un emittente quando emette nella currency, diversa dalla propria, strumenti di lungo termine.
•	Foreign Short: rating che caratterizza un emittente quando emette nella currency, diversa dalla propria, strumenti di breve termine.

Lo scopo di Regulus è di raccogliere dai Provider tutti i Rating relativi a FI ed Emittenti, e fornirli ad un modello interno che andrà ad assegnare ad ogni titolo presente in Regulus un unico valore di Rating. 
I Provider che forniscono i Rating alla piattaforma di Regulus si suddividono in tre categorie:
•	Agenzie di Rating:
o	Moody’s
o	Standard & Poor’s
o	Fitch
•	Site Junior
•	Sofia (sono forniti da uffici interni Generali)


##Note

__Site Junior__:
Le informazioni di Rating forniti dai Site Junior fanno riferimento alle country del Gruppo Generali che non caricano i dati in Sofia (sono circa 30); tali dati sono inseriti in un flusso dati che contiene le posizioni dei FI in perimetro e i relativi attributi (e.g., portafoglio, tipo di rischio, prezzo, quantità, tipo di strumento, rating, etc.) dei FI trattati.

__Sofia__:
Sofia è il sistema gestionale (sviluppato e gestito dalla società APL) mediante il quale si registrano (front office) e vengono raccolte (back office) tutte le transazioni finanziarie delle principali società europee del Gruppo Generali (i.e. Italia, Francia, Germania, Spagna, Austria e Belgio. Inizialmente il sistema forniva dati per il solo site Italia). Sofia rappresenta il principale provider di Regulus poiché fornisce le posizioni tutti di portafogli (i.e. position keeping), posseduti o gestiti fino al massimo grado di dettaglio: le movimentazioni dei singoli portafogli. I dati raccolti in back office da Sofia vengono utilizzati per elaborare il bilancio del Gruppo. 

__GIR__:
Il GIR (Group Integrating Reporting & CFO Hub) è una struttura interna al Group CFO department che fornisce a Regulus (vedi Figura 8), attraverso un flusso automatico, i seguenti dati:
•	Tabelle di Dominio
•	Tabelle di Gerarchia (i.e. hierarchy)
•	Tabella di cambio valuta (i.e. currency)


## Provider Esterni

Morningstar è il data provider utilizzato dal gruppo Generali che fornisce informazioni di dettaglio (posizioni) relative ai FI che caratterizzano i Fondi gestiti da società esterne al Gruppo.

La normativa Solvency 2 prevede l’accantonamento di un capitale (i.e. capital charge) per coprire gli investimenti diretti ed indiretti effettuati dal Gruppo Generali. Per effettuare il calcolo del capital charge è necessario calcolare la rischiosità degli investimenti.

Morningstar fornisce per i fondi di investimento indiretti, ovvero quelli gestiti da società esterne al Gruppo Generali, i dati propedeutici (i.e. posizioni) per il calcolo della rischiosità.
GIi investimenti diretti, ovvero i fondi gestiti da società interne al Gruppo Generali, non necessitano del supporto di provider esterni perchè tutti i dati richiesti da Solvency 2 vengono forniti direttamente dai Site interni.


## Modello dati DW1

Il layer DW1 (implementato con tecnologia Oracle e contenuto nello schema RMORA) rappresenta il secondo livello di data tranformation all’interno del quale vengono eseguite, sulle variabili afferenti ai FI, delle attività di:
•	Normalizzazione Funzionale, le quali le più significative sono:
o	La realizzazione dell’univocità anagrafica per Codice FI (Generazione CODFI).
o	La realizzazione dell’univocità anagrafica per Emittente (Generazione CODISSUER).
•	Normalizzazione Informatica:
o	Creazione di foreign key per consentire le relazioni tra tabelle di dominio (anagrafica) e tabelle dei fatti (e.g., eliminazione del descrittivo dell’issuer nella tabella dei prezzi).

Le tabelle che derivano da tali attività di normalizzazione costituiscono la base per i livelli DW2 e DW3 dove tali tabelle vengono de-normalizzate attraverso l’arricchimento con nuovi attributi (e.g., l’inserimento del descrittivo di issuer, che è stato funzionalmente normalizzato nel DW1, all’interno delle tabelle dei prezzi).

Il layer DW1 riceve quotidianamente i dati dalle tabelle TMP del DW0. A seconda della tipologia di tabella si fa riferimento a due modalità di caricamento dei dati: Insert-Update (i.e. Update-Default) e Delete-Insert.

### Nota Importante:
La struttura dati del DW1 e in generale di Regulus, così come la logica di gestione dei flussi, non consente una piena applicabilità della normativa Solvency II, che richiede nello specifico la riproducibilità nel tempo dei calcoli effettuati.

### RMCODFI
 Al fine di avere una visione centralizzata degli investimenti di gruppo con una visione omogenea sul rischio e sul valore è necessario identificare univocamente ogni FI. L’algoritmo che assegna il codice univoco si chiama “Generazione del CODFI” (COD sta per “Code”). 
E’ possibile riassumere l’evoluzione nel DWH dello status di codifica dei FI come segue:
•	Livello DW0: 
o	Gli oggetti del DW0 sono una fotografia dei flussi di dati che arrivano dall’esterno.
o	Ogni FI è identificato dal codice che lo rappresenta nel sistema esterno.
•	Livello DW1:
o	Nel passaggio dal livello DW0 al livello DW1 viene effettuata la generazione del CODFI.


## Financial Engine (@DW3)

Il Financial Engine (FE) è un ambiente applicativo che fornisce informazioni di rischio relativo ai FI appartenenti ai portafogli del Gruppo Generali. I FI in perimetro sono principalmente di due tipi:
•	Fixed Income (Bond)
•	Derivati

I principali fruitori di tali elaborazioni sono:
•	Group Investments Departments: richiedono quotidianamente il calcolo del rischio di esposizione (i.e. sensitivity) dei FI alle condizioni attuali di mercato.
•	Group Risk Department: richiedono periodicamente il calcolo del rischio (i.e. stressed value) dei FI considerando una serie di scenari economici fittizi diversi (i.e. stressed scenarios).

Le tipologie di rischio che vengono rispettivamente considerate sono:
•	Interest Rate Risk: Variazione del valore del FI a causa di variazioni dei tassi di interesse.
•	Credit Risk: Variazione del valore del FI al variare del merito di credito (spread) dell’emittente.

### Nota:
Il componente applicativo (così come il FRE) è un componente realizzato in C++ che beneficia di alcune funzionalità in SAS (per l'invio dei dati anagrafici sui FI) da DW2, di alcune librerie (sempre in C++, ma solo eseguibili) e di un motore (LIST). Più in dettaglio:

•	FMR4000 Libraries: costituiscono il cuore dell’architettura applicativa, sono librerie C++ che contengono le funzioni finanziarie di base utilizzate per il calcolo delle sensitivity e dei prezzi teorici di Regulus. L’ufficio IT Investments di GHO utilizza solo gli eseguibili di tali librerie e non sviluppa il codice sorgente. La manutenzione di tali librerie è in carico alla società di consulenza fornitrice “List Group SpA”.
•	Motore LIST: è uno strato middleware in C++ che gestisce in maniera ottimizzata la chiamata delle diverse funzioni presenti nelle librerie necessarie ai fini del calcolo dei prezzi teorici e delle sensitivity nei diversi scenari di mercato. La manutenzione di tale ambiente è in carico alla società di consulenza List Group SpA.
•	SAS: è uno strato software SAS per l’ETL dei dati necessari per le elaborazioni del Motore FMR/ LIST. Questi dati di input si basano sul livello DW2 di Regulus e sono principalmente informazioni su posizioni, dati di mercato e dati anagrafici. La manutenzione di tale ambiente è in carico all’ufficio IT Investments di GHO.

L'output viene utilizzato per alimentare il DW3.


## Look Through

Il Look Through (LT) si applica ai fondi comuni. Un fondo è un fondo di investimenti che raggruppa denaro, da più investitori, per acquistare FI. Il termine fondo comune si riferisce a strumenti di investimento collettivi.I fondi comuni devono rispettare la normativa UCITS3 che raccoglie un insieme di direttive dell’Unione Europea che hanno l’obiettivo di semplificare e rendere più trasparenti le regole per la vendita di fondi all’interno dell’Ue (e.g., definire dei benchmark per il pagamento di commissioni, pubblicazione quote). In particolare elenca una serie di attività nelle quali il fondo è autorizzato a investire. Una volta ottenuta l’autorizzazione i fondi possono essere offerti al pubblico in tutta la UE, previa notificazione a ciascuno stato membro in cui sono commercializzati.

In particolare, i fondi sono strumenti acquistabili come quote di società (i.e. quote del fondo di investimento) che a loro volta investono in equity, bond, derivati e altri fondi. 
Il Gruppo Generali classifica i fondi comuni come segue:
•	Fondi Interni: sono creati e gestiti da una società specializzata interna al Gruppo Generali (e.g., Generali Investment Europe). I principali vantaggi che derivano dalla gestione diretta di fondi sono:
o	Pieno controllo del fondo da parte di GIE. 
o	Disponibilità delle posizioni day by day sui sistemi di Assicurazioni Generali.
Attualmente, i fondi creati e gestiti dal Gruppo Generali (i.e. fondi comuni, SICAV) sono attualmente circa 500.

•	Fondi Esterni: sono gestiti da società esterne al Gruppo Generali, generalmente caratterizzati da FI omogenei afferenti ad una stessa categoria economica (e.g., fondo JP Morgan Automotive) o geografica (e.g., fondo JP Morgan Europe Equity). Consentono all’impresa assicuratrice di specializzare l’investimento e diversificare il rischio.

In Regulus è stato implementato l’algoritmo di Look Through che consente di risolvere le seguenti potenziali problematiche derivanti dalla gestione dei fondi:
•	Double Accounting: si verifica quando un portafoglio possiede una parte di un fondo interno e quindi si incorre nell'errore di contare due volte la stessa somma di denaro all'interno del portafoglio di Gruppo: una volta nel portafoglio dell'acquirente e l'altra nel portafoglio acquistato. L'algoritmo LT di Regulus è in grado di identificare, per ogni FI, chi è l'owner del rischio all’interno al Gruppo Generali oppure all’esterno (i.e. buyer) e la relativa quantità di denaro associata al fondo.
•	Indirect Holding: nelle strutture multi-livello dei fondi l’algoritmo di LT consente di identificare gli FI posseduti direttamente dal Gruppo Generali da quelli posseduti indirettamente, che appartengono ad un fondo sottostante a quello principale.


## Credit Risk

Il Credit Risk è un algoritmo implementato in Regulus per il calcolo del VaR (Value at Risk) di un portafoglio. Tale valore rappresenta una stima, in base alla normativa Solvency 2, del rischio di credito a cui è esposto il Gruppo Generali. In Regulus viene effettuato il calcolo del VaR per ciascuna compagnia del Gruppo (i.e. OWNER IFICC).

Il calcolo del VaR di un portafoglio non viene effettuato direttamente sui suoi FI ma indirettamente tramite il paniere di indici MSCI (Morgan Stanley Capital International). Tali indici MSCI sono panieri di FI con cui la società Morgan Stanley partiziona il mercato azionario (i.e. “global equities universe”). Essi racchiudono titoli afferenti ad uno stesso settore di mercato o area geografica e possono assumere livelli di granularità differenti (e.g., indice dei titoli “Europ automotive” contiene tutti i titoli di aziende automobilistiche europee). Gli indici MSCI vengono calcolati a partire da rispettivi basket di FI e sono rappresentativi dell’andamento di mercato di un determinato settore.


