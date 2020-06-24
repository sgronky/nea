---
title: "Regulus Cloud OLAP Engine"
date: "2020-03-20"
slug: "regulus-cloud-olap-engine"
tags: ["cloud", "project"]
---

## Dati da trasferire in cloud
- Giornalmente circa 8 tabelle GP da caricare + le tabelle di profilazione.  
- Le tabelle di profilazione non destano preoccupazione (sono pochi MB).  
- Ciascuna GP invece cuba all’incirca 5.4GB (già compressa) -> 45GB di upload giornaliero verso il cloud.  
- Mensilmente potremmo avere anche le altre tabelle GPRISK,GPSTRESS etc. e diciamo che potremmo in quel giorno raddoppiare il carico (90GB).

## Numero di utenti e accessi
- Il numero di utenti censiti per il navigatore sono ad oggi 392. 
- Purtroppo non abbiamo a disposizione informazioni sugli effettivi accessi e statistiche sulla loro navigazione e non so dove si possono reperire.  

## Soluzioni dei Vendor:
### FIS: Adaptiv
- Infrastruttura Windows (Data Lake, SQL Server, Redis, RabbitMQ, SignalR)
- Soluzione Cloud basata su IaaS
- Richiede che i cubi da utilizzare vengano definiti a priori
- Non fornisce indicazioni circa i livelli di servizio garantiti
- Al contrario, stabilisce il costo sulla base degli utenti concorrenti richiesti, numero di location, volumi, schemi, ...
- Ha una licenza base su 5 anni
- La proposta comprende sia i costi di licenza che i costi di gestione del servizio

### SAS: Visual Analytics
- Strumento di self-service analytics in memory
- SAS Viya (in-memory analytic engine)
- Installato in cloud su IaaS
- Numero di server elevato (12 Worker ben carrozzati)
- Licenza basata su numero di core
- SAS Support Service centralizzato
- Post go-live service a pagamento
- Livelli di servizio indicati

### IBM: Planning Analytics
- In-memory real-time database e calculation engine
- IBM Planning Analytic Workspace, un'interfaccia web configurabile (stile Cognos)
- Possibilità di integrazione con excel
- Cloud IBM (SaaS)
- Hardware IBM 
- Fase 1 con il cubo su 300 viste
- Fase 2 con le serie temporali
- Flat files per l'ingestion dei dati
- L'architettura è basata sull'in-memory db + application server websphere
- Numero dimensioni massime in un cubo?

### Prodigy: AgrEGG
- Piattaforma di BI
- Utilizzato da Generali Italia
- Installazione su AWS
- Infra-as-Code per la costruzione degli ambienti
- Classica two-tier architecture
- Le funzionalità attuali non coprono tutte le richieste ma le nuove funzionalità saranno sviluppate durante il progetto
- Rilascio a fine 2020
