---
title: "Valutazioni Architetturali"
date: "2018-10-05"
slug: "valutazioni-architetturali"
tags: ["enterprise-architecture", "notes"]
---

## Principali Needs
- Modellazione dei dati in domini funzionali rilevanti e master db significativi
- Devops e continuos delivery model
- Current State Architecture
- Servizi REST per l'accesso ai dati e per i test automatici
- Strumenti di Analisi (Elastic Search Stack)
- Target Architecture

## Change Management e Continuous Delivery
Il processo di change management è attualmente poco strutturato. Non si fa alcun cenno alla gestione dei defect e all'approvazione formale sui test di non regressione o in generale all'eventuale campagna di test eseguita. Non si fa alcun cenno ad un'approvazione formale da parte dell'architetto e non vi è alcuna indicazione circa il processo di change. Non è prevista una gestione infrastrutturale che utilizzi container (p.e. Docker).

## Data Management
Manca un modello dati aziendale con riferimenti a ciascun dominio funzionale e ownership dei dati. Dovrebbero essere identificati i principali modelli dati, i relativi database e le modalità di integrazione e allineamento fra le basi dati. Dovrebbero quindi essere identificate le modalità di esposizione e di accesso ai dati in modo controllato e definito (p.e. valutare la possibilità di esporre via __REST__ i principali dati operativi). Inoltre si potrebbe valutare la possibilità di esporre dati in modalità _near real time_ (p.e. sui dati prodotti da SmartCo e da SimCorp).

## Esposizione servizi
La possibilità di creare un livello uniforme di servizi __REST__ in grado di esporre in maniera standard i principali dati (in lettura) verso le piattaforme che necessitano di tali dati, permetterebbe una serie di vantaggi:

- Accesso controllato e securizzato
- Possibilità di definire nuove modalità di integrazione e di creazione di applicazioni
- Possibilità di evitare repliche di dati e flussi per mantenerle allineate
- Possibilità di ricevere in real-time le modifiche ai dati transaionali e renderli persistenti in strati di cache ad hoc

Allo scopo, si potrebbe implementare un _private cloud_ di apigee ed esporre un set di api che consentano di recuperare i dati dell'operazionale e dei principali dati degli analitici in formato __Open API__ senza implementazione di sorta (accesso diretto alle basi dati).


## Life Cycle Management
Non esiste un processo di life cycle management ben strutturato. Il codice non è manutenuto su repository, non esiste un processo di continuous build e non abbiamo strumenti automatici di validazione della qualità. Dovremmo integrare strumenti per il versionamento del codice sorgente (p.e. github) e per la continuous build (p.e. Jenkins) e dovremmo utilizzare strumenti di deploy automatico laddove possibile. Inoltre andrebbero integrati strumenti per la verifica della qualità del codice sorgente rilasciato (p.e. SonarQube).


## Gestione dei Batch
Per molta parte, l'elaborazione e l'integrazione con sistemi esterni (calcolo del NAV, riconciliazione, ecc...) avvengono utilizzando scambi di file. Tali file sono l'export di dati su DB. La gestione di queste eleborazione viene schedulata normalmente da un sistema di elaborazione centralizzata (OpiCon). Tuttavia non è raro trovare esempi di schedulazione eseguita da sistemi proprietari (p.e. SimCorp ha il proprio sistema di schedulazione per alcune elaborazioni interne). La gestione dei batch potrebbe essere gestita tramite __LogStash__, almeno per quanto concerne la trasformazione di file. Laddove poi siano presenti delle elaborazioni, potremmo intervenire introducendo __Storm__ con eventualmente __Kafka__ per lo streaming dei dati e la persistenza. 

In alternativa, e con maggiori vantaggi, tutta la parte di processamento batch, on-line e di analytics, potrebbe essere condotta utilizzando __Spark__. 


## Piattaforma di Analitics & analisi logging
Si potrebbe valutare la possibilità di realizzare una piattaforma generale di analitics con uno stack Elastic Search e varie piattaforme Kibana. __Non esiste un formato unico per i log__. Occorre certamente lavorare a livello di singola applicazione per formalizzare un formato unificato e delle policy di logging a livello generale che possano essere utilizzate per recuperare informazioni rilevanti.


## Funzionalità applicative e servizi
Dovrebbero essere identificate le principali funzionalità applicative in scope e i servizi all'interno del landscape applicativo. Per ciascuna funzionalità dovrebbe quindi essere identificabile l'applicazione che eroga il servizio.


## Ambienti non produttivi
Allo stato attuale sono presenti diversi ambienti non produttivi, per diverse piattaforme. Spesso, anche più dei consueti dev, test, uat, pre-prod e prod. La presenza di ambienti differenti per applicazioni differenti (che magari non siano in comunicazione fra loro) è sicuramente contro-produttivo. Perché tali ambienti deveono essere manutenuti e tenuti allineati alla produzione e perché, se non in grado di comunicare fra loro, non svolgono effettivamente il loro reale ruolo. Gli unici ambienti che possono essere manutenuti separati sono gli ambienti di sviluppo. I pacchetti prodotti dovrebbero quindi avere un'unica versione valida per tutti gli ambienti (eventuali modifiche in termini di configurazione dei pacchetti dovrebbero essere tenute fuori dal pacchetto stesso).


## Possibili tool da integrare
Project Management Tools:

	- JIRA
	- Asana
	- Redmine
    - Slack

Enterprise Architecture:

	- Orbus
	- Visio
	- Archimate

Continuous Delivery:

    - Kubernates

Continuous Build:

    - Jenkins

Versionamento codice sorgente (repository):

    - Github
    - Artifactory

Configuration Management:

    - Chef
    - Vagrant (/ Cloudera Manager)


## Principali problemi da sanare
- Non esiste un processo di change management consolidato e universalmente accettato dai vari gruppi applicativi. Laddove sono in essere procedure di CM, sono customizzate, spesso interviene direttamente lo sviluppo nei rilasci e nei testi in ambiente produttivo.
- Il codice, laddove prodotto (ma possiamo includere anche le modifiche al database) sono operate direttamente dallo sviluppo e non viene versionato. Le procedure di build per il rilascio sono eseguite dai fornitori e non sono riproducibili in modo automatico. Non sono indicate in modo formale le versioni rilasciate e per ciascun artefatto rilasciato, non sono indicate formalmente le funzionalità rilasciate.
- Gli ambienti produttivi (e non) vengono di volta in volta implementati da GSS a seconda della necessità applicativa. Se necessarie, sono apportate modifiche ad hoc e configurazioni specifiche (p.e. alle macchine virtuali).
- Non esistono ambienti non produttivi generali (per ciascun applicativo sono possibili più ambienti e spesso non si tratta di ambienti collegati).
- Non sono previsti incontri per i rilasci generali e non è eseguita, ancor che prevista, una procedura condivisa di approvazione e pianificazione dei rilasci. 
- Non sono inoltre previsti dei test automatici.
- Non esiste un CMDB
- Non esiste una blue print architetturale
- Non esistono modelli aziendali dei database. Spesso i dati sono replicati utilizzando procedura batch, per consentirne l'accesso ai differenti gruppi. Non è inoltre controllato in modo generale l'accesso a tali dati e gruppi differenti possono avere permessi o elevati (compresa la scrittura) o per nulla.
- Il principale database transazionale non è accessibile alle applicazioni e/o per la consultazione. Non esiste un modello dati aziendale.
- Non esiste un gruppo di Ops. Le funzionalità di Ops sono portate avanti da un'altra società del Gruppo. Questo risulta in una certa barriera di comunicazione. Ogni società ha infatti ovviamente le proprie procedure, la propria burocrazia, ecc... Questo costituisce un grosso limite all'implementazione di procedure agili per il continuous delivery e il Devops.
- Non esistono sistemi centralizzati di Analytics per l'IT, che consentano una visione sul monitoraggio dei flussi caricati, sulle performance delle applicazioni, sui calcoli eseguiti, sull'utilizzo dei tool, ecc... questo comporta una certa difficoltà nel problem solving e nella valutazione della qualità dei rilasci eseguiti. I sistemi di ticketing, ancorché presenti, vengono spesso aggirati e il business chiama direttamente i responsabili IT oppure esegue direttamente le analisi necessarie.
- Il business in alcuni casi implementa direttamente i propri tool e successivamente chiede all'IT di prenderli in carico e gestirli.
- Non esiste un framework comune e condiviso di project management.


## Target Architecture
Secondo la seguente __rimappatura applicativa__ (_da valutare_):

|As-is |To be |
|---|---|
|Regulus |Spark / Hadoop + Cassandra |
|MDM / SmartCo |Spark Stream / FB + LS |
|Front Office Tools |Kibana + ES + RestAPI |
|Cognos + DWH |Cassandra + Cognos |

### Pricing
|Product |Pricing |
|---|---|
|Spark |Free (Apache License) |
|Hadoop (HDFS + YARN) |Free (Apache License) |
|Cassandra |Free (Apache License) |
|ELK |Free (on premises, in cloud da valutare) |
|Apigee Edge |Da quotare sulla base delle necessità (prob. 40-50k / year ) |


## Technical Sheet: Apache Spark
__Apache Spark__ is an easy-to-use, blazing-fast, and unified analytics engine which is capable of processing high volumes of data. It is an open source project that was developed by a group of developers from more than 300 companies, and it is  still being enhanced by a lot of developers who have been investing time and effort for the project. As a lightning-fast analytics engine, Apache Spark is the preferred data processing solution of many organizations that need to deal with large datasets because it can quickly perform batch and real-time data processing through the aid of its stage-oriented  DAG or Directed Acyclic Graph scheduler, query optimization tool, and physical execution engine.

Apache Spark, moreover, is equipped with libraries that can be easily integrated all together in a single application. These libraries include an SQL module which can be used for querying structured data within programs that are running Apache Spark, a library designed to create applications that can execute stream data processing, a machine learning library that utilizes high-quality and fast algorithms, and an API for processing graph data and performing graph-parallel computations. Apache Spark is also a highly-interoperable analytics solution, as it can seamlessly run on multiple systems and process data from multiple sources. It can be deployed to a single cluster of servers or machines using the standalone cluster mode as well as implemented on cloud environments.

### Overview:
    - Generality: Perform SQL, Streaming, And Complex Analytics In The Same Application
    - Easily Work On Structured Data Using The SQL Module
    - Take Advantage Of The DataFrame API
    - Uniform And Standard Way To Access Data From Multiple Sources
    - Supports Both Batch Data And Real-Time Data Processing
    - Stream Data Processing
    - Built Interactive, Scalable, And Fault-Tolerant Streaming Applications
    - High-Quality Machine-Learning Algorithms
    - Graph Analytics And Computation Made Easy

[https://reviews.financesonline.com/p/apache-spark/]


## Technical Sheet: ELK
The __ELK Stack__ is a collection of three open-source products — __Elasticsearch__, __Logstash__, and __Kibana__ — all developed, managed and maintained by Elastic. Elasticsearch is a NoSQL database that is based on the Lucene search engine. Logstash is a log pipeline tool that accepts inputs from various sources, executes different transformations, and exports the data to various targets. Kibana is a visualization layer that works on top of Elasticsearch.

The stack also includes a family of log shippers called __Beats__, which led Elastic to rename ELK as the Elastic Stack.

With millions of downloads for its various components since first being introduced, the __ELK Stack__ is the world’s most popular log management platform. In contrast, Splunk — the historical leader in the space — self-reports 15,000 customers total. (Netflix, Facebook, Microsoft, LinkedIn, and Cisco monitor their logs with ELK).

 The performance of virtual machines in the cloud or not can greatly fluctuate based on the specific loads, infrastructure servers, environments, and the number of active users. As a result, reliability and node failures can become significant problems.

__Log management platforms__ like ELK can monitor all of these infrastructure issues as well as process operating system logs, NGINX and IIS server logs for technical SEO and web traffic analysis, application logs, and ELB and S3 logs on AWS. In general, ELK is an open source search and analytics engine with the possibility to make real­time data exploration. 


## Technical Sheet: NGINX
__nginx__ [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by Igor Sysoev. For a long time, it has been running on many heavily loaded Russian sites including Yandex, Mail.Ru, VK, and Rambler. According to Netcraft, nginx served or proxied 25.91% busiest sites in January 2019. Here are some of the success stories: Dropbox, Netflix, Wordpress.com, FastMail.FM.

(__NGINX Plus__)[https://www.nginx.com/products/nginx/] is a software load balancer, web server, and content cache built on top of open source NGINX. NGINX Plus has exclusive enterprise‑grade features beyond what's available in the open source offering, including session persistence, configuration via API, and active health checks. Use NGINX Plus instead of your hardware load balancer and get the freedom to innovate without being constrained by infrastructure.

(__NGINX Controller__)[https://www.nginx.com/products/nginx-controller/] is NGINX’s control‑plane solution that manages the NGINX data plane. Built on a modular architecture, NGINX Controller enables you to manage the entire lifecycle of NGINX Plus, whether it’s deployed as a load balancer, API gateway, or a proxy in a service mesh environment. The Load Balancing Module configures, validates, and troubleshoots your load balancers. The API Management Module allows you to define, publish, secure, monitor, analyze APIs. An upcoming Service Mesh Module will simplify how you move from common Ingress patterns for containers to more complex service mesh architectures designed to optimize management of dozens, hundreds, or thousands of microservices.

(__NGINX Unit__)[https://www.nginx.com/products/nginx-unit/] is a dynamic application server, capable of running beside NGINX Plus and NGINX Open Source or standalone. Unit supports a RESTful JSON API, deploys configuration changes without service disruptions, and runs apps built with multiple languages and frameworks. Designed from scratch around the needs of your distributed applications, it lays the foundation for your service mesh.


## Presentazione Architetture
### Obbiettivo: 
_Ruolo di architetture e definizione e pianificazione delle principali priorità da seguire nel prossimo anno_

### Slides:
1. Mandato di architettura
2. Responsabilità (Ownership e Accountability)
3. Roadmap per la costruzione della funzione:    
    _Identificazione dei principali punti di intervento architetturali e di processo e attribuzione delle relative priorità_
4. Aree di intervento prioritarie
    1. LCM: DevOps e CD, processo di Change Management, funzioni di Operations gestite da GSS, Ambienti non produttivi
    2. CSA: Mappatura del Landscape applicativo (definizione di un perimetro chiaro) e ruoli e funzioni dei relativi componenti, data management, ArchiMate
    3. Analytics: Centralizzazione delle informazioni, CMDB
    4. Target Architecture: gestione dei batch, esposizione dei dati
5. Ruoli necessari a tendere da inglobare nella funzione
6. Definizione delle modalità di ingaggio e milestone formali

### Current State Architecture:
_Occorre studiare la posizione dei pezzi sulla scacchiera prima di poter fare una qualsiasi mossa_

1. Definire una comune documentazione da utilizzare per la Business Continuity, Incident Management, Application Management, ecc...
2. Ha senso solo se strutturata e formalizzata (-> ArchiMate)
3. E se può essere manutenuta -> 1 FTE (valutazione architetturale degli impatti ad ogni change)
4. Necessario un minimo investimento in risorse (consulenti?) e in licenza software (Orbus@Visio)


## Presentazione Architetture FSA 2
### Obbiettivo dell'IT
Aumentare l'efficienza, la scalabilità e ridurre i costi per poter fornire servizi ad un numero crescente di LE nel gruppo

### Ostacoli da affrontare nell'implementazione della strategia
- Come possiamo ridurre i tempi di rilascio degli applicativi e i costi di sviluppo?
- Come possiamo aumentarne la visibilità e le metriche?
- Come possiamo migliorare la qualità e l'affidabilità dei rilasci? E incrementarne la frequenza?
- Come possiamo migliorare la collaborazione con GSS, riducendo i rischi e i costi di infrastruttura da iniziativa ad iniziativa?
- Come possiamo ridurre il lavoro non organizzato e non strutturato che dobbiamo gestire?
- E come possiamo strutturare dei processi in modo che siano accettati ed implementati da tutti?
- Come possiamo evitare che l'aumento delle attività previste ci sovrasti in termini di effort che siamo in grado di assorbire al momento?
- Come possiamo aumentare la collaborazione fra gruppi anche logisticamente separati?
- Come può la funzione di enterprise architecture contribuire in modo significativo in questo percorso?

### Azioni da intraprendere
- Introdurre una funzione di monitoraggio e alerting configurabile in grado di fornire le misure necessarie ad aumentare in modo consistente la visibilità sull'intero panorama applicativo 
    -> ANALYTICS & MEASURE
- Uniformare il processo di change ridefinendo un processo unico, applicabile in tutti i differenti contesti 
    -> SOFTWARE DELIVERY PROCESS
- Guidare una proposta di modifica architetturale che proceda nella direzione di uniformare e semplificare la gestione dei cambiamenti, sia flessibile, riduca i costi e consenta di implementare la strategia di business 
    -> TARGET ARCHITECTURE


## Architecture Board
### Service Design
Before a new or changed service is implemented, it must be designed. As with any design, you need to consider not only the functions that the service aims to achieve but also a variety of other qualities. Some of the considerations when designing a service are:

Image What automation is going to be involved as a portion of the service? Any automation should be designed according to the principles of software design. In general, these include the eight principles that Thomas Erl articulated for service design:

- Image Standardized contract
- Image Loose coupling
- Image Abstraction
- Image Reusability
- Image Autonomy
- Image Statelessness
- Image Discoverability
- Image Composability
- Image What are the governance and management structures for the service? Services need to be managed and evolved. People responsible for the performance of the service and changes to the service should be identified by title if not by name.
- Image What are the SLAs for the service? How is the service to be measured, and what monitoring structure is necessary to support the measurement?
- Image What are the personnel requirements for the service? Can the service be provided with current personnel, or do personnel with specific skills need to be hired or contracted? Alternatively, will the service be outsourced altogether?
- Image What are the compliance implications of the service? What compliance requirements are satisfied by the service, and which are introduced?
- Image What are the implications for capacity? Do additional resources need to be acquired and what is the time frame for this acquisition?
- Image What are the business continuity implications of the service? Must the service be continued in the event of a disaster and how will this be accomplished?
- Image What are the information security implications of the service? What data is sensitive and must be protected, and who has responsibility for that data?


## The EA's Team
__Data manager / architect (enterprise information architect)__ -> for data modeling and data management
__Quality Engineer / Test engineer__ -> for quality assurance e test automation
__Developer__ -> for microservices and devops activities
__Devops engineer (evangelist)__ -> for infrastructure coding, tooling, etc...
__Release Manager and Automation Architect__ -> for release automation activities
__Reliability Engineer__ -> for monitoring the service and improving on the quality. Has the ability to diagnose a problem in the presence of uncertainty
__Solution Architect__ -> for general design activities


## Comunicazioni
Non esiste un modo attuale per poter comunicare in modo efficiente ed ufficiale al resto dell'azienda. In particolare, occorrerebbe una modalità per poter pubblicare documenti tecnici, note informative, policy, ecc...

--------

## CSA
Prossimi Step:
- Riunione con Orbus
- Presentazione e Business Case
- Individuare il valore complessivo
- Selezionare società di consulenza in grado di gestire tutto l'assessment architetturale. P.e. ACN.
- Modifica dei processi di Business Change con l'introduzione formale dello step di validazione di EA

### Nota 1:
Come motivazione si potrebbe utilizzare l'analogia con gli scacchi: E' come se mi fosse chiesto di giocare una partita a scacchi già iniziata e dovessi giocarla bendato. Il gioco si svolgerebbe con un dialogo del tipo:

- Ho un cavallo?
- Sì?
- Dov'è?
- In C4.
- Ok, allora lo sposto in D5.
- Non puoi. C'è già un alfiere in C5. Hai anche un alfiere.
- ...

--------

## Cloud Service Team
- Big Data Architect (1)
- Cloud Solution Architect (1)
- Cloud Engineers (3):
    + Service administrator
    + Site Reliability Engineer (Monitor, Troubleshooting, Optimize, Upgrade)
    + QA Engineer
    + DevOps Engineer (LCM)
    + Security Engineer

