---
title: "GIA&WM Financial Reporting"
date: "2019-09-01"
slug: "financial-reporting"
tags: ["cloud", "project"]
---

## Feedback agli utenti
Gli utenti caricano i file all'interno di directory dedicate. Il trasferimento dovrebbe quindi procedere in automatico. Dovremmo tuttavia prevedere l'invio di una mail all'utente in caso di errore di processamento del file o indicazione al contrario che il caricamento sia avvenuto correttamente. Lo si potrebbe fare via SES.

## Feedback vs Incidents
Il processo di gestione degli incident dovrebbe per quanto possibile essere gestito in modo affidabile. Gestirlo quindi con lo stesso flusso di lavoro che desidereremmo impiegare per i feedback non è probabilmente la scelta migliore. Si potrebbe invece associarla direttamente a delle soglie applicate su metriche custom su CW. Tali metriche infatti andrebbero comunque calcolate per consentire di avere una console di monitoraggio del funzionamento del sistema. In più, fissando delle soglie definite per ciascuna metrica, potremmo anche agganciare l'allarme direttamente al topic che inserisce l'allarme su SN.

## Finestra di caricamento
L'utente amministratore dovrebbe avere una qualche modalità per gestire una finestra di caricamento o al contrario, chiudere la finestra di caricamento quando desiderato per impedire di processare nuovi file. In termini tecnici, si potrebbe mettere in piedi una lambda e una tabella Dynamo DB per la gestione della finestra. La lambda potrebbe essere attivata tramite pagina web dedicata oppure tramite mail con approvazione / rifiuto. La finestra dovrebbe essere strutturata in modo granulare su:
- Legal Entity
- Data type
- Period

## Sostituzione delle directory di appoggio con una tabella DynamoDB
Per semplificare la gestione e rendere più performante e più parlante lo stato di processamento della pipeline (p.e. con indicazione granulare degli errori ricevuti), potremmo sostituire i vari bucket previsti (elab, rejected e done) con una tabella dynamoDb.

---

## Metriche
Alcune metriche che potremmo valutare:

- __Freschezza del dato__. Ciascun dato potrebbe avere un metadato associato alla sua naturale scadenza (p.e. 1gg o 1mese). In questo modo potrei tracciare il numero di file scaduti per origine (legal entity).  
- __Campi fuori range__. Indicare un valore minimo - massimo di riferimento al discostarsi del quale dovrebbero essere sollevati dei warning a chi effettua il controllo.
- __Tempo di elaborazione della pipeline__.  
- __Campi mancanti__ (nulli).  
- __Campi chiave senza descrizione__.  
- __Numero di errori in fase di elaborazione__. Serve a tracciare la bonta' dell'algoritmo di elaborazione.
- __Correttezza e Copertura__. Un indice complessivo sul valore di qualità del dato rispetto a tutti i controlli realizzati e sulla copertura dei dati.
- __Accessi__. Indicazioni complessive sul numero di accessi ai dati, quantita' di dati recuperati, ecc... (query Athena)
- __Latenza__. Percentuale di richieste soddisfatte superiori ad una certa soglia accettabile (query su Athena).

## Metriche, SLI e SLO
Di seguito una bozza di SLI e SLO da verificare.

| Categoria | SLI | SLO |
| --- | --- | --- |
| Disponibilità | Proporzione di esecuzioni "efficaci" di query sulla vista oggetto del report misurate da Athena rispetto al totale eseguito. <br/><br/>_`Efficace` è definito come senza errori_ | >=97% |
| Freschezza | Proporzione di record aggiornati correttamente rispetto al totale di record disponibili recentemente per il caricamento. <br/><br/>_`Recentemente` è definito come entro 7 minuti_  | > 90% | 
| Latenza | Proporzione di richieste su Athena risolte con sufficiente rapidità. <br/><br/>_`Sufficiente Rapidità` è definito come inferiore a 20 secondi_. | > 90% |
| Correttezza | Proporzione di esecuzione di pipeline che si concludono correttamente rispetto al totale. <br/><br/>_`Correttamente` è definito come senza errori di sistema (al netto cioè dell'accuratezza verificata all'origine)_ | > 98% |

__Metriche conseguenti (tecniche)__:  
- Numero di query eseguite su Athena  
- Numero di errori di esecuzione di query su Athena  
- Numero di record complessivi in input in stato da processare e data di inserimento  
- Numero di record complessivi in input in stato processati e data di completamento  
- Tempo di esecuzione di query della vista misurate su Athena  
- Numero di esecuzioni di pipeline  
- Numero di esecuzioni di pipeline con errori  

Alcune __metriche di business__ da tracciare:  
- Numero di record totali  
- Numero di file totali  
- Numero di record in stato "scaduto"  
- Numero di file in stato "scaduto"  
- Numero di campi verificati in termini di data quality   
- Numero di campi nulli  
- Numero di campi fuori da range assegnati  
- Numero totale di query eseguite  
- Numero totale di dati restituiti  
- Numero totale di file depositati per LE  

## Dashboard di monitoraggio
Oltre che presentare delle metriche tecniche, la dashboard dovrebbe consentire per quanto possibile di avere una vista in realtime del funzionamento dei processi. CW offre una serie di metriche relative alle state machine e alle singole activity all'interno. Dovrebbe quindi essere facilmente possibile introdurre tali valori all'interno di una dashboard di monitoraggio

## Test di integrazione
[https://towardsdatascience.com/a-deep-dive-into-data-quality-c1d1ee576046](https://towardsdatascience.com/a-deep-dive-into-data-quality-c1d1ee576046)

## Stati della pipeline
Proposta degli stati della pipeline con relativa descrizione:

| Stato | Descrizione |
| --- | --- | 
| `Init` | I file sono stati caricati su S3. L'evento è stato generato e preso in carico da `CWEH` che persiste una nuova riga per il nuovo file |
| `Activating` | Al termine del successivo timeout impostato su Cloud Watch, il `CWEH` viene invocato nuovamente con indicazione di attivare il processamento (di test o di produzione). A seguito dell'invocazione, `CWEH` aggiorna lo stato e invoca la lambda di attivazione |
| `Preparing` | La lambda di attivazione prende in carico il nuovo evento, invoca la step function e salva l'`executionid` relativo. Il primo processo glue python viene quindi attivato per la preparazione dei file |
| `Processing` | I file sono pronti per il caricamento su datalake. La step function attiva il successivo processo glue spark che esegue il caricamento su datalake | 
| `Updating` | I dati contenuti nei file sono tutti disponibili nel datalake sulla relativa partizione. Il `crawler` attiva l'aggiornamento del catalogo |
| `Aggregating` | I dati calcolati vengono prodotti e aggiunti al datalake |  
| `Done` | I nuovi dati sono disponibili per essere interrogati |
| `Error` | Si è verificato un errore nel processamento dei dati che ha impedito il corretto completamento della pipeline |
| `Rejected` | Il file non ha superato tutti i controlli di qualità ed è stato rigettato |

---

## Metadata Catalog e Data Dictionary
Una soluzione semplice e compatibile con i tempi di realizzazione del progetto potrebbe essere quella di manutenere un file csv che rappresenti un data dictionary del modello dati utilizzato all'interno del datalake. Questa risorsa potrebbe essere manutenuta a livello di codice sorgente direttamente nel progetto terraform relativo alla configurazione dello storage e quindi versionato e modificato in termini di CR, seguendo cioè lo stesso ciclo di vita di tutte le altre risorse. Il file potrebbe essere strutturato in modo da avere le seguenti informazioni:

- Object Name (Nome della tabella o del campo o del file, ecc...)
- Object Description (Descrizione dell'oggetto)
- Object Type (Tipologia dell'oggetto: Tabella, Vista, Campo, File, ...)
- Container Object (Oggetto contenitore. P.e. nome della tabella)
- Data Owner (Nome della persona, legal entity, ufficio, ecc... responsabile della correttezza del dato)
- Data Owner Contact (p.e. mail, etc...)
- Accuracy Checks (True / False, a seconda che il campo sia soggetto o meno a controlli di accuratezza, ...)
- Data Quality Checks (True / False, a seconda che il campo subisca altri controlli di data quality)
- Source (Nome del file o della sorgente dati che ha prodotto questo dato)
- Generated-by (Serve a dare indicazioni relative alla modalità con cui viene generato un file: a mano, SAP, ...)
- Not Null (True / False, a seconda che il campo accetti o meno valori nulli)
- Range (Max / Min, ecc...)
- Expiration (Intervallo di tempo entro il quale il campo si ritiene valido)

---

## Gestione della sicurezza a livello Repoting
La gestione dell'accesso da parte dei differenti utenti ai report, potrebbe essere implementata in modo disaccoppiato dalla Cloud Data Platform. Quest'ultima riserverebbe un accesso unicamente per l'amministratore business con accesso complessivo ai dati.

Lato Power BI invece, avremmo un utente amministratore (in capo all'IT) che sarebbe di fatto il responsabile della gestione della pubblicazione dei report e della gestione degli utenti (accesso al workspace). Il report predisporre dei ruoli con differenti filtri pre-impostati. I ruoli verrebbero associati agli utenti in modo che ciascuno possa vedere all'interno del report condiviso solo quanto di competenza. Non ci sarebbe condivisione del dataset. Inoltre potremmo predisporci per pubblicare anche l'APP in modo che sia possibile condividere con i vari stakeholder, il link al report anche in modalità lettura. In tutti i casi, gli utenti delle LE dovrebbero avere solo un accesso in lettura ai report, senza possibilità di modificare il report stesso.

## Da sistemare per la produzione
- Issue aperte per l'UAT
- Keycloak e valutare utilizzo esclusivo di Cognito su pool dedicato
- Possibilità di gestione delle utenze su Cognito
- Ambiente di Produzione
- Ruoli con granularità migliore
- Incident su Service Now (gruppo assegnato)
- Warm pool su Glue
- Account dedicati e landing zone

## Gestione di log applicativi
I log applicativi dovrebbero essere strutturati in modo da avere una serie di campi fissi, in grado di trasportare l'informazione di base (livello, timestamp, componente, execution_id, ecc...) e una serie di campi opzionali di volta in volta valorizzati a seconda dell'informazione (p.e. coppie nome - valore, descrizione del messaggio, ecc...). I log dovrebbero quindi essere aggregati a livello di log group e inviati a CloudWatch tramite API. In questo senso, potrebbe essere di valore costruire una libreria di logging in grado di astrarre i dettagli tecnici. L'utilizzo dei log dovrebbe essere quello di:

- Consentire l'invio di notifiche e allarmi
- Raccolta metriche (le coppie nome valore di ciascuna riga di log costituirebbero un singolo data-point di una metrica)
- Monitoraggio centralizzato dell'intera datapipeline

## Recupero degli owner contact
Le informazioni dinamiche da associare al singolo processamento di file (il contatto cui inviare le notifiche e da tracciare a fini di controllo e i componenti del gruppo da notificare) potrebbero essere raccolte a livello di Cognito come campi aggiuntivi da inserire in fase di aggiunta dell'utenza. Il CloudWatchEventHandler avrebbe quindi l'onere di recuperare queste informazioni ed associarle al file da tracciare su DynamoDB, in modo che le stesse informazioni siano a seguire disponibili per l'invio di notifiche e per tracciatura sulla console di monitoraggio lato business.

## Governance su PowerBI
Processo di governance:
- Accesso diretto via ODBC per il team di data validation
- Processo di pubblicazione del nuovo dataset gestito dall'IT
- Footprint di ogni data pipeline eseguita correttamente (p.e. tramite versione crescente)
- Versioning dei template PowerBI
- Pubblicazione delle sole App su Workspace gestito dall'IT

Per poter garantire la pubblicazione della versione certificata (e non quella risultante da ulteriori caricamenti e quindi non validata), un'idea potrebbe essere quella di versionare i record su datalake su base datapipeline correttamente eseguite:
Ogni pipeline correttamente eseguita dovrebbe cioè essere marcata con un numero di versione crescente. In questo modo, la vista potrebbe restituire tutti e soli i dati che facciano riferimento ad un numero massimo di versione (in modo appunto da evitare il recupero di dati per i quali la certificazione non sia arrivata)

Una possibilità potrebbe essere quella di creare "copie" del dataset ad ogni esecuzione della pipeline (p.e. per le tabelle dei fatti) e far governare ad un parametro (da capire se sia possibile inserirlo come parametro statico direttamente a livello di Glue Metadata Catalog) il recupero dei dati via Athena. In questo modo, ad ogni esecuzione della pipeline, in automatico, il parametro verrebbe aggiornato con l'identificativo (progressivo) dell'ultima pipeline correttamente eseguita. In fase di pubblicazione, l'operatore potrebbe modificare il valore del parametro ad una versione precedente, per consentire di pubblicare il dataset validato dall'utente. Il processo potrebbe essere automatizzato via script o in altro modo (p.e. lambda). Occorre valutare come bloccare in fase di pubblicazione il processamento di nuove pipeline (p.e. attraverso l'inserimento di un parametro aggiuntivo che funzioni da semaforo). Le viste andrebbero aggiornate conseguentemente per tenere conto della versione del dataset, ma dovrebbero sempificarsi notevolmente in quanto tutta la logica di "accorpamento" per timestamp attuale verrebbe meno.

## Status Update
- Test di UAT
- Passaggio in produzione
- Acquisto delle licenze
- Definizione dei gruppi Service Now
- Project Closure Meeting
- Aspetti di Governance e Sicurezza Power BI
- Documento di Operations
- Team di Operations
- Restyling dei report

---

## Ristrutturazione data lake
- __raw data__: Dovremmo ristrutturare il bucket di riferimento per consentire di accedere rapidamente alle informazioni rilevanti. In questo ambito avevamo fatto la scelta di utilizzare dei `.csv` e credo possa essere confermata per via delle dimensioni contenute dei file depositati. A livello di partizionamento, opterei però per una strutturazione migliore (punto successivo). I dati _raw_ dovrebbero essere considerati immutabili ma interrogabili all'occorrenza. In questo senso, benché non necessario da un punto di vista di performance, potrebbe valere la pena comunque utilizzare un formato più interrogabile, come `.parquet`, ma consideriamolo come opzionale.
- I dati raw devono poter essere utilizzati anche per ricostruire i layer successivi di esposizione. Per cui la loro struttura deve consentire di creare delle _snapshot_ all'occorrenza.
- In termini di struttura, dovremmo procedere dalla categoria più vasta verso quella meno vasta, indicando esplicitamente anche l'ambito applicativo di utilizzo dei dati, per consentire di includere anche Riverlands o eventuali ulteriori fonti. P.e.: 

    ```
    (source type) => (year) => (data type) => (period) => (legal entity) => (date time) => (file.csv)
    ```

- Esulano dalla struttura di cui sopra, i file statici che possono essere aggiornati in altro modo (p.e. _rates_). In questi casi, la struttura potrebbe essere semplificata in:

    ```
    (source type) => (year) => (data type) => (date time) => (file.csv / file.json)
    ```

- A partire dai dati _raw_ dovrebbe essere possibile costruire più layer di esposizione a seconda delle modalità di utilizzo e in funzione delle query che l'utilizzatore ne farebbe. In alcune circostanze, questi layer potrebbero non avere nemmeno necessità dello storico ma presentare unicamente lo snapshot corrente.
- Una volta depositati nell'area di __staging__, che corrisponde ad una sorta di _drop zone_ per l'utente, il tempo di attesa per la ricezione di una notifica da parte del sistema dovrebbe essere rapida (dell'ordine del minuto). Gli stati da monitorare per l'invio delle notifiche sono dunque unicamente `rejected` e `processing`. Sia che il caricamento avvenga correttamente, sia che vi siano degli errori. Qualora poi i dati vengano presi in consegna, non dovrebbero più esserci notifiche all'utente finale (è compito di chi manutiene il sistema, se i dati sono validi, assicurarsi che vengano correttamente esposti nel layer curato). 
- Guardando quindi l'attuale __data lake__, come __layer di esposizione per un utilizzo specifico__, dovremmo rivedere la struttura con la stessa logica del layer di _raw_. In particolare, occorre indicare certamente anche lì la finalità di utilizzo (p.e.: GIAWM FR). Ma più di ogni altra cosa, dovremmo uscire da una logica relazionale e spostarci verso qualcosa di quanto più possibile de-normalizzato (evitando cioè le logiche di join attualmente in essere). Questo dovrebbe permettere di guadagnare in performance (e la creazione di viste dedicate). In termini di struttura, potremmo p.e. riorganizzare nel modo seguente:

    ```
    GIAWM_FR => (data_type) => (year) => (date time) => (data_type_item) => (file.parquet)
    ```

- In questo senso, il nuovo modello dati passarebbe alla logica di _bucketing_ la distinzione in termini di data type (p.e.: `AUM`), mentre sfrutterebbe il _partioning_ per distinguere gli anni, i datatime, e i vari elementi `data_type_item` (p.e.: fatti, legal entity, calendario, ecc...). A partire dal `data_type`, la struttura dati e lo schema resterebbe lo stesso. Sfrutteremmo cioè campi nulli per presentare gli elenchi aggiungendo inoltre le colonne relative alle dimensioni per denormalizzare i dati. L'elemento `data_type_item` potrebbe essere anche "annegato" all'interno dello stesso file, utilizzando un campo di filtro per individuarli rapidamente.

- Per semplificare l'accesso ai dati correnti (99% dei casi, di fatto), potremmo valutare di utilizzare una __snapshot corrente__ evitando completamente la struttura storicizzata, o limitandone l'utilizzo ai soli casi rari in cui occorra un revert. Oppure lasciare le snapshot e consegnare alle query la necessità di selezionare l'ultima disponibile.

- La pipeline potrebbe essere ristrutturata per gestire in modo separato le logiche di aggiornamento incrementali dovute al deposito di nuovi file, dalla logica batch di predisposizione delle snapshot per il reporting. L'attuale `glue job python`, potrebbe essere sostituito da un lambda. La `step function` potrebbe quindi contenere, in prima battuta almeno, solo il job spark (da capire se sia necessario mantenerlo in formato spark o meno), che avrebbe il compito di creare un nuova snapshot. L'attivazione della snapshot potrebbe però essere operata attraverso l'attuale scheduling `CloudWatch` (ogni 5 minuti). Oppure si potrebbe utilizzare una coda SQS, scodata da una lambda schedulata ogni pochi minuti. L'attuale temporizzazione dei file depositati non avrebbe più ragione di essere e potrebbe essere ridotta fortemente, scendendo quindi considerevolmente sui tempi di attesa della pipeline di preparazione. 

---

## Predisposizione per il passaggio in produzione
x Configurare gli utenti indicati da Simonetta sul pool SFTP impostando le directory corrette
- Per ciacun utente, inviare Username e Password per l'accesso
x Predisporre delle note in Word per la configurazione del client SFTP da mostrare in una fase di training
- Aggiornare i file PowerBI e l'app
- Assegnare gli utenti alle legal entity corrette sull'app PowerBI
- Aggiornare le credenziali degli utenti che accedono via ODBC
- Aggiornare le dashboard di Simonetta
- Mandare formalmente a Simonetta l'OK ad eseguire i test

Di seguito gli utenti previsti per la partecipazione ai test UAT (mail di Simonetta Di Loreto del 12/5):

- __GIH__: Agathe Brohard
- __GIAM__: Lomurno
- __GRE__: Kosuta Gregor
- __Boutiques__: Emilio Carovilla


---

## Event-Driven Architecture con EventBridge
L'utilizzo di EventBridge in maniera estensiva con uno schema dedicato potrebbe permettere di costruire un'__architettura orientata ai microservizi__ invece che un'architettura classica con una pipeline che viene eseguita in batch (stile ETL). In questo senso, i microservizi avrebbero un accoppiamento molto lasco ma ben definito in termini di interfacce dagli eventi definiti nello __Schema Registry__. Ogni microservizio definirebbe un __bounded context__all'interno del quale eventuali risorse aggiuntive e/o servizi allocati verrebbero gestiti in modo unitario. Risorse shared non sarebbero invece consentite (p.e. `DynamoDB`) e andrebbero trattate come microservizio a parte.

In una prima fase tuttavia, potremmo definire in produzione un bounded context associato ad un event bus in grado di ospitare e far transitare eventi custom. Al contesto assoceremmo uno schema nello schema registry, in grado di tenere traccia delle versioni del sistema. All'interno dello schema, sarebbero definiti:

- __Eventi custom__, per consentire ai vari componenti e servizi coinvolti di reagire ai _comandi_ (ved. dopo) impartiti;
- __Eventi di sistema (statici)__, per consentire di reagire ad eventuali condizioni di errore di sistema recuperati dai servizi AWS;
- __Eventi di sistema (dinamici)__, per consentire l'innesco delle catene dall'esterno.

Gli ultimi in particolare, rappresenterebbero gli eventi - comandi in grado di attivare le catene. Anche la componente web - analizzata a seguire - avrebbe come punto di accesso gli stessi eventi di ingresso (ovvero staging su S3). Gli eventi di sistema sarebbero ospitati in realtà all'interno del default event-bus e verrebbero tradotti nel formato assegnato agli eventi custom con una _input transformation_ prima di essere inoltrati ai componenti (code SQS) in grado di memorizzarli.

I componenti architetturali saranno i seguenti:

- Store and validation per GIA&WM FR
- Store and validation per Riverlands
- Batch per GIA&WM FR
- Batch per Riverlands
- Batch per l'aggiornamento della snapshot su DDB per Web application
- Web application
- Store and validation per SAP
- Batch per SAP
- Notification handler
- Error Handler

Gli eventi sul _custom event-bus_ avranno `rule` e `target` assegnati.

> Il pattern architetturale seguito sarebbe in definitiva un __Event Sourcing__ + __Command Query Responsibility Segregation__ (__CQRS__) (ved. p.e.: [https://martinfowler.com/bliki/CQRS.html](https://martinfowler.com/bliki/CQRS.html)). Un altro articoli interessante è questo:
> 
> [https://itnext.io/1-year-of-event-sourcing-and-cqrs-fb9033ccd1c6](https://itnext.io/1-year-of-event-sourcing-and-cqrs-fb9033ccd1c6)

I `comandi` supportati saranno quelli definiti dalla web application (ved. oltre) e il deposito di nuovi file su S3 (eventi - comandi). L'__event-store__ è invece distribuito sulle varie code a livello di ciascun __bounded context__ di componente. I componenti architetturali verrebbero debolmente accoppiati tramite eventi e le interfacce stabilite in modo trasparente attraverso gli schema. 

Per supportare il __Blue/Green deployment__ - che avremmo unicamente in produzione - definiremmo due `eventbus` distinti. Il contenuto dell'evento e la relativa tipologia sarebbero chiaramente variabili, ma potremmo definire alcuni campi in grado di indirizzare le Rule. P.e.: 

- `pipeline`: `prod1` o `prod2`
- `scope`: `test` o `prod`

Tutte le risorse potrebbero quindi essere taggate con l'indicazione della pipeline di riferimento, al di là ed in aggiunta all'eventuale post-fisso che avrebbero. 

Gli eventi di sistema andrebbero tradotti e mappati in relativi ambienti custom. In questo modo saremmo in grado di gestire in modo uniforme sempre le stesse tipologie di eventi e potremmo inoltre diversificare le sorgenti degli eventi anche tra _live_ e _non live_. Questo varrebbe chiaramente anche per tutti gli eventi da agganciare ad S3, che avvisano cioè della scrittura su un certo bucket. 

Ogni __deploy__ corrisponderebbe infine ad un aggiornamento di `version` dello schema corrispondente. In questo modo, il sistema sarebbe in grado dichiarativamente di indicare il proprio stato per ciascuna delle due catena (Blue e Green) e il versioning potrebbe essere utilizzato anche per eseguire il deploy.

Lo __switch__ avverrebbe nel modo seguente:

1. Identificazione dello schema corrispondente alla catena non produttiva (p.e. numero di versione inferiore).
2. Aggiornamento tramite terraform della versione.
3. Modifica del target nella rule del default eventbus per consentire l'instradamento degli eventi di test verso questa catena modificata.
4. Esecuzione dei test di integrazione.
5. Approvazione della release (step approvativo).
6. Modifica del target nella rule del default eventbus per consentire l'instradamento degli eventi di produzione verso questa catena modificata.

> Gli accessi ai bucket di test e prod in produzione sarebbero consentiti in ogni istante ad entrambe le catene. Per questo è necessario attivare degli alert a posteriori nel caso in cui si verificassero delle violazioni (p.e. accesso da parte della catena non live al bucket di produzione).
> 
> 
### Branching model e continuous deploy
Avremmo due soli progetti:

- `application`
- `infrastructure`

Il primo conterrebbe tutto il codice applicativo, suddiviso per sotto-progetti e verrebbe assegnato al team di sviluppo. Il secondo conterrebbe tutto il codice infrastrutturale (inclusi gli script di deploy) e verrebbe gestito dal team SRE. Il team di sviluppo può richiedere delle modifiche al codice infrastrutturale tramite _merge request_ sul solo branch di develop, scatenando la conseguente release in qualification (ved. oltre).

Per il progetto di application (ma anche su quello di infrastruttura), avremmo due soli branch a livello di codice:

- `master`
- `develop`

Con il branch di master che rappresenta la produzione. Ad ogni nuovo change, il branch di develop diverge accumulando le modifiche. Ogni commit sul branch di develop innesca un rilascio in qualification tramite merge sul branch di develop del progetto infrastrutturale (aggiornamento delle dipendenze) e conseguente esecuzione dei test automatici. A release completata, viene eseguito un merge su master (application) che è associata ad una merge request sul branch di master del progetto infrastrutturale. Se approvata dal team SRE, viene eseguito il rilascio in produzione sulla catena non live e i test vengono ripetuti anche in produzione. 

> La doppia esecuzione dei test potrebbe essere omessa. Potremmo cioè eseguire direttamente per una merge in master il rilascio in produzione e l'esecuzione dei test automatici in produzione.
> 

### Storage e ambienti
In sintesi, avremmo quindi tre ambienti e tre tipologie distinte di storage (bucket):

- `prod1` (Blue)
- `prod2` (Green)
- `qual` (Qualification)

Storage:

- `qual` (Qualification)
- ` ` (Production)
- `test` (Test)

I tre storage avrebbero tutti la stessa struttura. L'unica variazione consisterebbe nel primo token del percorso. P.e.: 

```
/GIAM&WM_FR/qual/...
```

(O l'inverso, da valutare).

Per motivi di sicurezza, i due storage prod e test dovrebbero essere separati e dovrebbe essere impedito la scrittura dalla catena live verso test e dalla catena non live verso prod. E' tuttavia complesso poter gestire questo tipo di impedimento. In questo senso, è più semplice verificare tramite alert e relativo incident l'avvenuta violazione.



---

## Web Application

Per la realizzazione della web application potremmo seguire un approccio basato su __JAM stack__. Lo strumento per la costruzione della build statica sarebbe [Next JS](https://nextjs.org/). La toolchain che rende a disposizione ha diversi vantaggi. Fra i quali: il rendering server side dei componenti react e delle pagine (viste a loro volta come componenti react), la possibilità di integrarsi con diverse sorgenti per il recupero di file (p.e. markdown) o dati, la sua completa estendibilità grazie al supporto nativo webpack e babel, dynamic routing, il code splitting automatico per evitare il caricamento di tutti gli script all'interno di una pagina anche se non necessari e molte altre.

L'introduzione di Next.js ha inoltre il vantaggio di standardizzare e strutturare un po' di più la realizzazione dell'applicazione web (a differenza di quanto non avvenga nel caso di __create-react-app__) e permettere una più gestibile estendibilità dell'applicazione nel tempo, oltre alla creazione di uno standard per necessità simili in futuro. Il __server-side-rendering__ in un primo momento non sarebbe percorribile, volendo eseguire una build statica del codice prima del deploy. A tendere tuttavia, potremmo valutare di eseguire il deploy su un web server con node js oppure valutarne un suo deploy su componenti serverless. 

La parte back-end verrebbe gestita invece da __AppSync__. Potremmo avere quindi a disposizione un motore di graphql, da utilizzare tramite __AWS Amplify__. La CLI che Amplify mette a disposizione potrebbe infatti essere utilizzata per accedere ad AppSync (oltre che per l'autenticazione). Lo schema GraphQL verrebbe invece dedotto dalla struttura di una tabella __DynamoDB__, che dovrebbe ospitare la snapshot corrente, tramite export da __Glue__. Avremo una tabella differente per ogni snapshot (AUM, P&L e BS). Le query di __mutation__ verrebbero invece gestite tramite tabella a parte, in modo da tradurre queste chiamate in eventi sul bus. AppSync permetterebbe inoltre di sottoscrivere il client a particolari eventi (come l'aggiornamento degli stati della pipeline), dando quindi la possibilità all'utente di tracciare come procede la sottomissione delle modifiche.

In termini di dimensioni e di occupazione, ogni snapshot è di fatto molto piccola (qualche decina di KB allo stato attuale e probabilmente a tendere < 1MB). Il numero di record è inoltre molto basso. Per cui si potrebbe sfruttare l'API di DynamoDB transazionale. 

Il rendering delle componente statiche verrebbe ospitato da S3 e da __CloudFront__. In questo modo potremmo gestire una doppia origine per gestire il B/G deploy (da validare se gestirlo tramite DNS o tramite switch delle origin). La parte AppSync corrispondente avrebbe semplicemente un nuovo schema ma verrebbe "tirato dentro" dal client.

Il B/G deploy della web application seguirebbe lo stesso processo di deploy identificato per la pipeline. 

Durante la build statica, verrebbero recuperate le informazioni aggiornate relative alla documentazione e al __metadata dictionary__. Quest'ultimo verrebbe anche utilizzato per consentire di identificare a _runtime_ i tipi di dati nei form di cambiamento.

Ad ogni richiesta di mutation relativa ai _business user data_ o agli _static data_ verrebbe lanciato un evento come nel caso degli eventi S3 di deposito su staging. L'evento avrebbe tuttavia il puntamento direttamente su Dynamo alle righe corrispondenti alle modifiche. Questo consentirebbe di eseguire la validazione in modo conseguente e permetterebbe anche la modifica dei dati in modo opportuno (nel caso p.e. di dati statici, non sarebbe possibile ricostruire immediatamente il file precedente; la cosa andrebbe eseguita in fase di creazione della snapshot).

---

## Produzione

### Richieste ServiceNow per installazione ODBC Symba
- [Cosimo.Meini@generali.com] RITM000445016
- [Giuseppe.Lomurno@generali-invest.com] RITM000445021
- [Giuseppe.Cerliani@generali-invest.com] RITM000445024
- [Agathe.Brohard@generali-invest.com] RITM000445034
- [leonardo.pezzato@generali-invest.com] RITM000445030
- [Dahab.Bsairi@generali-invest.com] RITM000445037