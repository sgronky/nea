---
title: "Trading Desk Tool"
date: "2020-05-03"
slug: "trasing-desk-tool"
tags: ["enterprise-architecture", "project"]
---

## Requisiti
- Forex Forward  
- Opzioni non listate  
  
Descrizione del titolo -> Potrebbero essere in comune fra SimCorp e Sofia?  
  
Elenco delle viste:  
- Azioni ed ETF  
- Fix Income  
- Currencies  
- Other 
  
TipoTitolo (tipo asset Sofia) > Tipo operazione > ISIN  
La data deve essere Data Valuta  
  
Per i portafogli basta l'id del portafoglio  

Codice Sofia  
Quantità Residua  

## Mapping SimCorp - Sofia

|Sofia|SimCorp|
|--|--|
|Order Number|
|User|
|Transaction Type|
|Cncy|
|Value Date|
|Option End Date|
|Max Quantity|
|Residual Quantity|
|Not executed Quantity|
|Total Executed Quantity|
|ISIN Code|
|Security Name|
|Sofia Asset Kind|
|Company|
|Ptf N.|
|Portfolio|
|Order Exp date|


## Abilitazioni Firewall verso Sofia
host sorgenti (ved. sotto): instasp01, instasp02
host destinazione: d3sofiactv02, d3sofiatv02
porta: 8090

## Infrastruttura InSite
Dovrebbe trattarsi della stessa infrastruttura di Cognos (IBM Power E850C) con Farm VMWare esistente (HP DL380 G9). Le macchine hanno già un NAS montato e condiviso. Gli host sono:

- instasp01, instasp02 (con DR a Padova).
- Certificazione: instasx01, instasx02

__URL__: [https://insitecert2.generali.com/tradingdesk/](https://insitecert2.generali.com/tradingdesk/)

__API__: [https://insitecert2.generali.com/tdt/api/testing/sofia](https://insitecert2.generali.com/tdt/api/testing/sofia)

## Utenza InSite dedicata a SimCorp
“Corpgen\MS1-INSITE-Transfer”  -  User to send data to INSITE servers    - PWD: tyZ/&67@@00456 -  member of GIE PROD and PPROD users

## Directory per i file plink
-  \\MS1-PreProd.corp.generali.net\DATA\GIE\TEST\DataArea\Interfaces\Scripts\Bat
-  \\MS1-PreProd.corp.generali.net\DATA\GIE\UAT\DataArea\Interfaces\Scripts\Bat
-  \\MS1-PreProd.corp.generali.net\DATA\GIE\UAT2\DataArea\Interfaces\Scripts\Bat
-  \\MS1-PreProd.corp.generali.net\DATA\GIE\UATGIE\DataArea\Interfaces\Scripts\Bat
-  \\MS1-Perf\DATA-PERF\PERF\DataArea\Interfaces\Scripts\Bat
-  \\MS1-Prod.corp.generali.net\DATA\GIE\MAINT\DataArea\Interfaces\Scripts\Bat

## Directory per la scrittura dei file da SimCorp
/data/trading-desk/simcorp

## Informazioni sul servizio REST Sofia
Al momento l'API prevede un'unica richiesta, che è quella che fornisce i dati desiderati, senza la possibilità di specificare alcun parametro.
Il risultato sarà un oggetto in formato JSON con i seguenti campi:
- fields
- orders
- serverDT

__"fields"__
Poiché nelle tabelle SimCorp Sofia la descrizione delle colonne può variare di versione in versione, ad ogni colonna sarà associato un codice invariabile. "fields" è un oggetto che ha come campi questi codici e come valore del campo la descrizione in Inglese della colonna associata.

__"orders"__
E' un array ogni elemento del quale si riferisce ad un ordine aperto. Ogni elemento è un oggetto avente come campi le colonne richieste nelle specifiche originali.

__"serverDT"__
Si tratta della data e ora in fuso orario UTC del momento in cui è stata generata la risposta.

L'API sarà protetta da Basic Authentication (https://tools.ietf.org/html/rfc7617). Nome utente e password saranno slegati dalle autorizzazioni SimCorp Sofia, saranno parte della configurazione del servizio e saranno comunicati ad installazione completata.

L'API sarà esposta ai seguenti indirizzi:
- [pre-production](http://d3sofiactv02:8090/api/orders)
- [production](http://d3sofiatv02:8090/api/orders)

__Esempio di output__
```json
{
   "fields":{
      "c227":"Security Name",
      "c25502":"Order Number",
      "c25506":"Transaction type",
      "c25511":"Order Expiry Date",
      "c25516":"Value Date",
      "c25517":"Currency",
      "c25602":"Max Quantity",
      "c25653":"User (input)",
      "c25655":"Company",
      "c25668":"Total Executed Quantity",
      "c25669":"Not Executed Quantity",
      "c25670":"Residual Quantity",
      "c25672":"Portfolio",
      "c25695":"Sofia asset kind",
      "c25726":"Option End Date",
      "c25727":"Portfolio (Code)",
      "c288":"ISIN Code"
   },
   "orders":[
      {
         "c227":"AUD /EURO (Spot)",
         "c25502":495637,
         "c25506":"Sell Currency(Spot)",
         "c25511":"2020-03-03",
         "c25516":"2014-01-24",
         "c25517":"AUD",
         "c25602":1000000,
         "c25653":"FIORINIS",
         "c25655":"GIE Generali Investments Europe SGR SpA",
         "c25668":500000,
         "c25669":0,
         "c25670":500000,
         "c25672":"GIE GI FOCUS OBBLIGAZIONARIO",
         "c25695":"Spot Currency",
         "c25726":"0000-00-00",
         "c25727":96,
         "c288":""
      },
      {
         "c227":"AUD /EURO (Spot)",
         "c25502":495637,
         "c25506":"Sell Currency(Spot)",
         "c25511":"2020-03-03",
         "c25516":"2014-01-24",
         "c25517":"AUD",
         "c25602":4000000,
         "c25653":"FIORINIS",
         "c25655":"GIE Generali Investments Europe SGR SpA",
         "c25668":2000000,
         "c25669":0,
         "c25670":2000000,
         "c25672":"GIE ALTO INTL OBBLIGAZIONAR",
         "c25695":"Spot Currency",
         "c25726":"0000-00-00",
         "c25727":1958,
         "c288":""
      }
   ],
   "serverDT":"2019-02-07T17:24:05Z"
}
```

Il servizio è disponibile in preproduzione all’indirizzo
[http://d3sofiactv02:8090/api/orders](http://d3sofiactv02:8090/api/orders)
__Username__: SUPER
__Password__: ORDERS

Il servizio è disponibile in produzione all’indirizzo
[http://d3sofiatv02:8090/api/orders](http://d3sofiactv02:8090/api/orders)
__Username__: SUPER
__Password__: S!mC0rp2019

## Coda Spazio Sofia - InSite
d3sofiactv02 -> instasx01,instasx02
d3sofiatv02 -> instasp01, instasp02
Utenza: Corpgen\MS1-INSITE-Transfer - Member of GIE PROD and PPROD users
Destinazione: /data/trading-desk/simcorp

## Verifiche della soluzione
x Verificare che sia stato aggiunto il layer di spiegazioni  
x Verificare che l'aggregazione funzioni solo sui due sistemi GIAM e GIP per Sofia e SimCorp  
x Verificare che l'algoritmo di allocazione funzioni
x Validare il form per l'algoritmo di allocazione
x Validare l'export del file -> il file viene esportato ma il risultato non è comprensibile (e' un CSV? Se sì, il formato non torna)
x Verificare il meccanismo di refresh client e Back-End  
x Aggiornamento anche delle anagrafiche con avviso
x Ordinamento basato su ISIN con ISIN sovrapposti per primi
x Modificare il formato del file di uscita per uniformarlo al template inviato da Biloslavo
x Verificare che il messaggio di caricamento compaia ogni minuto (sembra comparire ogni pochi secondi)
x Verificare che l'export riporti effettivamente tutti i dati selezionati (sembra riportarne solo pochi)
x Verificare che gli importi siano visualizzati sul file SimCorp
x Verificare che venga risolto il problema di accesso alla pagina con autenticazione
x Verificare risoluzione problema di integrazione con Sofia
x Verificare che la calcolatrice compaia solo nei casi di aggregazione
x Correggere il tutorial (c'è un "that" in più nel primo messaggio) e aggiungere una parte anche per l'export e per il calcolo se possibile
x Correggere l'errore che si verifica al click del pulsante di export
x Verificare che tutti i testi siano in inglese
x Verificare funzionamento e allineamento dei tutorial
x Verificare che venga visualizzato un messaggio di errore in caso di mancato caricamento del file (p.e. una label rossa)
x Verificare che non venga richiesta la password all'accesso
x Verificare che non venga richiesta la password all'accesso su Chrome
x Verificare che su IE vengano risolti i problemi di visualizzazione
x Aggiungere la modalità di aggregazione manuale
x Fare in modo che venga gestita la multiorder (devono comparire i differenti ordini nella colonna opportuna)
x Fare in modo che ordini corrispondenti vengano aggregati anche qualora l'ISIN non sia presente
x Verificare che in caso di filtro non venga lasciato uno spazio vuoto corrispondenti a tutti gli ordini nascosti
x Verificare che la regressione relativa all'ordinamento delle righe quando si verifica una sovrapposizione di ISIN sia risolta
x Verificare che i valori di SimCorp non vengano raddoppiati
x Modificare i colori delle sottointestazioni delle tabelle (o cambiare in bianco il font, oppure cambiare il colore di sfondo)
x Rimuovere il codice esadecimale come ISIN
x Nel caso in cui l'anagrafica non sia fornita, occorre che venga mostrato 1 e non 0
x Occorre disabilitare il simbolo della divisa dalle quantità e dalla calcolatrice
- Sostituire la chiamata WGET dal codice con l'utilizzo di un HTTPClient
- Modificare la modalità di aggregazione manuale per renderla più usabile
