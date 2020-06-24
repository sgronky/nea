---
title: "Cognos"
date: "2019-02-03"
slug: "cognos"
tags: ["data-management", "project"]
---

[https://www.ibm.com/support/knowledgecenter/en/SSEP7J_10.2.2/kc_gen/com.ibm.swg.ba.cognos.cbi.doc_install_toc-gen5.html]

__IBM Cognos Business Intelligence__ has a multitiered architecture. For description purposes, it can be separated into three tiers: Web server, applications, and data. The tiers are based on business function, and are typically separated by network firewalls. IBM Cognos BI user interfaces sit above the tiers.

When you install IBM Cognos BI, you specify where to install the gateways, Application Tier Components, and Content Manager. You can install all IBM Cognos BI components on one computer, or distribute them across a network.

You must install __Framework Manager__, the metadata modeling application for business intelligence. You can choose to install optional metadata modeling applications such as Metric Designer for scorecarding and Transformer for creating PowerCubes

You can install the gateway and a Web server on one computer, and install the remaining IBM Cognos BI components on other computers. If you have a Web farm, you may want to install an IBM Cognos BI gateway on each Web server. Using multiple Web servers to manage incoming requests provides a better level of service. Installing Application Tier Components on separate computers from the Content Manager can improve performance, availability, and capacity.

If you install the gateway component on a different computer from Content Manager or Application Tier Components, you must configure the gateway computer so that it knows the location of a dispatcher, preferably one on an Application Tier Components computer. For failover protection, you can configure more than one dispatcher for a gateway computer. For more information, see Dispatcher.

IBM Cognos BI supports several types of Web gateways, including

    - ISAPIISAPI can be used for the Microsoft Internet Information Services (IIS) Web server. It delivers faster performance for IIS.
    - apache_mod. You can use an apache_mod gateway with the Apache Web server.
    - servlet (for instance Tomcat). If your Web server infrastructure supports servlets or you are using an application server, you can use a servlet gateway.
    - CGI. The default gateway, CGI can be used for all supported Web servers but should not be used in a production environment.

When an IBM Cognos BI gateway receives a request, it
    
    - encrypts passwords to ensure security
    - extracts information needed to submit the request to an IBM Cognos BI server
    - attaches environment variables for the Web server
    - adds a default namespace to the request to ensure that the server authenticates the user in the correct namespace
    - passes requests to an IBM Cognos BI dispatcher for processing

__The IBM Cognos BI application server__ has one or more IBM Cognos BI servers. Each IBM Cognos BI installation contains Content Manager to manage data stored in the content store. Each IBM Cognos BI server contains a dispatcher that runs the IBM Cognos BI presentation service, batch report and report services, job and schedule monitor service, and log service.

__IBM Cognos Application Firewall__ validates and filters incoming and outgoing traffic at the dispatcher layer.
IBM Cognos Application Firewall features include request validation, SecureError, and parameter signing. It also has a flexible architecture that can be updated to keep your IBM Cognos BI security current.
IBM Cognos Application Firewall is an essential component of IBM Cognos BI security, helping to provide protection against penetration vulnerabilities such as cross-site scripting. Disabling the IBM Cognos Application Firewall will remove this protection, and should not be done under normal circumstances. For more information, see Recommendation - Use IBM Cognos Application Firewall.

__Single Sign On Authentication__ is the process of identifying individuals before allowing them to log on.
Authentication in IBM Cognos BI is integrated with third-party authentication providers. Authentication providers define users, groups, and roles used for authentication. User names, IDs, passwords, regional settings, and personal preferences are some examples of information stored in the authentication source accessed by the provider. An authentication namespace is an instance of a configured authentication provider.
To set up authentication for IBM Cognos BI, you must configure IBM Cognos BI using one or more of these authentication providers:

    + LDAP
    + Microsoft Active Directory
    + IBM Cognos 7 namespaces created using IBM Cognos 7 Access Manager and available with other IBM Cognos products
    + eTrust SiteMinder
    + Custom Java provider

### Commenti:

    1. Come mai è stato installato tutto all'interno dello stesso server e non sono stati suddivisi i componenti software (p.e. i gateway)
    2. Come mai non viene separato il content manager dal Cognos Server
    3. Come mai i datamart pubblicati da SimCorp sono acceduti tramite DBLink e non direttamente. Oppure i dati non sono replicati tramite ODI
    4. Come gestire i ruoli di amministrazione?
