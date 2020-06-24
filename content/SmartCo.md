---
title: "SmartCo"
date: "2020-03-20"
slug: "smartco"
tags: ["tech", "project"]
---

## Credenziali di accesso al client
__Username__: giordan7
__Password__: Sgronky@678

## SharePoint (Documentazione e altri file di gestione del progetto)
[SharePoint](http://sp2013.teamwork.generali.com/sites/ITProcurementWorkspace/SmartCo/Documents/Forms/AllItems.aspx)  

## NAS
[DataHub](file:\\\\corp.generali.net\FSNASCIFS\NAS_SMARTCO_HIPERF\DataHub)  
[Change](file:\\\\corp.generali.net\FSNASCIFS\NAS_SMARTCO_HIPERF\Change)  

## Application Servers
| URL | Name | Env | Scope |
|--|--|--|--|
| D3MS2ASN001.corp.generali.net | SmartCo DataHub App Server | DEV | BUILD |
| D3MS2ASN002.corp.generali.net | SmartCo DataHub App Server | DEV | BUILD  (qua gira SBR e VisualStudio) |
| D3MS2ASL001.corp.generali.net | SmartCo DataHub App Server | QA | BUILD |
| D3MS2ASC001.corp.generali.net | SmartCo DataHub App Server | CERT | BUILD |
| D3MS2ASC002.corp.generali.net | SmartCo DataHub App Server | CERT | BUILD |
| D3MS2ASC003.corp.generali.net | SmartCo DataHub App Server | CERT | BUILD |
| D3MS2ASP001.corp.generali.net | SmartCo DataHub App Server | PROD | RUN |
| D3MS2ASP002.corp.generali.net | SmartCo DataHub App Server | PROD | RUN |
| D3MS2ASP003.corp.generali.net | SmartCo DataHub App Server | PROD | RUN |
| D3MS2ASY001.corp.generali.net | SmartCo DataHub App Server | DR | RUN |
| D3MS2ASY002.corp.generali.net | SmartCo DataHub App Server | DR | RUN |
| D3MS2ASY003.corp.generali.net | SmartCo DataHub App Server | DR | RUN |

## DataHub File Systems
- PROD  
[DataHub](file:\\\\MS2-PROD\DataHub)  

- PREPROD  
[DataHub-CERT](file:\\\\MS2-PREPROD\DataHub-CERT)  
[DataHub-DEV](file:\\\\MS2-PREPROD\DataHub-DEV)  
[DataHub-QA](file:\\\\MS2-PREPROD\DataHub-QA)  

## File Systems Server
- PROD
    - D3MS2FSP001 
    - D3MS2FSP002
- DR
    - D3MS2FSY001 
    - D3MS2FSN002

- PRE-PROD
    - D3MS2FSN001


## SQL Server
__Listener__: LSQLITPP1:5025  

- PROD  
__Server__: D3MS2SQLP001.corp.generali.net  
__Instance__: D3MS2SQLP001\SQLITPP1  
__Database__: smart  

- DR  
__Server__: D3MS2SQLY001.corp.generali.net  
__Instance__: D3MS2SQLY001\SQLITPP1   
__Database__: smart  

- CERT  
__Server__:  D3MS2SQLC001.corp.generali.net   
__Instance__: D3MS2SQLC001\SQLITPC1  
__Database__: smart  

- DEV  
__Server__:  D3MS2SQLN001.corp.generali.net   
__Instance__: D3MS2SQLN001\SQLITPS1   
__Database__: smart  

- QA  
__Server__: D3MS2SQLL001.corp.generali.net   
__Instance__: D3MS2SQLL001\SQLITPL1   
__Database__: smart  

-------------

## Functional Information
## Asset Classes
- Bonds  
- Equities  
- Commodities  
- Credit Derivatives  
- Currencies & exchange rates  
- Curves and spread  
- Futures  
- Forex  
- Forwards  
- Indexes  
- Money notes  
- Mutual funds  
- Options & warrants  
- Repos  
- Securitization products and related SPV  
- Structured product  
- Swaps  
- Volatility surfaces  

## Identifiers
- ISIN, 
- SEDOL, 
- CUSIP, 
- TICKER, 
- RIC, 
- internal codifications, 
- custom codifications

## Business Entities
- Issuers  
- Counterparts  
- Intermediaries  
- Custodians 

For retail or private banking main needs, the entities where the most critical information is managed, are:

- End customers  
- Guarantors  
- Vendors  

## Ciclo di vita dei titoli
Partendo da una situazione in cui tutto il db è inattivo, durante la giornata verranno passati ad active tutti i titoli che sono coinvolti nei processi giornalieri di SmartCo (richiesti tramite i ptf file o tramite i position file o aggiornati dai provider dei prezzi ecce cc).
Quindi, a fine giornata, i titoli attivi corrispondono esattamente ai titoli che sono entrati nell’operatività giornaliera di SmartCo.

Il perimetro viene giornalmente resettato ogni sera con il processo dell’update security status.

Nel momento in cui si è iniziata l’attività Solvency II/MDM, a questa logica generale si è fatta un’eccezione per quanto riguarda il perimetro dei titoli facenti parte della reportistica Solvency e per i quali non riceviamo un perimetro completo giornalmente.

Il perimetro Solvency, infatti, si compone di varie parti che in modo molto semplificato sono:

1.  Titoli attivi presenti nel file delle posizioni di Sofia o Simcorp e il cui feed è aggiornato giornalmente.
2.  Titoli scaduti, inattivi o non più in posizione che, però, per ragioni di reportistica sono da considerarsi in perimetro per tutto l’anno in corso. 
Questi titoli non vengono, in buona parte, più inviati a SmartCo nei flussi giornalieri ma vanno considerati come se lo fossero.
3.  Titoli richiesti dai paesi nel refresh annuale o durante il corso dell’anno perché oresenti nei loro portafolgi. Ai paesi è stato chiesto di fare un refresh o un inserimento iniziale ma non è previsto in nessun modo che ci inviino un elenco giornaliero di titoli.
Come nel caso precedente, però, i titoli vanno considerati come se fossero giornalmente trattati dal sistema.

La Regola è, quindi, diventata così:

Tutto il perimetro dei titoli “Active” viene reso “Inactive” ogni sera (a prescindere dal o dai consumer che lo hanno reso active nella giornata) fatta eccezione per tutti i titoli ricompresi nel perimetro Solvency il cui status è “resettato” una volta l’anno al momento del refresh del perimetro.

Il perimetro di Solvency è stato, inizialmente, individuato in tutti quei titoli che hanno il feed MDM Country oppure Sofia Data ad una data maggiore od uguale a quella di refresh che indichiamo come parametro nello Scheduled Task.

Altre nozioni spicciole su alcune logiche di business in SmartCo che possono aiutarti a capire meglio alcuni aspetti di questa gestione:

- I FEED corrispondono generalmente ad un provider o ad un processo e vengono utilizzati principalmente per identificare i perimetri per i processi di export. La data di refresh corrisponde all’ultima volta che quello specifico processo o provider ha interagito (anche solo per l’identificazione) con quel titolo.  
- Il modo più corretto per identificare il perimetro “attivo” di un FEED o consumer è quello di prendere tutti i titoli che presentano quel feed alla data di aggiornamento che non è necessariamente T-1 per tutti i feed.

---

## Second Best Ratings - Analisi tecnica
- Si potrebbe adottare una logica funzionale. Per esempio l'export di un file in formato PARQUET potrebbe essere utilizzato per avviare il calcolo. In questo modo non ci sarebbe dipendenza dall'attuale base dati di Smartco e non ci sarebbe accoppiamento con il database. 
- Nel documento di analisi tecnica non si fa alcun riferimento ai deliverable (codice sorgente, soluzione, ecc...), ai test, alla build o alla documentazione a completamento dell'attività -> eventualmente è indicato altrove, da capire
- Nel documento non c'è alcun paragrafo che faccia riferimento al disegno di dettaglio della soluzione (attivazione del processo di esecuzione dell'algoritmo, single / multi-process, multi-threading, ecc...). In particolare non sono indicati particolari requisiti di qualità, ecc... Eventualmete è scritto altrove, ma mi aspetterei qualcosa in termini di soluzione in questo documento

## Maintenance numbers
NDH currently executes an average of 260 Jobs per day, 500 active rules, 380 data quality rules, 31 connection SFTP, 155.000 Financial Instruments, 70.000 Legal Entities, 47 back office business users for average of 5 ML transactions per day on SQL.

__Maintenance Elements__  
| Item | # |
|--|--|
| Data dictionary | 84 |
| Scheduled tasks | 2179 |
| Rules | 923 |
| Feed procs | 649 |
| Input Feed Map | 383 |
| Output Feed Map | 268 |
| Active DQC Rules | 214 |
| Post Process Control | 156 |
| List (domains) | 61 |
| Parameters | 373 |
| Windows | 946 |
| Stored Procedures | 78 |

## Datalicense Server
Per accedere a datalicence server:

- __address__: 160.43.94.24  
- __login__: dl246529  
- __password__: 6D4iQZy=w2WcvKcA  

I server puntano al IP virtuale:
- __Nodo 1__ : 160.43.94.24  
- __Nodo 2__: 160.43.166.58  
- __Virtuale__ : 160.43.94.77  

Accesso solo da alcuni IP autorizzati.

