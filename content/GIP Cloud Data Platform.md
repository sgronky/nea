---
title: "GIP Cloud Data Platform"
date: "2020-05-03"
slug: "gip-cloud-data-platform"
tags: ["cloud", "project"]
---

## Domande
- E' assolutamente necessario puntare ad una soluzione Multi-org?
    + Abbiamo studiato le varie opzioni. Per motivi sostanzialmente politici abbiamo valutato di procedere con una soluzione Multi-org. 
- E' possibile valutare una soluzione basata su S2S almeno per le altre soluzioni Salesforce?
    + Abbiamo valutato l'opzione, ma non funziona. 
- E' già stato firmato il contratto con il fornitore PwC?
    + Sì. Il fornitore è stato nominato per la parte initiating ma anche è stato confermato anche per la fase di sviluppo. E' stato fatto un discovery e un assessment. 
- Qual è il budget? Sono stati valutati gli economics?
    + 95k (GSS + Talend)
- Quali sono i tempi di progetto?
    + Un anno di lavoro. Tutto il 2020.
- Sono stati già aggiornati i vari Salesforce verso la versione Salesforce Financial Services Cloud?
    + Sono in corso. Si tratta fondamentalmente di un aggiornamento verso una versione con più feature e ad un corso migliore. 
- Esiste la versione Master-Org?
    + E' quella di GIP. 
- Soluzione di Analytics
    + Einstein Analytics. E' sviluppato dentro all'ambiente Salesforce.

## Vantaggi di una soluzione DataLake + Glue (o EMR)
- Massima scalabilità  
- Assenza completa di infrastruttura da gestire (serverless / managed)
- DevOps (CI / CD) -> Deploy automation
- Possibilità di integrare ulteriori dati derivanti da strutture differenti in modalità semplice
- Possibilità di analytics avanzati con la stessa piattaforma (p.e. implementazione di algoritmi di machine learning)
- Possibilità di esposizione degli stessi dati verso ulteriori strumenti di reporting (p.e. Tableau o Power BI)
- Possibilità di fornire all'utente finale degli strumenti avanzati di analisi dei dati (p.e. Zeppelin o SageMaker)
- Possibilità di esposizione dei dati attraverso API per consentire in trasparenza il recupero delle informazioni ad altri sistemi
- Possibilità di calcolo di KPI e SLI, strumenti di gestione e operations avanzate, monitoring, alerting, ecc...
- Possibilità di integrazione con strumenti di incident management (ServiceNow)

## Integration Architecture
__API Call__:  
- [Bulk API](https://developer.salesforce.com/docs/atlas.en-us.api_bulk_v2.meta/api_bulk_v2/introduction_bulk_api_2.htm) (for Batch Data updates) 
- [Bulk SOQL](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_bulk_query_intro.htm) (Batch Data)  

Dati da acquisire in modalità batch:
- Customer  
- Contact  
- Opportunity  
- Product  
- Lead  
- Activity  

__Non-CRM Data__:  
- CSV or Excel files coming from non-CRM Systems

The customers of the Boutiques will be updated with the data of the masters identified in GIP after the execution of the corresponding process

Le Bulk API possono essere utilizzate anche per il primo caricamento dei dati. A regime tuttavia, solo i delta dovranno essere inviati.

### Soluzione proposta da PWC
By filtering for the salesforce standard field __LastModifiedDate__  all the records created or updated after the last execution of the ETL will be retrieved. E.g.: 

```sql
select FirtsName, LastName 
where LastExecutionOfTheTalendProcessDate >= LastModifiedDate
```

The query is not complex but it requires the Engine Hub to keep and store the last execution timestamp at every execution. Another relevant side effect is that the query will retrieve a record regardless it have been updated: any field updated will trigger the sending to GIP; for example if only FirstName and LastName are synchronized but any other field is already up to date, the record will be retrieved by the ETL and sent to GIP.

The proposed solution is to implement a TRIGGER (handler) for each batch data on the Boutiques:  
- keeping trace that a record has been sent to GIP properly or not;  
- sending to GIP a record only if it has been updated (mapped field) and to define an ad hoc field (i.e. `sync`) with the following values:  

- 0 = Synchronized (sent to GIP)
- 1 = Not Synchronized (not sent to GIP)
- 2 = Synchronizing (sending to GIP)

## Pianificazione di massima
- __Setup__: \[12 settimane\]
    + __RFP__: \[4 settimane\] √
        * Predisposizione (1 settimana) √
        * Chiusura (3 settimane) √
    + __GSS (Demand)__: \[8 settimane\]
        * Predisposizione dei requisiti tecnici (2 settimane) √
        * Gestione demand (3/4 settimane) ***
        * Setup ambiente (1/2 settimane)
- __Predisposizione della soluzione__: \[2 settimane\]
    + __Finalizzazione e conferma BR__: \[1 settimana\] 
    + __Analisi impatto BR__: \[1 settimana\]
- __Implementazione__: \[20 settimane \]
    + __Accessi e setup integrazione SF__: \[2 settimane\]
    + __Recupero dati report__: \[3 settimane\]
    + __Setup ambiente__: \[2 settimana\]
    + __Implementazione__: \[6 settimane\]
    + __Test e integrazione__: \[3 settimane\]
    + __DevOps__: \[4 settimane\]
- __Organizzazione del servizio__: \[5 settimane\]
    + Predisposizione utenze business, training, ecc...: \[1 settimane\]
    + Test di UAT: \[4 settimane\]

__Totale__: 39 settimane = 8/9 mesi

## Cloud Data Platform
To put it simply, my idea is to turn what can be defined as a data integration hub into a more valuable Cloud Data Platform that can provide the integration between the different Salesforce sources while persisting master data into a data lake in order to allow for:

- Advanced data analytics and BI functionalities directly into the platform (e.g. machine learning algorithms) that can be given to business users (e.g., via notebooks and / or other BI tools such as Tableau)
- Data exploration, data governance and data quality checks.
- Analysis of historical data.
- Integration back-to-back with external systems by providing REST APIs (e.g., should we need to integrate some data with an external websites).
- Data enrichment with other sources (e.g., SAP data) to provide more insights on data.

In addition, we can achieve:

- Advanced real-time monitoring (KPIs, SLIs, etc…), alerting, notifications, etc… both for business and technical users.
- DevOps practices fully in place (i.e., continuous integration, continuous deploy, infrastructure-as-code, testing automation, etc…). 
- Great scalability with no physical servers to maintain (the solution leverages totally on AWS serverless  and managed services with no virtual machines to manage)
- Automatic integration with Service Now as for incident management.

As for the economics, my estimation is as follows:

- Build: 110K€ (Data platform implementation, cloud specialist support, GSS professional services and executive demand*)
- Run: 21K€ (Cloud) + 36K€ (Operations for the remaining 6 months)

*: Additional 16k€, if we want to proceed with an assessment demand

## Solution Proposed
IT organizations must copy data to analytics platforms, often continuously, without disrupting production applications (a trait known as zero-impact). Data integration processes must be scalable, efficient, and able to absorb high data volumes from many sources without a prohibitive increase in labor or complexity.

> A unique, flexible, fully extensible and business-focused cloud data platform for GIP with the purpose of acting as a foundation for the sales' heterogeneous information domain.
> 
> A unique platform able to store, clean, enrich and activate the business value of the underlying information addressing specific business needs._

## Modifiche alla presentazione del Business Case
- Esplicitare ulteriormente la parte dei Pain Points e Business Needs per sollecitare il bisogno di un modello maggiormente vicino al DataOps (p.e. puntando sui Silos attuali e la mancanza di automazione, data quality e governance, facilità di accesso, ecc...)
- Aggiungere rispetto all'As-is anche la situazione attuale di Salesforce
- Aggiungere le informazioni sui tempi di esecuzione delle varie attività attuali in modalità Value Stream Map
- Completare gli economics e calcolare i benefits
- Completare il TCO vs Benefits e il Payback period

## Request for Information to GSS Executive Demand
- The system architecture is a draft and may change according to a clearer definition of the business requirements.
- Not all services in the system architecture must be provided from the very beginning. We can discuss about that with Stefan, as soon as we start the execution phase (.e.g, QuickSight and SageMaker).
- As for the consumption estimation, we don’t own right now a concrete vision of everything, though we can provide some numbers covering part of the main aspects:
    - Number of expected service calls: 10k / day
    - Volume of requests: 100 MB / day
    - Number of user accounts: < 20
    - Estimated storage (target): < 1GB / day

---

## Business Requirements
- __Data integration__. _All data will flow from Boutiques to GIP Org_. This allows GIP creating a _global and unique reporting system_ (using Einstein Analytics) and a _unique master database_. All the information collected in GIP database will be then __deduplicated__ and __updated__ (only for records that already exist in Boutique’s org) in the single Boutique database, in order to have a unique overview of the Customer.

- __Hierarchy__. GIP is placed at the top of the hierarchy and only this Org will be able to see and manage the Records of all the Boutiques. All the single Boutiques are independent (Multi-Org).

---

## General considerations regarding the Business Objectives
The GIP CDP must be seen as a sort of data repository for all the relevant information that GIP has in its own perimeter. To this extent, it serves two main purposes:

- To collect, validate, clean, transform and expose data coming from different sources in order to improve the overall quality, consistency and availability of the information
- To share such inforamtion among the different actors either automatically or under the control of GIP

The main strategic objectives that the CDP should contribute to perseive are therefore:
- Provide to GIP the relevant information regarding the different initiatives that the Boutiques have in order to augment the revenues due to cross-selling initiatives
- Reduce the amount of work sales people have to cope with in order to achieve those results

__Are there any other strategic objectives?__
No, they suffice.

__Is it possible to acquire all Boutiques data?__
Yes, but we must at least distinguish between CRM and non-CRM data.

__What is the decision regarding the products right now?__
The products are weekly acquired by the product catalog.

__What about the accounts?__
The decisions have not been made. We are reasoning about a centralized solution with no changes on Salesforces side and a consolidated view among the different sources.

__Is it possible to augment the Salesforce interface through direct integration with our platform? (e.g. through REST calls or web widgets)__
Seems so.

## Considerations on Design
Main quality factors to be considered in the design:
- Reliability
- Flow Automation
- Availability
- Accuracy (which means integration of reference sources and data consistency among the different CRM systems)
- Flexibility
- Minimization of the effort on the Boutiques orgs

__Master Data and interaction with the cloud data platform__. The cloud data platform should be able to centralize some master data regarding __products__ and __accounts__. such information must be used to feed GIP org and in turn, feed all the other CRM systems. Starting from a common base of accounts, the cloud data platform should centralize, clean and organize the accounts data. For instance, we can expose a web interface to manage the accounts (the web application could be tought as an administrative interface towards functionalities exposed by the cloud data platform). Every change to the accounts could be pushed to the different CRM platforms. The addition of new accounts could be made through Salesforce via API calls (an APEX class and a custom button). This way, we could accept calls through an API gateway or AppSync (GraphQL) and generate an unique id to be associated to the new account. An alert could be raised in order to take care of the validation for the new generated account by a central dedicated team. We could accept the completion and fulfillment of the necessary fields for the new account via API call or via Web application. 

__Note generali__. Il modello implementativo che potremmo seguire dovrebbe basarsi sulla stessa architettura ad eventi e microservizi implementata per Bi4CFO. Indipendentemente dai vari flussi di entrata e dalla gestione dei dati master, infatti, un'architettura a eventi consentirebbe di accettare _comandi_ dall'esterno, tradotti in eventi interni. Avremmo eventi differenti per ciascuna tipologia di dato da integrare (ovvero: `Opportunity`, `Event`. `Task`, ...) e conseguenti microservizi per poterle gestire. In questo modo, la logica sarebbe incapsulata all'interno e potremmo inoltre integrare differenti servizi attivati dagli stessi eventi sulla base delle necessità. Potremmo inoltre predisporre fin da subito una web application per la gestione delle informazioni centralizzate (come `Account` e `Product`) e per tutti gli eventuali ulteriori parametri di configurazione. La web application potrebbe appoggiarsi su uno strato back-end implementato via `ApiGateway` o via `AppSync`, consentendo così anche l'esposizione trasparente dei dati memorizzati e l'esposizione di ulteriori funzionalità aggiuntive (p.e. ricerca testuale efficiente degli account).

In funzione di un'architettura a microservizi, avremmo quindi un modello dati dedicato per ciascuna entità (uno per le `Opportunity`, uno per gli `Event`, ecc...). Avremmo inoltre un `EventStore` per la memorizzazione di tutti gli eventi ricevuti. Resta da valutare se via siano pericoli di inconsistenza dei dati in questo modo. 

> Dovremmo valutare come procedere per tutte le logiche di deduplicazione. Potendo infatti fare riferimento ad un repository centralizzato, la creazione di oggetti potrebbe seguire una logica di richiesta iniziale ma questo non rmuoverebbe la necessità sulla singola piattaforma di gestire i duplicati. 