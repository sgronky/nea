---
title: "Cloud Governance"
date: "2020-04-20"
slug: "cloud-governance"
tags: ["cloud", "business-case"]
---

##Business Case Benefits
- __Self-Service Setup__
- __Shared Services Proposition__. The proposition of new shared services could be an additional benefit to add to any specific business initiative that we could address with cloud-native implementations. Indeed, we could leverage on thirdy-party software and custom services to improve the overall quality and augment the set of functionalities offered to our potential customers. Such a benefit can be quantified along two lines, that correspond with the two categories of services we can offer: (1) fast time to deliver, acquired by services that cover common monitoring and controlling functionalities, continuous integration / continuous deployment, versioning, issue tracking and project management, documentation; (2) improved overall quality, acquired by services that may encompass data governance, common data integration, data access and data virtualization, fast development with low-code services, etc... In the evaluation of the benefit, we conservatively consider only the following shared services: (1) CI/CD pipeline already in place and shared among different platforms; (2) Shared controlling and monitoring dashboard service, customized for the different services so as to trace the corresponding KPIs; (3) Common application for documenting the application and sharing the relative information; (4) Common data integration. Moreover, we evaluate only the reduced effort, needed to setup the services. This is of course a low estimate of the total benefit, as the improved quality delivered with the service is not quantified. Finally, most of those services once in place may also generate additional revenues that admittedly contribute to increase the total value provided.
- __Reduced Time to Market__. The benefits of fast time to market can amount to a 5 percent to 20 percent increase in the business value of the application to an organization. These gains are predominantly found in two areas (1) an increase in the number of months the application is used and (2) a decrease in the risk necessary to realize the benefits of the application. For that reason, we could just conservatively evaluate: (1) an increased value of business platforms (we could deliver fast and so increase the number of months the application could provide its business benefits) and (2) an increased number of applications that could be delivered in the same amount of time. 
For our case, we have estimated the time reduction in percentage by leveraging our last experiences. Over a total elapsed build time of 8 months, the total time devoted to build the system has been around 4 months (50% of time has been wasted waiting).
- __Site Reliability Team__. The three main Site Reliability Engineer responsabilities are to ensure that the platforms he operates are reliable, efficient and scalable. The financial impact of Efficiency and Scalability can be measured by considering: (1) The constant optimization of costs; (2) The reduction of "toil" and the automation of repetitive tasks; (3) The continuous improvement of platforms. Another way to see the quantifiable benefits the SRE can deliver, could be measured via standard ITIL metrics, such as: MTTR, MTBF, etc... Optimized metrics are perceived in a variety of ways: by reducing the impact of incidents, by designing systems that are inherently resilient, by encouraging fast feedbacks to developers early during the SDLC pipeline, by reducing the dependencies among software components, by actively monitoring the systems, by encouraging rapid iterations, by always taking in considerations failure during the design (design for failure), by reducing repetitive issues resolution requests (a.k.a.: continuous improvement). All these points can be carried out independently of a dedicated account, but there are specific aspects non-addressable without an autonomous governance. Such aspects are: (1) optimization of costs across different accounts and across different platforms, e.g. by leveraging on a common service to implement the same functionality; (2) the reduction of "toils" associated to tasks and services that cannot be handled right now for security reasons (e.g.: creation of accounts via scripts); (3) Reducing the total costs of incidents.
- __Innovation__. The possibility to have immediate access to all the new services provided by the Cloud Provider, either in "preview" or as soon as they become "general available" is an important vehicle to provide innovation. Which easily can be translated into quantifiable benefits in terms of: (1) improved efficiency to build new services and / or (2) incremented value of the solution. Therefore, we can estimate a financial impact in terms of a percentage of the overall value of the foreseen new cloud platforms.

##Shared Service
- CI/CD (DevOps stack)
- Confluence + Jira (Issue tracking, time tracking, Wiki, ecc...)
- Monitoring (ELK, Graphana, Prometheus)
- CDC (p.e. Striim, Attunity, ...)
- Data Virtualization (p.e. Denodo)
- Low Code vs CMS (sviluppo applicazioni web rapide)
- Strumento di Data Governance (p.e. Apache Atlas vs Collibra)

##Journey to the cloud
- Stiamo declinando la nostra strategia del journey to the cloud in due percorsi paralleli.

- Un primo percorso riguarda la realizzazione di piattaforme dati completamente cloud-native che ambiscano ad iniziare a veicolare un cambiamento culturale nell’approccio ai dati a livello aziendale, più agile e aperto, e che prediliga una modalità di analisi self-service da parte del business (quello che viene chiamato DataOps)

- Un secondo percorso riguarda invece un approccio più “opportunistico”, in cui la migrazione al cloud viene vista come uno strumento significativo per migliorare l’efficienza delle attuali soluzioni esistenti (migrazioni infrastrutturali) oppure l’acquisizione di nuove soluzioni (migrazioni a servizio). Non ritenendo infatti sostenibile una migrazione complessiva delle attuali infrastrutture e degli attuali servizi (per ovvi motivi di capacity, investimento e rischi correlati), questo approccio ci permetterà a nostro avviso, di ottenere ugualmente su ambiti selezionati i vantaggi elevati che il cloud offre, naturalmente valutando caso per caso.

- Nell’ambito del primo percorso, già a partire dall’anno scorso, abbiamo avviato l’implementazione di alcune piattaforme:
    + Una cloud data platform dedicata all’ambito finance, con l’obbiettivo di raccogliere, analizzare e gestire i dati di ambito CFO (p.e., accounting) e fornire strumenti analitici avanzati di business intelligence e reporting.
    + Una cloud data platform (attualmente in partenza), rivolta all’ambito sales (GIP), con l’obbiettivo di costituire un’infrastruttura unica nel contesto strategico di un CRM multi-boutique e quindi in grado di ospitare flessibilmente servizi di integrazione dati, big data analytics, reporting, distributed computing, ecc…

- Stiamo inoltre lavorando per strutturare ed organizzare un team che supporti un nuovo modello operativo e di governance del cloud, improntato a moderne linee guida ingegneristiche. Questo nell’ottica di garantire massima affidabilità ai servizi che intendiamo proporre.

- Stiamo infine analizzando pro e contro di un’internalizzazione completa della gestione del modello operativo e di governance dei servizi del cloud pubblico (un “nostro cloud” Generali Investment), con lo scopo di: 
    + aumentare l’efficienza economica,
    + ridurre il time-to-market,
    + ampliare lo spettro di servizi disponibili,
    + progettare e realizzare servizi “shared” ad alto valore aggiunto.

- Nell’ambito del secondo percorso, a partire già dall’anno scorso, stiamo lavorando ad alcuni business case per la migrazione di servizi esistenti su Cloud pubblici (Master Data Management e SimCorp, su tutti) e fornendo supporto al business per la valutazione tecnica di soluzioni cloud in modalità SaaS (p.e. relativamente all’ambito dei motori finanziari per la valutazione del pricing degli asset in portafoglio).

##Economics
- Numero di giornate esterne di supporto: 250gg (600€)
- Numero di giornate esterne di supporto GSS: (~30% supporto esterno): 80gg
- Costi di licenze di terze parti: 20k€

---

## Economics sul SoW

- 2020 – 179.080,00 eur
- 2021 – 268.620,00 eur
- 2022 – 89.540,00 eur

