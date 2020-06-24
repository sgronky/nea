---
title: "Intellimatch"
date: "2019-04-03"
slug: "intellimatch"
tags: ["data-management", "project"]
---

#Intellimatch

## Note per l'aggiornamento
- Una nuova installazione è possibile con il pacchetto fornito  
- L'elenco dei pre-requisiti è abbastanza dettagliato e si tratta di pochi   tool (è molto più complesso l'aggiornamento).  
- Le versioni dei DB e dei S.O. supportati sono indicati nel documento.  
- Lo schema del database andrà aggiornato, per cui non è possibile eseguire l'aggiornamento e continuare ad avere contemporaneamente la versione precedente senza installare effettivamente un nuovo database. Viceversa, installando un nuovo DB è possibile procedere ad eseguire il restore del template del database della versione 9.2.6 ed eseguire l'upgrade alla versione 2018 Q4.  
- Occorre verificare se il loadbalancer software è attualmente utilizzato.