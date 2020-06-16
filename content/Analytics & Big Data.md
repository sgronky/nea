---
title: "Analytics & Big Data"
date: "2017-08-21"
slug: "analytics-and-big-data"
tags: ['article','cloud']
---

## Apache Spark
__Apache Spark__ is a distributed processing framework and programming model that helps you do machine learning, stream processing, or graph analytics using Amazon EMR clusters. Similar to Apache Hadoop, Spark is an open-source, distributed processing system commonly used for big data workloads. However, Spark has several notable differences from Hadoop MapReduce. Spark has an optimized directed acyclic graph (DAG) execution engine and actively caches data in-memory, which can boost performance, especially for certain algorithms and interactive queries.

Spark natively supports applications written in Scala, Python, and Java. It also includes several tightly integrated libraries for SQL (Spark SQL), machine learning (MLlib), stream processing (Spark Streaming), and graph processing (GraphX). These tools make it easier to leverage the Spark framework for a wide variety of use cases.

You can install Spark on an EMR cluster along with other Hadoop applications, and it can also leverage the EMR file system (EMRFS) to directly access data in Amazon S3. Hive is also integrated with Spark so that you can use a HiveContext object to run Hive scripts using Spark. A Hive context is included in the spark-shell as sqlContext.

## Ganglia
The __Ganglia__ open source project is a scalable, distributed system designed to monitor clusters and grids while minimizing the impact on their performance. When you enable Ganglia on your cluster, you can generate reports and view the performance of the cluster as a whole, as well as inspect the performance of individual node instances. Ganglia is also configured to ingest and visualize Hadoop and Spark metrics. For more information about the Ganglia open-source project, go to [http://ganglia.info/](http://ganglia.info/)

When you view the Ganglia web UI in a browser, you see an overview of the cluster’s performance, with graphs detailing the load, memory usage, CPU utilization, and network traffic of the cluster. Below the cluster statistics are graphs for each individual server in the cluster.

## HBase
__HBase__ is an open source, non-relational, distributed database developed as part of the Apache Software Foundation's Hadoop project. HBase runs on top of Hadoop Distributed File System (HDFS) to provide non-relational database capabilities for the Hadoop ecosystem. HBase is included with Amazon EMR release version 4.6.0 and later.

HBase works seamlessly with Hadoop, sharing its file system and serving as a direct input and output to the MapReduce framework and execution engine. HBase also integrates with Apache Hive, enabling SQL-like queries over HBase tables, joins with Hive-based tables, and support for Java Database Connectivity (JDBC). For more information about HBase, see Apache HBase and HBase documentation on the Apache website. For an example of how to use HBase with Hive, see the AWS Big Data Blog post Combine NoSQL and Massively Parallel Analytics Using Apache HBase and Apache Hive on Amazon EMR.

## Hive
__Hive__ is an open-source, data warehouse, and analytic package that runs on top of a Hadoop cluster. Hive scripts use an SQL-like language called Hive QL (query language) that abstracts programming models and supports typical data warehouse interactions. Hive enables you to avoid the complexities of writing Tez jobs based on directed acyclic graphs (DAGs) or MapReduce programs in a lower level computer language, such as Java.

Hive extends the SQL paradigm by including serialization formats. You can also customize query processing by creating table schema that match your data, without touching the data itself. In contrast to SQL (which only supports primitive value types such as dates, numbers, and strings), values in Hive tables are structured elements, such as JSON objects, any user-defined data type, or any function written in Java.

## Hue
__Hue__ (Hadoop User Experience) is an open-source, web-based, graphical user interface for use with Amazon EMR and Apache Hadoop. Hue groups together several different Hadoop ecosystem projects into a configurable interface. Amazon EMR has also added customizations specific to Hue in Amazon EMR. Hue acts as a front-end for applications that run on your cluster, allowing you to interact with applications using an interface that may be more familiar or user-friendly. The applications in Hue, such as the Hive and Pig editors, replace the need to log in to the cluster to run scripts interactively using each application's respective shell. After a cluster launches, you might interact entirely with applications using Hue or a similar interface.

## Livy
__Livy__ enables interaction over a REST interface with an EMR cluster running Spark. You can use the REST interface or an RPC client library to submit Spark jobs or snippets of Spark code, retrieve results synchronously or asynchronously, and manage Spark Context. For more information, see the Apache Livy website. Livy is included in Amazon EMR release version 5.9.0 and later.

## Mahout
Amazon EMR supports __Apache Mahout__, a machine learning framework for Apache Hadoop. For more information about Mahout, go to http://mahout.apache.org/.

Mahout is a machine learning library with tools for clustering, classification, and several types of recommenders, including tools to calculate most-similar items or build item recommendations for users. Mahout employs the Hadoop framework to distribute calculations across a cluster, and now includes additional work distribution methods, including Spark.

For more information and an example of how to use Mahout with Amazon EMR, see the Building a Recommender with Apache Mahout on Amazon EMR post on the AWS Big Data blog.

## MXNet
__Apache MXNet__ is an acceleration library designed for building neural networks and other deep learning applications. MXNet automates common work flows and optimizes numerical computations. MXNet helps you design neural network architectures without having to focus on implementing low-level computations, such as linear algebra operations. MXNet is included with Amazon EMR release version 5.10.0 and later.

## Oozie
Use the __Apache Oozie Workflow Scheduler__ to manage and coordinate Hadoop jobs. For more information, see [http://oozie.apache.org/](http://oozie.apache.org/).

The Oozie native web interface is not supported on Amazon EMR. To use a front-end interface for Oozie, try the Hue Oozie application. For more information, see Hue. Oozie is included with Amazon EMR release version 5.0.0 and later.

## Phoenix
__Apache Phoenix__ is used for OLTP and operational analytics, allowing you to use standard SQL queries and JDBC APIs to work with an Apache HBase backing store. For more information, see Phoenix in 15 minutes or less. Phoenix is included in Amazon EMR release version 4.7.0 and later.

## Pig
__Apache Pig__ is an open-source Apache library that runs on top of Hadoop, providing a scripting language that you can use to transform large data sets without having to write complex code in a lower level computer language like Java. The library takes SQL-like commands written in a language called Pig Latin and converts those commands into Tez jobs based on directed acyclic graphs (DAGs) or MapReduce programs. Pig works with structured and unstructured data in a variety of formats. For more information about Pig, see [http://pig.apache.org/](http://pig.apache.org/).

You can execute Pig commands interactively or in batch mode. To use Pig interactively, create an SSH connection to the master node and submit commands using the Grunt shell. To use Pig in batch mode, write your Pig scripts, upload them to Amazon S3, and submit them as cluster steps. For more information on submitting work to a cluster, see Submit Work to a Cluster in the Amazon EMR Management Guide.

## Presto
__Presto__ is a fast SQL query engine designed for interactive analytic queries over large datasets from multiple sources. For more information, see the Presto website. Presto is included in Amazon EMR release version 5.0.0 and later. Earlier release versions include Presto as a sandbox application. For more information, see Amazon EMR 4.x Release Versions.

The following table lists the version of Presto included in the latest release of Amazon EMR, along with the components that Amazon EMR installs with Presto.

## Tez
__Apache Tez__ is a framework for creating a complex directed acyclic graph (DAG) of tasks for processing data. In some cases, it is used as an alternative to Hadoop MapReduce. For example, Pig and Hive workflows can run using Hadoop MapReduce or they can use Tez as an execution engine

## Zeppelin
Use __Apache Zeppelin__ as a notebook for interactive data exploration. For more information about Zeppelin, see [https://zeppelin.apache.org/](https://zeppelin.apache.org/). Zeppelin is included in Amazon EMR release version 5.0.0 and later. Earlier release versions include Zeppelin as a sandbox application. For more information, see Amazon EMR 4.x Release Versions.

To access the Zeppelin web interface, set up an SSH tunnel to the master node and a proxy connection. For more information, see View Web Interfaces Hosted on EMR Clusters. 

## Sqoop
__Apache Sqoop__ is a tool for transferring data between Amazon S3, Hadoop, HDFS, and RDBMS databases. For more information, see the Apache Sqoop website. Sqoop is included in Amazon EMR release version 5.0.0 and later. Earlier release versions include Sqoop as a sandbox application. For more information, see Amazon EMR 4.x Release Versions.

## Apache Atlas
__Apache Atlas__ is the one-stop solution for data governance and metadata management on enterprise Hadoop clusters. Atlas has a scalable and extensible architecture which can plug into many Hadoop components to manage their metadata in a central repository. In this blog, we are going to look on one such data discovery and classification tool i.e Apache Atlas. For further use, we will be using Apache Atlas on Amazon EMR. 

### 1. Centralised Metadata Store
Atlas provides true visibility in Hadoop. By using the native connector to Hadoop components, Atlas provides technical and operational tracking enriched by business taxonomical metadata. Atlas facilitates easy exchange of metadata by enabling any metadata consumer to share a common metadata store that facilitates interoperability across many metadata producers

### 2. Data Classification
Ability to dynamically create classifications — like pii, expires_on, data_quality. Classifications can include attributes — like an expiry_date attribute in EXPIRES_ON classification. Entities can be associated with multiple classifications, enabling easier discovery and security enforcement. Propagation of classifications via lineage — automatically ensures that classifications follow the data as it goes through various processing.

### 3. Data lifecycle Management
It leverages existing investment in Apache Falcon with a focus on provenance, multi-cluster replication, data set retention and eviction, late data handling, and automation.

### 4. Centralised Security
Fine-grained security for metadata access, enabling controls on access to entity instances and operations like add/update/to remove classifications. Integration with Apache Ranger enables authorization/data-masking on data access based on classifications associated with entities in Apache Atlas. Integration with HDP security that enables you to establish global security policies based on data classifications and that leverages Apache Ranger plug-in architecture for security policy enforcement.




---

## Domande tecniche per gli sviluppatori
- Che cos'è Spark
- Che cos'è un driver?
- Che cos'è YARN? Meglio YARN o Mesos?
- Che cos'è un DataFrame? Qual è la differenza con un DataFrame in Python o R?
- Che differenza c'è fra Transformation e Action?
- Cos'è un file Parquet?
- Perché useresti RDD invece di un DF?
- Che cos'è Glue e come funziona a grandi linee?
- Qual è la differenza fra EMRFS e HDFS?


---

## Big Data Architect
The Globals Professional Services Team is looking for a Big Data Architect / Consultant who is interested in:
Designing enterprise scale, globally distributed, highly available solutions using our Compute, Container, Serverless, Storage, Analytics, Database and Network Services
Work hands-on with new Services, including AI/Machine Learning, Serverless/Lambda IoT, Analytics (Map Reduce, ETL), Data Warehouse, BI and Security Services to build products and solutions with our Customers
Structure and Guide our Customers through their Journey and Transformation
Deliver on-site technical engagements with partners and customers. This includes participating in pre-sales on-site visits, understanding customer requirements, creating consulting proposals and creating packaged Big Data service offerings and delivering them as part of our projects
Engage as part of our Globals Professional Services Community to learn and share you expertise
We offer a versatile team, an open feedback culture, and a high pace of innovation. Take the chance and join us to Work Hard. Have Fun. Make History.

### Basic Qualifications
3+ years hands on experience in IT implementation or leading IT Projects in Architecture, (Data-)Engineering, or Development
Demonstrated industry leadership in the fields of database, Big Data, data warehousing or data sciences.
Deep understanding an implementation experience of database and analytical technologies in the industry including Data Lakes. Stream based Analytics, MPP databases, NoSQL storage, Data Warehouse design, BI reporting and Dashboard development
Worked in a customer facing (external or internal), consulting role or project organization for global large-scale customers and large scale data driven projects
Business fluent verbal and written communication skills in English

### Preferred Qualifications
AWS Certified Solutions Architecture (Associate or Professional), or other specialty
Experience implementing services and solutions on Customer Projects using AWS Big Data, Analytics, AI /ML or Data Science solutions
Hands on experience leading large-scale global data warehousing and analytics projects.
Experience designing and coding in Python or Scala or building ETL or data ingestion pipelines
Business fluent verbal and written communication skills in German

---

Job Run 1: In this job run we show how to find if there are under-provisioned DPUs in the cluster. The job execution functionality in AWS Glue shows the total number of actively running executors, the number of completed stages, and the number of maximum needed executors.

The number of maximum needed executors is computed by adding the total number of running tasks and pending tasks, and dividing by the tasks per executor. This result is a measure of the total number of executors required to satisfy the current load.

---

## Big Data Architect Interview
>Points: 1-5

### Struttura del colloquio:
- Presentazione del candidato
- Presentazione della struttura, del gruppo
- Inquadramento del ruolo
- Domande

### Questions__:  
1. A company's data needs are constantly changing and improving maintenance and accessibility of data is an ongoing process. Describe a time when you made changes to a company's data management systems and the impact the change made on the company overall.
[GDC]: 1
[AS]: 1
[ML]: 3
[LM]: 1
[AM]: 2
[SB]: 2
[SP]: 2
[FM]: 2

2. Have you been involved with the improvement of a company's existing data architecture? If so, explain your role in the process and the impact the change had on the company overall.
[GDC]: 1
[AS]: 3
[ML]: 3
[LM]: 1
[AM]: 3
[SB]: 3
[SP]: 2
[FM]: 2

3. What challenges have you faced working with others in your company who may not have a technical background? How did you overcome these challenges?
[GDC]: 1
[AS]: 1
[ML]: 1
[LM]: 2
[AM]: 3
[SB]: 3
[SP]: 3
[FM]: 2

4. An important part of your role as Data Architect will be to understand how the company's stored data is being used across the different departments. What steps have you take in past positions to understand the data needs across these various users?
[GDC]: 2
[AS]: 3
[ML]: 1
[LM]: 1
[AM]: 3
[SB]: 3
[SP]: 3
[FM]: 2

5. What modeling tools do you have experience using? Of these, which do you find the most useful or powerful?
[GDC]: 2
[AS]: 1
[ML]: 1
[LM]: 1
[AM]: 1
[SB]: 4
[SP]: 2
[FM]: 2

6. What are the key steps in Big Data Solutions? Describe a typical data pipeline
[GDC]: 1
[AS]: 3
[ML]: 3
[LM]: 2
[AM]: 4
[SB]: 4
[SP]: 4
[FM]: 4

7. What is Hadoop? What is Spark? What are the differences between the two and which one do you prefer?
[GDC]: 1
[AS]: 2
[ML]: 4
[LM]: 3
[AM]: 4
[SB]: 4
[SP]: 4
[FM]: 4

8. What is Hive? Elastic (ELK)? Zookeeper? Presto? TensorFlow? Athena? PowerBI? Cassandra? Redis? Flink? Yarn? Ganglia? Hue? Pig? Zeppelin? 
[GDC]: 3
[AS]: 2
[ML]: 4
[LM]: 2
[AM]: 3
[SB]: 3
[SP]: 4
[FM]: 4

9. What other tools do you use for effective work in Big Data Analysis?
[GDC]: 2
[AS]: 1
[ML]: 3
[LM]: 3
[AM]: 4
[SB]: 4
[SP]: 4
[FM]: 4

10. Describe your experience with DWH. Describe the architecture of a DWH.
[GDC]: 1
[AS]: 3
[ML]: 3
[LM]: 1
[AM]: 1
[SB]: 2
[SP]: 3
[FM]: 2

11. Explain in detail your experience with batch and real-time data processing.
[GDC]: 2
[AS]: 1
[ML]: 3
[LM]: 3
[AM]: 4
[SB]: 4
[SP]: 3
[FM]: 4

12. Describe any metrics you may have created or used as a Data Architect in order to measure quality and consistency of new and existing data.
[GDC]: 1
[AS]: 2
[ML]: 1
[LM]: 1
[AM]: 4
[SB]: 3
[SP]: 3
[FM]: 3

13. What is a parquet file? What is the difference with AVRO or ORC?
[GDC]: 2
[AS]: 2
[ML]: 2
[LM]: 3
[AM]: 4
[SB]: 4
[SP]: 4
[FM]: 4

14. If you had to review an existing database to identify potential improvements, where would you start?
[GDC]: 2
[AS]: 1
[ML]: 2
[LM]: 1
[AM]: 2
[SB]: 2
[SP]: 2
[FM]: 2

15. What is a Normalization? 3NF? Boyce-Codd?
[GDC]: 2
[AS]: 3
[ML]: 3
[LM]: 2
[AM]: 2
[SB]: 3
[SP]: 3
[FM]: 3

16. Which services you know on AWS about Big Data Analytics? (EMR, Glue, Redshift, RDS, ElastiCache, DMS, ...)
[GDC]: 1
[AS]: 1
[ML]: 1
[LM]: 1
[AM]: 4
[SB]: 4
[SP]: 4
[FM]: 4

17. HDFS vs EMRFS
[GDC]: 2
[AS]: 1
[ML]: 3
[LM]: 1
[AM]: 3
[SB]: 4
[SP]: 4
[FM]: 4

---

## Giorgio De Caro
- __Esperienza__: Laurea in informatica (8 anni). Ha lavorato 7 anni in un centro di ricerca di bioinformatica. Ha lavorato poi in consulenza per un anno e mezzo in NTT Data presso Sky. Si è occupato di varie attività, non solo dati. Attualmente in ENI. Nessun esperienza in ambito finance. -> 1
- __Motivazione__: Non gli piace l'ambiente di ENI e non c'è molta tecnologia. Gli piacerebbe l'ambito tecnologico. Non lo spaventa il fatto di non avere conoscienze in ambito finance. -> 2
- __Stipendio__: 40K + 3K -> 3 
- __Use Case__: 2
- __Questionario tecnico__: 1,6

## Antonio Sannino
- __Esperienza__: Laurea in informatica fatta mentre lavorava. Ha sempre lavorato in Deutsche Bank. E' arrivato in architettura più tardi. Ha fatto prima il project manager. Non una formazione specifica sui dati. Più generale sul disegno delle soluzioni. -> 2
- __Motivazione__: Fondamentalmente perché si sta perdendo la parte di gestione tecnologica verso CEDACRI. Vorrebbe rimanere sulla parte dati. -> 2
- __Stipendio__: 58k + 4k -> 1
- __Use Case__: 2
- __Questionario tecnico__: 1,8

## Mario Leone
- __Esperienza__: Laurea in informatica. Esperienza in finanza. Sempre lavorato in HP (DXC). Sostanzialmente lavora in una struttura di prevendita. Difficile fargli cambiare idea. -> 2
- __Motivazione__: Vorrebbe fare di più l'architetto, ma non accetta di lavorare sul fronte tecnico. Vorrebbe fare più strategia e difficilmente accetta una soluzione proposta -> 1
- __Stipendio__: 45k-55k -> 2
- __Use Case__: 2
- __Questionario tecnico__: 2,4

## Luca Mastrota
- __Esperienza__: Laureato in ingegneria a Torino. Ha lavorato in Vodafone all'inizio. Successivamente in Fastweb. Ha avuto a che fare con la pre-vendita, l'operations e i system integrator. -> 2
- __Motivazione__: L'abbiamo chiamato noi. -> 1
- __Stipendio__: 30 + 2k -> 4
- __Use Case__: 1
- __Questionario tecnico__: 1,7

## Alessandro Mangone
- __Esperienza__: Lavora in Data Reply con un'esperienza di 4 anni principalmente su Big Data, sia streaming che batch. -> 3
- __Motivazione__: E' attratto dal lato sperimentale e tecnologico e vorrebbe continuare a lavorare come data engineer. L'abbiamo chiamato noi ma sembra interessato. -> 2
- __Stipendio__: 39k + 5k, 7 livello Metalmeccanico -> 3
- __Use Case__: 3
- __Questionario tecnico__: 3,0

## Simone Battaglia
- __Esperienza__: Lavora in Mediaset in una sezione di Analytics all'interno del team. Ha lavorato in passato in consulenza. Non ha grande esperienza nell'ambito finanziario. Ha lavorato proprio alla definizione di un team cloud e dell'infrastruttura relativa. -> 3
- __Motivazione__: Si trova molto bene in Mediaset. Gli piacerebbe fare prima a livello di viaggio. Vorrebbe continuare a lavorare sul fronte tecnico, specialmente su tecnologie Big data. Vorrebbe un incremento di stipendio. -> 3,5
- __Stipendio__: 65k + Quadro + piano di incremento 10% annuo -> 2
- __Use Case__: 4
- __Questionario tecnico__: 3,1
- __Generali-ness__: 3

## Shoaib Patel
- __Esperienza__: Molto buona. Ha lavorato in ambiti differenti ed è stato esposto a molte tecnologie diverse. Non ha una laurea specialistica ed è sostanzialmente tecnico. Non ha esperienza di architetto e di relazione con il business. -> 3 
- __Motivazione__: Molto motivato. Viene dalla consulenza ed è relativamente giovane. Intraprendere una carriera su una realtà aziendale su un ambito finanziario non lo spaventa, ma potrebbe avere un certo impatto. Inoltre, essendo indiano, potrebbe decidere di tornare a casa fra qualche anno nonostante abbia assicurato che è qui in Italia per restare. Non parla italiano ma sta imparando. -> 2,5
- __Stipendio__: 35k -> 4
- __Use Case__: 4
- __Questionario tecnico__: 3,2 
- - __Generali-ness__: 2  

## Federico Migliavacca
- __Esperienza__: Lavora da sempre in ambito cloud. Viene da Vodafone. Buona esperienza AWS. Poca esperienza su ambito dati più tradizionale (datawarehouse, dbms, ecc...) -> 3
- __Motivazione__: L'abbiamo chiamato noi. Vorrebbe evolvere il proprio ruolo diventando architetto. Ha altre proposte. -> 3
- __Stipendio__: 43k, 6 tlc -> 3
- __Use Case__: 4
- __Questionario tecnico__: 3,1
- __Generali-ness__: 2,5  

---

## Altri profili potenziali
Federico Migliavacca 
Senior Big Data Engineer @ Vodafone
https://www.linkedin.com/in/federicomigliavacca/

Riccardo Corbella
Big Data Architect @ Vodafone
https://www.linkedin.com/in/riccardocorbella/

[Arturo Gatto] Amico di Simone Battaglia
Solution Architect Big Data & AI at ENI
https://www.linkedin.com/in/arturo-gatto-2377218a/

[Valerio Di Tinno] Junior
Data Engineer presso NTT DATA Italia
https://www.linkedin.com/in/valerio-di-tinno-980aa4104/

David Santucci
Data Engineer
https://www.linkedin.com/in/davidsantucci/

[Pierluca Serra] Junior
Data Engineer at Cuebiq
https://www.linkedin.com/in/pierlucaserra/

[Marco Didonna] Poca esperienza
Data Engineer at Cuebiq
https://www.linkedin.com/in/marcodidonna/

[Vito Cuccovillo] Sviluppatore
Data Engineer presso Cuebiq
https://www.linkedin.com/in/vitocuccovillo/

[Alessandro Celi] Junior
Big Data Engineer @ Data Reply IT
https://www.linkedin.com/in/alessandro-celi-bu7bu7/

[Franco Yang] Interessante ma data scientist
Data Scientist & Software Engineer at Accenture | Machine Learning CoE
https://www.linkedin.com/in/franco-yang-90/

Laura M. Cannas, PhD
Data Scientist | Cloud Consultant @ Google
https://www.linkedin.com/in/lauramcannas/

Alessandro Negrini
Data Engineer presso AXA Italia Servizi
https://www.linkedin.com/in/alessandro-negrini-102883a5/

---

## DataOps Principles
1. Continually satisfy your customer:
Our highest priority is to satisfy the customer through the early and continuous delivery of valuable analytic insights from a couple of minutes to weeks.

2. Value working analytics:
We believe the primary measure of data analytics performance is the degree to which insightful analytics are delivered, incorporating accurate data, atop robust frameworks and systems.

3. Embrace change:
We welcome evolving customer needs, and in fact, we embrace them to generate competitive advantage. We believe that the most efficient, effective, and agile method of communication with customers is face-to-face conversation.

4. It's a team sport:
Analytic teams will always have a variety of roles, skills, favorite tools, and titles.

5. Daily interactions:
Customers, analytic teams, and operations must work together daily throughout the project.

6. Self-organize:
We believe that the best analytic insight, algorithms, architectures, requirements, and designs emerge from self-organizing teams.

7. Reduce heroism:
As the pace and breadth of need for analytic insights ever increases, we believe analytic teams should strive to reduce heroism and create sustainable and scalable data analytic teams and processes.

8. Reflect:
Analytic teams should fine-tune their operational performance by self-reflecting, at regular intervals, on feedback provided by their customers, themselves, and operational statistics.

9. Analytics is code:
Analytic teams use a variety of individual tools to access, integrate, model, and visualize data. Fundamentally, each of these tools generates code and configuration which describes the actions taken upon data to deliver insight.

10. Orchestrate:
The beginning-to-end orchestration of data, tools, code, environments, and the analytic teams work is a key driver of analytic success.

11. Make it reproducible:
Reproducible results are required and therefore we version everything: data, low-level hardware and software configurations, and the code and configuration specific to each tool in the toolchain.

12. Disposable environments:
We believe it is important to minimize the cost for analytic team members to experiment by giving them easy to create, isolated, safe, and disposable technical environments that reflect their production environment.

13. Simplicity:
We believe that continuous attention to technical excellence and good design enhances agility; likewise simplicity--the art of maximizing the amount of work not done--is essential.

14. Analytics is manufacturing:
Analytic pipelines are analogous to lean manufacturing lines. We believe a fundamental concept of DataOps is a focus on process-thinking aimed at achieving continuous efficiencies in the manufacture of analytic insight.

15. Quality is paramount:
Analytic pipelines should be built with a foundation capable of automated detection of abnormalities (jidoka) and security issues in code, configuration, and data, and should provide continuous feedback to operators for error avoidance (poka yoke).

16. Monitor quality and performance:
Our goal is to have performance, security and quality measures that are monitored continuously to detect unexpected variation and generate operational statistics.

17. Reuse:
We believe a foundational aspect of analytic insight manufacturing efficiency is to avoid the repetition of previous work by the individual or team.

18. Improve cycle times:
We should strive to minimize the time and effort to turn a customer need into an analytic idea, create it in development, release it as a repeatable production process, and finally refactor and reuse that product.

---

## Creating a Data-driven Enterprise with DataOps
Being a data-driven company requires simultaneously undertaking three interdependent initiatives:

- __Identify, combine, and manage multiple sources of data__. You might already have all the data you need. Or you might need to be creative to find other sources for it. Either way, you need to eliminate silos of data while constantly seeking out new sources to inform your decision-making. And it’s critical to remember that when mining data for insights, demanding data from different and independent sources leads to much better decisions.
- __Build advanced analytics models for predicting and optimizing outcomes__. The most effective approach is to identify a business opportunity and determine how the model can achieve it. In other words, you don’t start with the data—at least at first—but with a problem.
- __Transform the organization and culture of the company so that data actually produces better business decisions__. Many big data initiatives fail because they aren’t in sync with a company’s day-to-day processes and decision-making habits. Data professionals must understand what decisions their business users make, and give users the tools they need to make those decisions.

> __DataOps__ is a new way of managing data that promotes communication between, and integration of, formerly siloed data, teams, and systems. It takes advantage of process change, organizational realignment, and technology to facilitate relationships between everyone who handles data: developers, data engineers, data scientists, analysts, and business users. DataOps closely connects the people who collect and prepare the data, those who analyze the data, and those who put the findings from those analyses to good business use.
