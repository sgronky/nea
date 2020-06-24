---
title: "Eleuthera"
date: "2020-01-20"
slug: "eleuthera"
tags: ["cloud","project"]
---

## Technical requirements of Cloud Solution
__Data Flow__:
- A customized version of the current Regulus SAS module acts on the input data to extract all the input information regarding configuration, scenario’s definition and reference data
- The files are then uploaded to s3 in SFTP through AWS SFTP Transfer
- On data changed, a lambda function is triggered to call the proper API function on Numerix so to get started with the calculation (the calculation settings are fed along the input data)
- Once the results have been produced, OneView exports a result file to s3
- Spazio receives results of AWS whenever a new file is produced

__General Characteristics & Settings__:
- 2 Availability Zones in Frankfurt Region
- 2 Environments: Prod & Cert
- Max 20% of time daily consumed on calculation
- Occasionally and temporary increase in resource demand may occur during the year

__Temporary environments side-by-side__:
- several versions of the engine's library must be allowed at the same time
- the environment should be considered temporary

__Storage__:
- A full archive of the scenarios that have run
- Input and output files must be stored on s3 buckets, organized and structured in a hierarchical way so that versions of the library (for side-by-side runs of different OneView versions), users (to separate access grants at user level) and runs (to identify the different scenarios) can be recognized.
- Archiviation policies and life cycle policies still to be discussed. But 5 years should be fine and compliant

__Authentication and Authorization__:
- Federation must be supported with SAML2 and/or OAuth in order to allow for user's indentification and groups membership without providing credentials
- Users and groups to role mapping allowed in order to centralize the membership and authorization access to web interface
- Administration roles supported

__Scaling__:
- Automatic scaling must be supported so to handle occasionally peak load
- Dynamic scaling must allow for scaling-up and scaling-down

__DevOps__:
- A DevOps model is a nice-to-have, especially for infra-as-code
- Automatic testing and grants of performance and functionalities before releases occur

__Integration__:
- Rest Apis exposed is a nice-to-have

__Documentation__:
- Online documentation is a nice-to-have

__Operations__:
- The administration console should allow for a fine-grained control of the load handled by the engine, the peaks, etc...
- It should be possible to receive some reports regarding accesses, volumes, execution times, etc... or otherwise it should be possibile to retrieve the same information by using the administrative console

__IT Audit__:
- It should be possibile to collect trace logs related to usage, accesses, etc...
- It should be possibile to have access to the data center according to current rules applicable from the regulator (e.g. Mifid 2)

## Proposal Evaluation: FIS
__Remarks__:
- The cloud solution is not fully indicated. Many options are presented and must be agreed upon. In case of FIS cloud, we should consider inclusions/exclusions, audit and access rights, security of data and systems, accountability, notifications and right to exit the contract. In case of public clouds, many of these aspects are already publicly available, but we should take care of the aspects related to the sub-outsourcing (e.g., the access rights).
- In case of public cloud adoption, service management aspects must be clarified (especially operations aspects).
- Service levels are not fully indicated. Accessibility, availability, integrity, confidentiality, privacy and safety of relevant data, business continuity and data breach notification must be clearly indicated.
- Also, we should request to identify performance standards.
- Exit strategy must be agreed upon.
- The Software Life-cycle management process must be clearly identified.

## Proposal Evaluation: Numerix
__Remarks__:
- As per Numerix offering, the proposed service level does not cover all operations aspects related to the numerix software and the necessary business support.