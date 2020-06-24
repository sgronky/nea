---
title: "Simcorp"
date: "2018-12-03"
slug: "simcorp"
tags: ["data-management", "project"]
---

## Communication Server

### Alcune domande:
1. E' utilizzato il communication server anche quando viene avviato un batch job group via schedulatore OpCon?
2. E' possibile eseguire un deploy automatico su Communication Server e/o su SimCorp per definire o cambiare una porta / DFS?
3. E' possibile utilizzare come porta Oracle Queue / Websphere queue?
4. E' possibile agganciare Kafka?
5. Utilizzando il Communication Server sarebbe virtualmente possibile non configurare nulla su SimCorp? (p.e. non utilizzando Bath job ma lavorando direttamente con i messaggi su coda)
6. E' possibile eseguire dei test case automaticamente? P.e. in ambiente di Continuous Build?
7. E' possibile avere un ambiente di sviluppo del solo CommunicationServer? p.e. tramite macchina virtuale?

### Note
Il CS consiste sostanzialmente di due componenti: un __mediator__ ed un __gateway__. Il mediator esegue le trasformazioni e gestisce il workflow dei messaggi. Il gateway si interfaccia con SCD eseguendo dei comandi direttamente o integrandosi p.e. con delle code (FTB e MQ). Il mediator definisce delle porte per la comunicazione con il mondo esterno. A ciascuna porta in modalità _listen_, il CS associa un thread differente (occorre quindi limitare il numero di porte in listen per non impattare negativamente le performance).

## Mediator

E' possibile utilizzare degli XSLT per le trasformazioni e aggiungere anche del codice javascript per le trasformazioni più complesse. Occorre tuttavia prestare attenzione alla dimensione del messaggio e alla sua complessità. Si raccomanda di splittare un bundle di messaggi in singoli messaggi da processare.

Anche l'interfaccia WebService è di fatto una porta. In generale, le porte sono:

- Database
- File
- FTP
- Memory
- Msmq (Microsoft Message Queue)
- Null
- Dimension
- Oraq (Oracle Advanced Queue)
- Persistence
- Sequencer
- HttpSync
- Timer
- WebHost (WebService - Listening)
- WebRequest (WebService - Client)
- Webspheremq
- Mailclient

Nel Configuration file è possibile specificare dei test case da eseguire all'interno della soluzione.

Il Mediator può essere utilizzato per integrarsi con SCD (via comandi definiti all'interno degli handler) per attivare differenti tipi di funzionalità direttamente:

- Estrarre dati utilizzando il Data Extractor
- Importando dati utilizzando il FilterToolBox e le Message Queue
- Aggiungere dei batch job ad una batch queue

## Communication Server vs Altra soluzione Middleware (p.e. ODI)

Punteggi (++, +, =, -, --)

| Caratteristica | CS | Middleware |
|--|--|--|
| Development | - | + |
| Testing & Certification | + | ++ |
| Reliability | + | - |
| Maintainability | + | - |
| Performance | - | + |
| Change | = | - |
| Integrability | ++ | + |
| Cost | - | = |
| Scalability | - | ++ |
| Near Real Time | ++ | - |
| Ops | - | + |
| CD | = | - |


## Filter Tool Box

E' il tool principale per eseguire gli import automatici su SimCorp. E' costituito dal componente DFS (Data Format Setup) e dal component BF (Base Filter). Il primo è responsabile della traduzione e trasformazione del file da un formato esterno ad un formato interno (SimCorp format). Il secondo è responsabile della trasformazione verso il formato visualizzato effettivamente nelle finestre (Windows Format). 

Altro componente essenziale è la MessageQueue, una tabella che consente di importare i singoli record. I messaggi possono essere inseriti nella coda anche a partire dal Communication Server.


## Inferface

La funzionalità relativa alle __interfacce__ consente a SimCorp di importare ed esportare dati, per esempio utilizzando differenti tipi di __filtri__ e __message queue__. 

Esistono differenti tipologie di filtri (sono sviluppate e manutenute da SimCorp):

- __Filtri standard__. 
- __Filtri definiti dall'utente__.

E' possibile inoltre importare ed esportare dati direttamente, senza utilizzare filtri.


## Applicazioni esterne
### Front Office
    - TradingScreen EMS,
    - Abel Noser, 
    - BLOOMBERG TSOX, 
    - MarketAxess, 
    - Bondvision, 
    - Tradeweb, 
    - FX GO, 
    - FX ALL, 
    - Liquidnet, 
    - FX Connect

### MOBO
    - OMGEO CTM
    - CUSTODIAN BANK (SWIFT)
    - TRIOPTIMA (TRIRESOLVE)
    - MarkitSERV
    - ACADIASOFT MARGINSHPERE

### Reporting
    - RISKMETRICS
    - SIA EAGLE

## #OMGEO CTM
The CTM platform for the central matching of cross-border and domestic transactions automates the trade confirmation process across multiple asset classes, such as equities, fixed income, repurchase agreements (repos), exchange traded derivatives and synthetic equity swaps.

The CTM solution provides seamless connectivity from trade execution to settlement, including direct connectivity via FIX from front office to middle office trade processing as well as via the SWIFT network to a full community of custodian banks for the purposes of settlement notification. And, when used in conjunction with ALERT, you can automatically enrich trades with account and standing settlement instructions (SSI), ensuring all account information is accurate.

The CTM service helps buy side firms – including investment managers, hedge funds, private banks or outsourcers – and broker/dealers to efficiently match and confirm trade details, to increase transparency and to mitigate risk. It also allows trading parties to send settlement notifications or copies for information to custodians and other third parties to achieve straight-through processing.

With the CTM workflow matching happens on both blocks and allocations/contracts. A block level workflow allows investment managers and broker/dealers to tie trades back upstream providing better parity between front and back office systems. Investment managers can submit a block and then submit allocations against the block. Broker/dealers submit a block and corresponding contracts. For matched trades the CTM platform will send status updates to both counterparties. If no match is found for a trade, an exception occurs. Each counterparty is then automatically updated on a change in the trade status and given the possibility to amend the trade. This allows to catch trade exceptions prior to settlement, saving valuable time and helping to reduce costs.


### CUSTODIAN BANK
In general, a __custodian__ is a bank or a financial institution that holds financial securities such as stocks, bonds, gold, etc.
So basically, custodians are involved in having the custody of securities/ shares. They might be some banks who are holding the securities. Such as ICICI bank in India holding shares on behalf of a customer.
So customer (say Mukesh) has 1000 shares of a company (say Realiance Industries), and those shares are held with ICICI bank. Here ICICI bank acts as a custodian of these shares/ securities

In contrast, __depositories__ are the ones who have the custody of the securities as well as also the legal ownership of those securities. Custodians __do not have legal ownership of securities__.

To understand this further, if a custodian A transfers securities to custodian B and for those securities the Depository is X, then at depository level, the total amount of securities remains same but at Custodian level, custodian A will see a reduction in number of securities while custodian B will see an increase in number of securities.


### TriResolve (TriOptima)
__triResolve__ is the leading provider of post trade reconciliation, counterparty exposure management and collateral management services for OTC derivative trades.

More than 2,050 firms around the world proactively reconcile their bilateral OTC derivative trades on the central triResolve web-based platform.
Trade data can be sent in any format, algorithmic matching is performed and counterparties work together on the same set of results.

- all asset classes
- all transaction types and structures
- all your counterparties in one place

triResolve Margin, innovates an end-to-end margin processing solution which is transparent, scalable, and efficient. Building on existing processes including triResolve portfolio reconciliation, triResolve Margin offers clients a fast, easy and out-of-the-box margin solution with complete integration to AcadiaSoft’s Hub. Automated workflow and integrated dispute resolution facilitate compliance with new margin requirements and enable firms to focus on the risk rather than the process.