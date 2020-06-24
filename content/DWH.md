---
title: "DWH"
date: "2018-11-03"
slug: "dwh"
tags: ["data-management", "project"]
---

# DWH
## Note (Riunione del 04/04/2019)
- Lo schema dei dati arriva pre-packaged da SimCorp (primo livello)
- SimCorp definisce dei calcoli sui portafogli dal core e successivamente definisce dei Load Plan per il caricamento sul primo livello
- E' uno star schema.Al centro dello schema ci sono le posizioni (fra le dimensioni: securities, clienti, prezzi e date di analisi)
- I dati vengono inviati giornalmente
- I datamart sono stati creati da ACN e caricati tramite ODI 
- Esiste un core IMW (Investment Management Warehouse) che è la versione master di tutte le dimensioni e i fatti da importare (datamart) -> vedere Kimball modelling (non permette l'accesso agli utenti finali)
- Il package di caricamento ed elaborazione dei dati è sviluppato da SimCorp e non è modificabile
- Data Model Designer: permette di creare e manutenere i data model
- Load Monitor: permette di gestire gli ETL
