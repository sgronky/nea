---
title: "DataOps"
date: "2020-05-20"
slug: "data-ops"
tags: ["data-management", "notes"]
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

## Creating a Data-driven Enterprise with DataOps
Being a data-driven company requires simultaneously undertaking three interdependent initiatives:

- __Identify, combine, and manage multiple sources of data__. You might already have all the data you need. Or you might need to be creative to find other sources for it. Either way, you need to eliminate silos of data while constantly seeking out new sources to inform your decision-making. And it’s critical to remember that when mining data for insights, demanding data from different and independent sources leads to much better decisions.
- __Build advanced analytics models for predicting and optimizing outcomes__. The most effective approach is to identify a business opportunity and determine how the model can achieve it. In other words, you don’t start with the data—at least at first—but with a problem.
- __Transform the organization and culture of the company so that data actually produces better business decisions__. Many big data initiatives fail because they aren’t in sync with a company’s day-to-day processes and decision-making habits. Data professionals must understand what decisions their business users make, and give users the tools they need to make those decisions.

__DataOps__ is a new way of managing data that promotes communication between, and integration of, formerly siloed data, teams, and systems. It takes advantage of process change, organizational realignment, and technology to facilitate relationships between everyone who handles data: developers, data engineers, data scientists, analysts, and business users. DataOps closely connects the people who collect and prepare the data, those who analyze the data, and those who put the findings from those analyses to good business use.

_(From: "DataOps and Data Democracy")_ [1](https://www-cbronline-com.cdn.ampproject.org/c/s/www.cbronline.com/opinion/dataops-data-democracy/amp/)
__DataOps__, a methodology championed by Hitachi Vantara, could be one of the clearer paths forward: it marries technological and cultural changes to improve organisation’s use of data through better data quality, shorter cycle time and superior data management – while remaining agnostic on the precise applications deployed.

DataOps is based on the understanding that large data hubs over the last 25 years (e.g., data warehouses, master data management, data lakes, Hadoop, Salesforce and ERP) have all too often resulted in more data silos that are not easily understood, related, or shared, and more crucially, simply aren’t business-focused, or accessible.


## Data & Data Infrastructure
_(From: "Creating a Data-Driven Enterprise with DataOps")_ [2](https://learning.oreilly.com/library/view/creating-a-data-driven/9781492049227/ch02.html)

A __data-driven organization__ should possess three things:
- A culture in which everyone buys into the idea of using data to make business decisions
- An organizational structure that supports a data-driven culture
- Technology that supports a data-driven culture and makes data self-service

The most important—and arguably the most difficult—aspect of transitioning to a data-driven organization that practices DataOps is the cultural shift required to move to a data mindset. This shift entails identifying and building a cultural framework that enables all the people involved in a data initiative—from the producers of the data, to the people who build the models, to the people who analyze it, to the employees who use it in their jobs—to collaborate on making data the heart of organizational decision-making. Though the technology that makes this collaboration and data access easy is very important, it is just one of the considerations. A key focus area in this transition are the employees and the organization.

This kind of inquisitive culture should drive everyone on the data team—including IT, data engineers, data scientists, and data analysts—to continually enhance and refine the tools that business users need to inform their decisions. Because data is accessed and used a lot in this type of environment, the organization should encourage and deploy people, processes, and technologies that minimize barriers to this access.

A key driver to enable a data culture is to make it easy for the data team to capture all of the data in the organization. An enterprise has a plethora of data sources, both internal and external. These systems are set up for operational reasons, with collecting data for analytics being an afterthought. As a result, the natural tendency is to not capture any of this data, far less consolidating it in one place. The valuable data from all of these sources, therefore, continues to remain in its silo. In the process, the organization loses many opportunities of deriving insights or optimizations by putting data from different sources together.

The first step toward overcoming this challenge is to take an inventory of all your data sources and create a __common data-capture infrastructure__ that is standard across the company and that lays out the correct way to capture and log the data. Everyone should use those standards. The next step is to consolidate all of the data so that all consumers of data in the organization know where to go to find it.

The executive team also will benefit from standardized and centralized data. Top people in the company typically don’t have enough time, or the skills, to analyze data themselves. Yet they need data to inform their decisions, perhaps more than anyone else in the company. So, it makes sense to build business dashboards so that the executive team can access the data in a timely and self-service manner. 

Organizationally, how do you support a data-driven company? In most successful data-driven organizations there is a __central data team__ that publishes data and manages the infrastructure used to publish that data, making sure that there is a single source of truth that underpins the analyses. A strong, functional, central data team is extremely important in creating connectivity between the different departments of an organization.


## Infrastructure and Cloud Data Platform to Make Data Self-Service
As a data-driven organization, we will publish all data without thinking of how it will be used. Then, the infrastructure platforms and analysis tools all need to be self-service and data universally available.

IT Data engineers should assemble, create, and publish datasets for all the possible consumers: data scientists, business users, business analysts. They should constantly make sure that the data is well curated and reliable. They should also be responsible for ingesting the data from different sources and ensuring that the metadata uses a set of common nomenclatures in describing datasets and fields so that the data consumers can easily discover the datasets in which they are interested.

Making data self-service means also that security and governance around data needs to be reimagined. To make this manageable, it is important to ensure that all of the data access happens through a single gateway. When this is done, all of the access control mappings, from the user identities to the data-access policies as well as all the collection of audit logs, can be easily achieved. With such an architecture in place, self-service does not become chaotic and the guarantees around security and governance become easier to enforce.

In addition, providing feedback to data users on the effectiveness of their queries is essential in making data self-service. After all, you have several different types of users. Some will be experts in the use of data analysis tools; others will not. When you create a self-service infrastructure, you are essentially getting different types of users executing their queries on the infrastructure. By giving them feedback on the effectiveness of their data requests, you gradually raise the bar of sophistication in your data-driven organization. It also leads to a model in which users do not always have to go to the experts to understand their failures or to tune their analyses better.

__Data 2.0__ is all about building data lakes in the cloud and using the data platforms built for the cloud to drive agility and a self-service data culture.

Most companies will go through humongous data growth. If you are not able to keep up with the infrastructure needs and the public clouds or private cloud capacity you need, as well as the budget to grow that capacity, you’re going to end up with a siloed data infrastructure. And that will make your ability to come up with consistent and smart decisions impossible.

This capability can be called __CAP-R__: __capacity__, __availability__, __performance__, and __reliability__. You can have a lot of growing pains in this, but with a data-driven culture, people forgive you for the sins that you go through when you grow. Is there enough capacity? Is performance adequate? Is the system running properly? All of these questions need to be answered with “yes” or analysts will be unhappy.

What should companies do that are just beginning their data-driven journeys? Embrace the fact that it’s going to be rocky. The data will never be perfect. But if you have invested in data quality, and data engineers to ensure you always have a reconciliation process to fight drift, the credibility of your data will increase over time and provide ever-expanding value.


## Metadata
There are different kinds of metadata that describe different aspects of the data with which they are associated. Specifically, metadata can be categorized as one of three types: __descriptive__, __structural__, or __administrative__.

- __Descriptive Metadata.__
Descriptive metadata describes a collection of bits, or piece of digital data, so that it can be cataloged, discovered, identified, explored, and so on. It can include elements such as title, abstract, author, and keywords. It is typically meant to be read by humans.Descriptive metadata can also help data users “decode” data.
In addition to direct applications for data users, this type of metadata is also used by data discovery tools to aid the data users in finding, exploring, and understanding datasets.

- __Structural metadata.__
Structural metadata is data about the organization of information and the relationship between different organizational units. It informs either the data users or machines about how the data is organized so that they can perform transformations on it and correlate it with other datasets. Among other aspects of data, structural metadata describes the types, versions, relationships, and other characteristics of digital data.
This structural information is primarily put in place to make the data actionable, whether it be by machines using data processing engines or by data users using different types of query languages. It can be used by software to choose optimal computation paths for the desired transformation so that the results can be provided as quickly as possible.

- __Administrative metadata.__
Administrative metadata provides information to help administrators manage a resource, such as when and how it was created, file type, who can access it, and other technical information. It captures information during the entire lifecycle of data, from creation, through consumption, through changes, and then finally to archival or deletion. The information is most easily captured by software aiding in all of these activities. Given this information, one of the key applications of administrative data is compliance and auditing.
Another part of administrative data captures organizational policies related to data management. Such policies might be specified to control any or all aspects the lifecycle of data. As an example, a key policy element around data that every organization deals with is controlling access to it. Access control lists (ACLs) and permissions are elements of administrative metadata that help administrators with managing access to different part of the data’s lifecycle—creation, consumption (read), modification (update), deletion of archival. Another example of a policy element associated with data management could be specifications of the duration of time when data is held online and when it is either deleted or archived away. These policies could also dictate how and in where the different durations are stored and managed.

Metadata is essential for creating a self-service data infrastructure. If the descriptive metadata is not available for a dataset, business users and analysts won’t be able to identify it and will continually go to the experts—the central data team—for help. This obviously would defeat the purpose of having a self-service data infrastructure.

One of the biggest challenges with metadata is __consistency__: what are the processes for creating, modifying, and managing the metadata? Analysis depends on independent datasets. Independency means that the datasets are collecting different characteristics of a particular entity. Independent datasets very often are created by different applications, teams, and, many times, by different organizations. Clearly, in such a federated authoring process, without any standards, different publishers would describe or structure the data sets in a different way. As a result, metadata about the data from these different sources diverges.

## Self-Service Platforms
When it comes to handling data, technical users often prefer self-serve platforms, which are easier to customize, whereas nontechnical users generally prefer manual hand-holding from the data team via accessible processes and support. 

There are many ways to serve data on a web browser. Dashboards are very popular among nontechnical users; however, dashboards—even the interactive ones—are limited in functionality. To combat these limitations at Uber, we built a browser-based SQL access tool. It’s very important to enforce sound controls on a self-serve platform. Ensuring compliance, privacy, and security is the most obvious reason, but scalability and efficiency are also a strong consideration. The data cluster might not have enough capacity to give everyone the computational resources they require, especially when a company is scaling rapidly.

A self-serve platform is the first component of data democratization; the second is implementing good processes and support systems

## Main roles of Data team
### Data engineers
(Some companies call them _data architects_). These are the professionals who understand the semantics of the data and business logic. These engineers define concepts like daily actives, monthly actives, and so on and how those different concepts relate to one another. Data engineers transform raw datasets to produce what we call modeled datasets. These modeled datasets are very powerful because they allow people like data scientists and product managers to more easily analyze the data. The modeled datasets also allow data scientists and product managers to access the data much more efficiently, making their data clusters more efficient.

### Data infrastructure engineers
People in this role need to be very familiar with the big data ecosystem, understand both open source software and proprietary big data software, and the pros and cons of each. They need to be very well connected within the community as well as understand new trends in technology, problems with existing technologies, and what technologies other companies are using. Data infrastructure engineers ensure that we don’t do everything from scratch, but instead blend open source software with home-grown solutions to support the unique business needs in an efficient manner. At the same time, we contribute commonly used features back to the open source community. In that way, we foster very collaborative relationships with other companies for the betterment of the industry.

### Site reliability engineers
Similar in function to a DevOps engineer, this role was introduced by Google. This professional automates the management of large-scale clusters and sets the bar for production quality and reliability, making it more efficient to manage huge data clusters without having to worry about hardware failures.