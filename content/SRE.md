---
title: "Site Reliability Engineering"
date: "2020-04-01"
slug: "site-reliability-engineering"
tags: ["enteprise-architecture", "notes"]
---

> The SRE team is responsible for availability, latency, performance, efficiency, change management, monitoring, emergency response, and capacity planning.
> 
__Site Reliability Engineers__ require software development and operations skills. They’re expected to write software that assists with deployment and production operations and also debug software in production environments
> 
## SLO & SLI

An __SLI__ is a __service level indicator__: a carefully defined quantitative measure of some aspect of the level of service that is provided.

An __SLO__ is a __service level objective__: a target value or range of values for a service level that is measured by an SLI. A natural structure for SLOs is thus SLI ≤ target, or lower bound ≤ SLI ≤ upper bound. 

For instance, __Big data systems__, such as data processing pipelines, tend to care about throughput and end-to-end latency. In other words: How much data is being processed? How long does it take the data to progress from ingestion to completion? (Some pipelines may also have targets for latency on individual processing stages.)

All systems should care about __correctness__: was the right answer returned, the right data retrieved, the right analysis done? Correctness is important to track as an indicator of system health, even though it’s often a property of the data in the system rather than the infrastructure per se, and so usually not an SRE responsibility to meet.

It’s both unrealistic and undesirable to insist that SLOs will be met 100% of the time: 

- If your SLO is aligned with customer satisfaction, 100% is not a reasonable goal.     
- Even if you could achieve 100% reliability within your system, your customers would not experience 100% reliability. As you go from 99% to 99.9% to 99.99% reliability, each extra nine comes at an increased cost, but the marginal utility to your customers steadily approaches zero.         
- If you do manage to create an experience that is 100% reliable for your customers, and want to maintain that level of reliability, you can never update or improve your service. 
- An SLO of 100% means you only have time to be reactive. You literally cannot do anything other than react to < 100% availability, which is guaranteed to happen

Instead, it is better to allow an __error budget__ — a rate at which the SLOs can be missed — and track that on a daily or weekly basis. 

In order to adopt an error budget-based approach to Site Reliability Engineering, you need to reach a state where the following hold true:

- There are SLOs that all stakeholders in the organization have approved as being fit for the product.
- The people responsible for ensuring that the service meets its SLO have agreed that it is possible to meet this SLO under normal circumstances.
- The organization has committed to using the error budget for decision making and prioritizing. This commitment is formalized in an error budget policy.
- There is a process in place for refining the SLO.

Once the SLO is in place:

1. Monitor and measure the system’s SLIs.
2. Compare the SLIs to the SLOs, and decide whether or not action is needed.
3. If action is needed, figure out what needs to happen in order to meet the target.
4. Take that action.

The __SLIs__ should range from 0% to 100%. The SLO is therefore a target percentage and the error budget is 100% minus the SLO. When attempting to formulate SLIs for the first time, you might find it useful to further divide SLIs into SLI specification and SLI implementation.

The easiest way to get started with setting SLIs is to abstract your system into a few common types of components. You can then use our list of suggested SLIs for each component to choose the ones most relevant to your service. E.g.:

- Request-driven
- Pipeline
- Storage

A right number of SLIs could be around 5 or fewer.

| Type of Service | Type of SLI | Description |
|---|---|---|
| Request-driven | Availability | The proportion of requests that resulted in a successful response. |
| Request-driven | Latency | The proportion of requests that were faster than some threshold. |
| Request-driven | Quality | If the service degrades gracefully when overloaded or when backends are unavailable, you need to measure the proportion of responses that were served in an undegraded state. For example, if the User Data store is unavailable, the game is still playable but uses generic imagery. |
| Pipeline | Freshness | The proportion of the data that was updated more recently than some time threshold. Ideally this metric counts how many times a user accessed the data, so that it most accurately reflects the user experience. |
| Pipeline | Correctness | The proportion of records coming into the pipeline that resulted in the correct value coming out. |
| Pipeline | Coverage | For batch processing, the proportion of jobs that processed above some target amount of data. For streaming processing, the proportion of incoming records that were successfully processed within some time window. |
| Storage | Durability | The proportion of records written that can be successfully read. Take particular care with durability SLIs: the data that the user wants may be only a small portion of the data that is stored. For example, if you have 1 billion records for the previous 10 years, but the user wants only the records from today (which are unavailable), then they will be unhappy even though almost all of their data is readable. |

Once you have an SLO, you can use the SLO to derive an __error budget__. In order to use this error budget, you need a policy outlining what to do when your service runs out of budget. Common policies include stopping feature launches until the service is once again within SLO or devoting some or all engineering time to working on reliability-related bugs.

The SLO and the error budget policy should be well documented and the documentation should be easily accessible from anyone interested in.

[Example of SLO document](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/app01.html#example_slo_document)

##Monitoring
The desirable features of a monitoring strategy:

- __Speed__ (i.e. freshness of data and speed of data retrieval)
- __Calculations__ (i.e. the retantion of data over a multimonth time frame and the possibility to execute calculations, e.g. to produce summary data and / or statistics)
- __Interfaces__ (i.e. visualization) 
- __Alerts__ (i.e. alerts classification, alert suppression, etc...)

As for the source of monitoring data, special attention should be taken to select the best source of information.

__Metrics__ are numerical measurements representing attributes and events, typically harvested via many data points at regular time intervals. __Logs__ are an append-only record of events. The latter are best suited for batch analysis (e.g. using ad hoc query systems), the metrics are usually best suited to acquire real time information. __Alerts and dashboards__ tipically use metrics. Reports use logs to obtain much detailed information.

> In an ideal world, monitoring and alerting code should be subject to the same testing standards as code development. The following steps should be tested:   
> 1. __Binary reporting__: Check that the exported metric variables change in value under certain conditions as expected.   
> 2. __Monitoring configurations__: Make sure that rule evaluation produces expected results, and that specific conditions produce the expected alerts.   
> 3. __Alerting configurations__: Test that generated alerts are routed to a predetermined destination, based on alert label values.   

In order to generate alerts from service level indicators (SLIs) and an error budget, you need a way to combine these two elements into a specific rule. Your goal is to be notified for a significant event: an event that consumes a large fraction of the error budget.

The best strategy with a sufficiently high rate of incoming requests is the __Multiwindow, Multi-Burn-Rate Alerts__ strategy (see [https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch05.html](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch05.html) for details).

However, that approach can cause problems for systems that receive a low rate of requests. If a system has either a low number of users or natural low-traffic periods (such as nights and weekends), you may need to alter your approach. In those cases, it may be useful to either:

- generate artificial traffic,
- combine services, or
- make service and infrastructure changes
- lower the SLO or increase the window

Also consider that services with an extremely low or an extremely high availability goal may require special consideration (e.g. a 100% outage for a service with a target monthly availability of 99.999% would exhaust its budget in 26 seconds). Finally, to deal with a large number of SLOs, group request types into bucket of approximately similar requirements.

##Eliminating Toil
SREs should consider projects for toil reduction / elimination. The choice should be guided by an analysis of cost versus benefit and by the confirmation that the time saved through eliminating toil will (at minimum) be proportional to the time invested in first developing and then maintaining an automated solution. 

Projects that look “unprofitable” from a simplistic comparison of hours saved versus hours invested might still be well worth undertaking because of the many indirect or intangible benefits of automation. Potential benefits could include:  

- Growth in engineering project work over time, some of which will further reduce toil
- Increased team morale and decreased team attrition and burnout          
- Less context switching for interrupts, which raises team productivity        
- Increased process clarity and standardization           
- Enhanced technical skills and career growth for team members
- Reduced training time           
- Fewer outages attributable to human errors          
- Improved security           
- Shorter response times for user requests

An important aspect to be considered is how to measure toil. Measurement is a fundamental aspect in order to garantee the success of toil reduction is not at the expences of free time and work time. The following step should be carried out:

1. Identify the toil.
2. Select an appropriate unit of measure to measure it.
3. Track the measurements along the entire automation activity and after.

We’ve found that performing toil management is critical if you’re operating a production system of any scale. Once you identify and quantify toil, you need a plan for eliminating it

(For some examples on toil reduction activities see [https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch06.html](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch06.html)).

The following is a general toil taxonomy:

- Business processes 
- Production interrupts
- Release shepherding 
- Migrations
- Cost engineering and capacity planning
- Troubleshooting for opaque architectures (e.g. microservices)

In order to planning for toil elimination, consider the following:

1. __Identify and Measure Toil__. We recommend that you adopt a data-driven approach to identify and compare sources of toil, make objective remedial decisions, and quantify the time saved (return on investment) by toil reduction projects
2. __Engineer Toil Out of the System__. The optimal strategy for handling toil is to eliminate it at the source.
3. __Reject Toil__. While it may seem counterproductive, rejecting a toil-intensive task should be the first option you consider.
4. __Use SLOs to Reduce Toil__.
5. __Start with Human-Backed Interfaces__. If you have a particularly complex business problem with many edge cases or types of requests, consider a partially automated approach as an interim step toward full automation. 
6. __Provide Self-Service Methods__. Whenever applicable, the possibility to hand-over part of the activities to the users could be a valuable solution.
7. __Promote Toil Reduction as a Feature__.
8. __Start Small and Then Improve__. Automate a few high-priority items first, and then improve your solution using the time you gained by eliminating that toil, applying the lessons learned along the way. Pick clear metrics such as MTTR (Mean Time to Repair) to measure your success.
9. __Increase Uniformity__.
10. __Assess Risk Within Automation__.

## Incident Management
The basic premise of __incident management__ is to respond to an incident in a structured way. Large-scale incidents can be confusing; a structure that teams agree on beforehand can reduce chaos. Formulating rules about how to communicate and coordinate your efforts before disaster strikes allows your team to concentrate on resolving an incident when it occurs. If your team has already practiced and familiarized themselves with communication and coordination, they don’t need to worry about these factors during an incident.

Incident response frameworks have three common goals, also known as the “three Cs” (3Cs) of incident management:        
- Coordinate response effort.         
- Communicate between incident responders, within the organization, and to the outside world.             
- Maintain control over the incident response.

The main roles in incident response are therefore the __Incident Commander__ (IC), __Communications Lead__ (CL), and __Operations or Ops Lead__ (OL). These roles must be organized into a hierarchy: the IC leads the incident response, and the CL and OL report to the IC. 

When disaster strikes, the person who declares the incident typically steps into the IC role and directs the high-level state of the incident. The IC may either hand off their role to someone else and assume the OL role, or assign the OL role to someone else. The OL works to respond to the incident by applying operational tools to mitigate or resolve the incident. While the IC and OL work on mitigating and resolving the incident, the CL is the public face of the incident response team. The CL’s main duties include providing periodic updates to the incident response team and stakeholders, and managing inquiries about the incident. If the incident becomes small enough, the CL role can be subsumed back into the IC role.

Some other considerations:

1. A __incident management tool__ should be employed to take care and trace the incident phases, other associated incidents, etc... Something like PagerDuty or ServiceNow could help reaching the objective.  
2. A __bug tracking tool__ could also be used to trace the bugs following by the analysis lead by the incident team.  
3. Based on the severity of the incident, a __mitigation action__ should be addressed first, in order to reduce the gravity.  
4. Even if the incident is no more preventing proper functioning, the __root cause__ should always be recognized in order to avoid malfunctioning again in the future.  
5. A tool to support __communications__ inside the team and with stakeholders should be in place in order to ease the flow of messages during the incident and after. A communication channel could be used to trace decisions, actions and everything related to the specific incident. A tool like Slack can be used on purpose.  
6. A __post-mortem assessment__ should always take place after an incident has been resolved and the outcomes should be traced and be fully available thereafter.  
7. A list of __people to be informed__ for a specific system should be prepared beforehand to save critical time and effort during the incident.  
8. It's helpful to estabilish a __list of criteria__ for determining what an incident is and what is not.  
9. __Practicing__ during less critical situations is fundamental to develop good habits and pattern behavior.  

A detailed description about incident management can be found (under Apache 2.0 license) here:

[https://response.pagerduty.com/](https://response.pagerduty.com/)

## Post-mortem
Introducing __postmortems__ into an organization is as much a cultural change as it is a technical one. Making such a shift can seem daunting. The key takeaway from this chapter is that making this change is possible, and needn’t seem like an insurmountable challenge. Don’t emerge from an incident hoping that your systems will eventually remedy themselves. You can start small by introducing a very basic postmortem procedure, and then reflect and tune your process to best suit your organization—as with many things, there is no one size that fits all.

When written well, acted upon, and widely shared, postmortems can be a very effective tool for driving positive organizational change and preventing repeat outages.

Some considerations related to a good post-mortem document are as follows:
- Provide a good context (with glossary if necessary) because the document has a broad audience
- Provide a good bunch of detail regarding the root cause, what has been done to solve, etc...
- Don't blame anyone
- Let the document be largely available inside the organization
- As far as possible, do not delay the pubblication

Some information to be provided:
- Incident Date
- Description (with a Glossary)
- Owner
- Shared with
- Status
- Impacts (products, users, revenue, etc...)
- Root cause
- Duration of the problem
- Lessons learned
- Actions taken

As far as possible try to reward the participants. If possible use also a gamification approach whenever applicable (e.g. rank the participants based on the bugs solved and problems found).

It's also useful to periodically review the list of incidents of the past days / months.

A post-mortem template can be found at:
- [http://g.co/SiteReliabilityWorkbookMaterials](http://g.co/SiteReliabilityWorkbookMaterials)
- [https://response.pagerduty.com/after/post_mortem_template/](https://response.pagerduty.com/after/post_mortem_template/)
- [https://github.com/dastergon/postmortem-templates/tree/master/templates](https://github.com/dastergon/postmortem-templates/tree/master/templates)
- [https://serverfault.com/questions/29188/documenting-an-outage-for-a-post-mortem-review](https://serverfault.com/questions/29188/documenting-an-outage-for-a-post-mortem-review)

Other information can be found at:
[https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch10.html](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch10.html)

## NA-LSD
In the __Non-abstract Large System Design__ approach we begin with the problem statement, gather requirements, and iterate through designs that become increasingly sophisticated until we reach a viable solution. Ultimately, we arrive at a system that defends against many failure modes and satisfies both the initial requirements and additional details that emerged as we iterated.

Practically, NALSD combines elements of capacity planning, component isolation, and graceful system degradation that are crucial to highly available production systems.

The purpose is to use an iterative approach to design systems that meet our goals. Each iteration defines a potential design and examines its strengths and weaknesses. This analysis either feeds into the next iteration or indicates when the design is good enough to recommend.

In broad strokes, the NALSD process has two phases, each with two to three questions.In the basic design phase, we try to invent a design that works in principle. 

We ask two questions:  
1. __Is it possible?__     
&nbsp;&nbsp;&nbsp; _Is the design even possible? If we didn’t have to worry about enough RAM, CPU, network bandwidth, and so on, what would we design to satisfy the requirements?_      
2. __Can we do better?__       
&nbsp;&nbsp;&nbsp; _For any such design, we ask, “Can we do better?” For example, can we make the system meaningfully faster, smaller, more efficient? If the design solves the problem in O(N) time, can we solve it more quickly—say, O(ln(N))?_

In the next phase, we try to scale up our basic design—for example, by dramatically increasing a requirement. 

We ask three questions:  
1. __Is it feasible?__  
&nbsp;&nbsp;&nbsp; _Is it possible to scale this design, given constraints on money, hardware, and so on? If necessary, what distributed design would satisfy the requirements?_     
2. __Is it resilient?__  
&nbsp;&nbsp;&nbsp; _Can the design fail gracefully? What happens when this component fails? How does the system work when an entire datacenter fails?_  
3. __Can we do better?__    

All those considerations are to be matched against our SLOs, that are of course our bar. 

An example can be found at: [https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch13.html](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/ch13.html).

## Data Processing Pipelines Reliability
When dealing with Data Pipelines, it’s important to automatically detect when it is unhealthy and if you are failing to meet your customer’s needs. Receiving notifications when you’re in danger of exceeding your error budget helps to minimize customer impact. At the same time, it’s important to strike a comfortable balance between reliability and feature launches.

### Data freshness
Most pipeline data freshness SLOs are in one of the following formats:      
- X% of data processed in Y (seconds, days, minutes).
- The oldest data is no older than Y (seconds, days, minutes).
- The pipeline job has completed successfully within Y (seconds, days, minutes).

### Data correctness
Creating SLOs for data correctness ensures that you are alerted about potential data errors in your pipeline. A correctness target can be difficult to measure, especially if there is no predefined correct output. If you don’t have access to such data, you can generate it. For example, use test accounts to calculate the expected output. Once you have this “golden data,” you can compare expected and actual output. From there, you can create monitoring for errors/discrepancies and implement threshold-based alerting as test data flows through a real production system.

Another data correctness SLO involves backward-looking analysis. For example, you might set a target that no more than 0.1% of your invoices are incorrect per quarter. You might set another SLO target for the number of hours/days that bad data or errors are served from the pipeline output data. The notion of data correctness varies by product and application.

### Plan for dependency failure
Once you define your SLO, it’s good practice to confirm that you aren’t overdepending on the SLOs/SLAs of other products that fail to meet their commitments. Once you identify any third-party dependencies, at a minimum, design for __the largest failure accounted for__ in their advertised SLAs. For example, when defining an SLO, the owner of a pipeline that reads or writes data to Cloud Storage would ensure that the uptimes and guarantees advertised are appropriate. If the single-region uptime guarantee was less than required by the pipeline to meet its SLO on data processing time, the pipeline owner may choose to replicate the data across regions to get the higher availability.

### Playbook entries
Ideally, each alert condition in your system should have a corresponding playbook entry that describes the steps to recovery.

### Pipeline features
| Pipeline item | Feature |
| ---- | ---- | 
| Latency | Use an API that supports streaming, batch, or both. Streaming processing is generally better than batch processing at supporting lower-latency applications. If you choose batch but might at some point want streaming, an API that is interchangeable may reduce the migration cost later. |
| Data correctness | Exactly-once semantics globally. You can require that data is processed (at most) once to get correct results. Two-phase mutations. Windowing functions for event processing and aggregations. You may want fixed time, session, or sliding windows to divide data (since data is not always processed in the order in which it’s received). You may also want in-order guarantees. Black-box monitoring. The ability to control the flow of multiple jobs or stages of your pipeline. This control should allow you to gate a job until another completes so the job does not process incomplete data. |
| High availability | Multihoming. Autoscaling. |
| Mean Time to Resolve (MTTR) incidents in data processing | Tie your code changes to a release, which allows for fast rollbacks. Have tested data backup and restore procedures in place. In the event of an outage, ensure that you can easily drain a region from serving or processing. Have useful alert messages, dashboards, and logs for debugging. In particular, your monitoring should be quick to identify the reason(s) why a pipeline is delayed and/or why data is corrupt. Use data checkpointing to help recover faster when a pipeline is interrupted. |
| Mean Time to Detect (MTTD) outages | Ensure you have SLO monitoring in place. Monitoring out-of-SLO alerts allows you to detect issues that impact your customers. Alerting on the symptom (versus the cause) reduces monitoring gaps. |
| Development lifecycle to prevent errors from reaching production | We recommend running any changes in a canary environment before deploying to production. This strategy lowers the possibility of a change impacting SLOs in production. |
| Inspect and predict resource usage or cost | Create (or use an existing) resource accounting dashboard. Be sure to include resources like storage and network. Create a metric that allows you to correlate or predict growth. |
| Ease of development | Support a language that best fits your use case. Often pipeline technologies limit your options to one or two languages. Use a simple API for defining data transformations and expressing your pipeline logic. Consider the tradeoff between simplicity and flexibility. Reuse base libraries, metrics, and reporting. When you’re creating a new pipeline, reusable resources allow you to focus development on any new business logic. |
| Ease of operation | Use existing automation and operational tools as much as possible. Doing so reduces operational costs, as you don’t need to maintain your own tools. Automate as many operational tasks as possible. Larger tasks that are performed infrequently may include a chain of dependencies and prerequisites that can be too numerous or complex for a human to assess in a timely manner (e.g., moving your data and pipeline stack from region A to region B, then turning down region A). To ease a transition like this, consider investing in automation. Perhaps introduce some pipeline health checks on the pipeline stack in region B before putting it into production. |

There are five key characteristics that must be satisfied by a robust pipeline to be taken in production:      
- Failure tolerance           
- Scalability         
- Monitoring and debugging            
- Transparency and ease of implementation         
- Unit and integration testing

On the contrary, the following are some of recurrent causes for a pipeline to fail:
- Delayed data
- Corrupt data
- Pipeline dependecies
- Pipeline uncorrect configuration
- Unexpected resource growth

## Configuration
__Configuration__ is an important aspect of reliability and most often a crucial one. Regardless of what you’re configuring and how you’re configuring it, the human-computer interaction ultimately boils down to an interface that asks users questions, requesting inputs on how the system should operate. This model of conceptualization holds true regardless of whether users are editing XML files or using a configuration GUI wizard.

In modern software systems, we can approach this model from two different perspectives: 

- Infrastructure-centric view
- User-centric view

We favor the user-centric view. Focusing configuration on the user means that your software needs to be designed with a particular set of use cases for your key audience. This requires user research.

Let’s use making tea as an analogy to configuring a system. With fewer configuration options, a user can ask for “hot green tea” and get roughly what they want. On the opposite end of the spectrum, a user can specify the whole process: water volume, boiling temperature, tea brand and flavor, steeping time, tea cup type, and tea volume in the cup. Using more configuration options might be closer to perfection, but the effort required to adhere to such detail might cost more than the marginal benefit of a near-perfect drink.

It’s helpful both during an incident and while you’re conducting a postmortem to know who changed a configuration, and to understand how the configuration change impacted the system. This holds true whether the incident is due to an accident or a malicious actor.

__Versioning configuration__, regardless of how it is performed, allows you to go back in time to see what the configuration looked like at any given point in time.  Checking configuration files into a versioning system, such as Subversion or Git, is a common practice nowadays, but this practice is equally important for configuration ingested by web UI or remote APIs.

On a related note, it is useful (and sometimes required) to log both changes to the configuration and the resulting application to the system. The simple act of committing a new version of a configuration does not always mean that the configuration is directly applied (more on that later)

For a configuration change to be safe, it must have three main properties:     
- The ability to be deployed gradually, avoiding an all-or-nothing change
- The ability to roll back the change if it proves dangerous
- Automatic rollback (or at a minimum, the ability to stop progress) if the change leads to loss of operator control.

When deploying a new configuration, it is important to avoid a global all-at-once push. Instead, push the new configuration out gradually—doing so allows you to detect issues and abort a problematic push before causing a 100% outage.

## Release Engineering
__Release engineering__ is a term we use to describe all the processes and artifacts related to getting code from a repository into a running production system. Automating releases can help avoid many of the traditional pitfalls associated with release engineering: the toil of repetitive and manual tasks, the inconsistency of a nonautomated process, the inability of knowing the exact state of a rollout, and the difficulty of rolling back.

Some of the basic principles behind release engineering are as follows:

- Reproducible builds
- Automated builds
- Automated tests
- Automated deployments
- Small deployments

CI/CD coupled with release automation can deliver continuous improvements to the development cycle. More relase automation means faster releases which means more frequent releases with fewer changes per release with few bugs that in turns means more time to automate releases.

__Release velocity__ and __reliability__ are often treated as opposing goals. The business wants to ship new features and product improvements as quickly as possible with 100% reliability! While that goal is not achievable (as 100% is never the right target for reliability), it is possible to ship as quickly as possible while meeting specific reliability goals for a given product.

Many kinds of software changes can result in a system failure—for example, changes in the behavior of an underlying component, changes in the behavior of a dependency (such as an API), or a change in configuration like DNS.

Despite the risk inherent in making changes to software, these changes—bug fixes, security patches, and new features—are necessary for the business to succeed. Instead of advocating against change, you can use the concept of SLOs and error budgets to measure the impact of releases on your reliability. Your goal should be to ship software as quickly as possible while meeting the reliability targets your users expect.

One of the key principle here is to separate components that change at different rates. Feature flag, e.g., allow you to __separate feature launches from binary releases__. 

If a binary release includes multiple features, you can enable them one at a time by changing the experiment configuration. That way, you don’t have to batch all of these changes into one big change or perform an individual release for each feature. More importantly, if only some of the new features don’t behave as expected, you can selectively disable those features until the next build/release cycle can deploy a new binary.

We define __canarying__ as a partial and time-limited deployment of a change in a service and its evaluation. This evaluation helps us decide whether or not to proceed with the rollout. The part of the service that receives the change is “the canary,” and the remainder of the service is “the control.” The logic underpinning this approach is that usually the canary deployment is performed on a much smaller subset of production, or affects a much smaller subset of the user base than the control portion. Canarying is effectively an A/B testing process.

Even if your release pipeline is fully automated, you won’t be able to detect all release-related defects until real traffic is hitting the service.

Concepts very similar to canarying, are the following:

### Blue/Green Deployment.
__Blue/green deployment__ maintains two instances of a system: one that is serving traffic (green), and another that is ready to serve traffic (blue). After deploying a new release in the blue environment, you can then move traffic to it. The cutover doesn’t require downtime, and rollback is a trivial reversal of the router change. One downside is that this setup uses twice as many resources as a more “traditional” deployment. In this setup, you are effectively performing a before/after canary.

You can use blue/green deployments more or less as normal canaries by utilizing both blue and green deployments simultaneously (rather than independently). In this strategy, you can deploy the canary to the blue (standby) instance and slowly split traffic between green and blue environments. Both your evaluations and the metrics that compare the blue environment to the green environment should be tied to traffic control. This setup resembles an A/B canary, where the green environment is the control, the blue environment is the canary deployment, and the canary population is controlled by the amount of traffic sent to each.

### Artificial Load Generation
Instead of exposing live user traffic to a canary deployment, it may be tempting to err on the side of safety and use __artificial load generation__. Often, you can run load tests in multiple deployment stages (QA, preproduction, and even in production). While these activities don’t qualify as canarying according to our definition, they are still viable approaches to finding defects with some caveats.

Testing with synthetic load does a good job of maximizing code coverage, but doesn’t provide good state coverage. It can be especially hard to artificially simulate load in mutable systems (systems with caches, cookies, request affinity, etc.). Artificial load also might not accurately model organic traffic shifts that happen in a real system. Some regressions may manifest only during events not included in the artificial load, leading to gaps in coverage.

### Traffic Teeing
If artificial load is not representative, we could copy the traffic and send it to both the production system and the system in the test environment. This technique is referred to as __teeing__. 

While the production system serves the actual traffic and delivers responses to users, the canary deployment serves the copy and discards the responses. You might even compare the canary responses to the actual responses and run further analysis.

This strategy can provide representative traffic, but is often more complicated to set up than a more straightforward canary process. Traffic teeing also doesn’t adequately identify risk in stateful systems; copies of traffic may introduce unexpected influences between the seemingly independent deployments. For example, if the canary deployment and production systems share a cache, an artificially inflated cache hit rate would invalidate performance measurements for the canary metrics.

## Service Lifecycle
### Phase 1: Architecture and Design
SRE can influence the architecture and design of a software system in different ways:       
- Creating best practices, such as resilience to various single points of failure, that a developer team can employ when building a new product          
- Documenting the dos and don’ts of particular infrastructure systems (based upon prior experience) so developers can choose their building blocks wisely, use them correctly, and avoid known pitfalls           
- Providing early engagement consulting to discuss specific architectures and design choices in detail, and to help validate assumptions with the help of targeted prototypes         
- Joining the developer team and participating in development work           
- Codesigning part of the service

Fixing architectural mistakes becomes more difficult later in the development cycle. Early SRE engagement can help avoid costly redesigns that become necessary when systems interact with real-world users and need to scale in response to service growth.

### Phase 2: Active Development
As the product takes shape during active development, SREs can start productionizing the service—getting it in shape to be released into production. Productionalization typically includes capacity planning, setting up extra resources for redundancy, planning for spike and overload handling, implementing load balancing, and putting in place sustainable operational practices like monitoring, alerting, and performance tuning.

### Phase 3: Limited Availability
As a service progresses toward Beta, the number of users, variety of use cases, intensity of usage, and availability and performance demands increase. At this stage, SRE can help measure and evaluate reliability. We strongly recommend defining SLOs before general availability (GA) so that the service teams have an objective measure of how reliable the service is. The product team still has the option to withdraw a product that can’t meet its target reliability.

During this phase, the SRE team can also help scale the system by building a capacity model, acquiring resources for upcoming launch phases, and automating turnups and in-place service resizing. SRE can ensure proper monitoring coverage and help create alerts that ideally match the upcoming service SLOs.

While service usage is still changing, the SRE team can expect an increased amount of work during incident response and operational duties because the teams are still learning how the service works and how to manage its failure modes. We recommend sharing this work between the developer and SRE teams. That way, the developer team gains operational experience with the service and the SREs gain experience with the service in general. Operational work and incident management will inform the system changes and updates the service owners need to make before GA.

### Phase 4: General Availability
In this phase, the service has passed the Production Readiness Review and is accepting all users (See [PRR](https://landing.google.com/sre/sre-book/chapters/evolving-sre-engagement-model/)). While SRE typically performs the majority of operational work, the developer team should continue to field a small part of all operational and incident response work so they don’t lose perspective on these aspects of the service. They might permanently include one developer in the on-call rotation to help the developers keep track of operational load.In the early phase of GA, as the developer team focuses on maturing the service and launching the first batches of new features, it also needs to stay in the loop to understand system properties under real load. In the later stages of GA, the developer team provides small incremental features and fixes, some of which are informed by operational needs and any production incidents that occur.

### Phase 5: Deprecation
SRE operates the existing system mostly without involvement from the developer team, and supports the transition with development and operational work. While SRE effort required for the existing system is reduced, SRE is effectively supporting two full systems. Headcount and staffing should be adjusted accordingly.

### Phase 6: Abandoned
Once a service is abandoned, the developer team typically resumes operational support. SRE supports service incidents on a best-effort basis. For a service with internal users, SRE hands over service management to any remaining users. 

### Phase 7: Unsupported
There are no more users, and the service has been shut down. SRE helps to delete references to the service in production configurations and in documentation.

## OnBoarding (PRR)
[https://landing.google.com/sre/sre-book/chapters/evolving-sre-engagement-model/](https://landing.google.com/sre/sre-book/chapters/evolving-sre-engagement-model/).

Few services begin their lifecycle enjoying __SRE support__, so there needs to be a process for evaluating a service, making sure that it merits SRE support, negotiating how to improve any deficits that bar SRE support, and actually instituting SRE support. This process is called __onboarding__. 

In a first case, just as in software engineering — where the earlier the bug is found, the cheaper it is to fix — the earlier an SRE team consultation happens, the better the service will be and the quicker it will feel the benefit. When SRE is engaged during the earliest stages of design, the time to onboard is lowered and the service is more reliable "out of the gate," usually because we don't have to spend the time unwinding suboptimal design or implementation.

Another way, perhaps the best, is to short-circuit the process by which specially created systems with lots of individual variations end up "arriving" at SRE's door. Provide product development with a platform of SRE-validated infrastructure, upon which they can build their systems. This platform will have the double benefit of being both reliable and scalable. This avoids certain classes of cognitive load problems entirely, and by addressing common infrastructure practices, allows product development teams to focus on innovation at the application layer, where it mostly belongs.

The most typical initial step of SRE engagement is the __Production Readiness Review (PRR)__, a process that identifies the reliability needs of a service based on its specific details. Through a PRR, SREs seek to apply what they've learned and experienced to ensure the reliability of a service operating in production. A PRR is considered a prerequisite for an SRE team to accept responsibility for managing the production aspects of a service.

SRE seeks production responsibility for important services for which it can make concrete contributions to reliability. SRE is concerned with several aspects of a service, which are collectively referred to as __production__. These aspects include the following:

- System architecture and interservice dependencies  
- Instrumentation, metrics, and monitoring  
- Emergency response  
- Capacity planning  
- Change management  
- Performance: availability, latency, and efficiency  

The objectives of the Production Readiness Review are as follows:

- Verify that a service meets accepted standards of production setup and operational readiness, and that service owners are prepared to work with SRE and take advantage of SRE expertise.
- Improve the reliability of the service in production, and minimize the number and severity of incidents that might be expected. A PRR targets all aspects of production that SRE cares about.
- After sufficient improvements are made and the service is deemed ready for SRE support, an SRE team assumes its production responsibilities.

This brings us to the Production Readiness Review process itself. There are three different but related engagement models (Simple PRR Model, Early Engagement Model, and Frameworks and SRE Platform). 

The __Simple PRR Model__ is made up of several phases: 

- Engagement
- Analysis
- Improvement and Refactoring
- Training
- Onboarding
- Contionuous Improving

The Engagement starts with a checklist to be submitted to the development team. As an example:

- Do updates to the service impact an unreasonably large percentage of the system at once?
- Does the service connect to the appropriate serving instance of its dependencies? For example, end-user requests to a service should not depend on a system that is designed for a batch-processing use case.
- Does the service request a sufficiently high network quality-of-service when talking to a critical remote service?
- Does the service report errors to central logging systems for analysis? Does it report all exceptional conditions that result in degraded responses or failures to the end users?
- Are all user-visible request failures well instrumented and monitored, with suitable alerting configured?

The Analysis phase leads to the identification of recommended improvements for the service. Responsibility for managing a service in production is generally assumed by an entire SRE team. To ensure that the team is prepared, the SRE reviewers who led the PRR take ownership of training the team, which includes the documentation necessary to support the service. The Training phase unblocks onboarding of the service by the SRE team. Active services continuously change in response to new demands and conditions, including user requests for new features, evolving system dependencies, and technology upgrades, in addition to other factors. The SRE team must maintain service reliability standards in the face of these changes by driving continuous improvement. 

The main limitations of the PRR Model stem from the fact that the service is launched and serving at scale, and the SRE engagement starts very late in the development lifecycle. If the PRR occurred earlier in the service lifecycle, SRE's opportunity to remedy potential issues in the service would be markedly increased.

The __Early Engagement Model__ introduces SRE earlier in the development lifecycle in order to achieve significant additional advantages. Applying the Early Engagement Model requires identifying the importance and/or business value of a service early in the development lifecycle, and determining if the service will have sufficient scale or complexity to benefit from SRE expertise.

By generalizing this approach, the next step is to define a real __Framework for SRE__. SRE builds framework modules to implement canonical solutions for the concerned production area. As a result, development teams can focus on the business logic, because the framework already takes care of correct infrastructure use.

A framework essentially is a prescriptive implementation for using a set of software components and a canonical way of combining these components. The framework can also expose features that control various components in a cohesive manner. For example:

- Business logic organized as well-defined semantic components that can be referenced using standard terms
- Standard dimensions for monitoring instrumentation
- A standard format for request debugging logs
- A standard configuration format for managing load shedding
- Capacity of a single server and determination of "overload" that can both use a semantically consistent measure for feedback to various control systems.

A production platform with a common service structure, conventions, and software infrastructure makes it possible for an SRE team to provide support for the "platform" infrastructure, while the development teams provide on-call support for functional issues with the service—that is, for bugs in the application code. Under this model, SREs assume responsibility for the development and maintenance of large parts of service software infrastructure, particularly control systems such as load shedding, overload, automation, traffic management, logging, and monitoring.

## SRE Team Lifecycles
In the following there are some principles that need to be in place at each stage of the jorney towards an SRE organization.

### SRE needs SLOs with consequences
Even if we don’t have SREs, we can adopt SRE practices by using SLOs. SLO are the foundations for SRE practices. The following practices are therefore crucial steps toward implementing SRE:

- Acknowledge that we don't want 100% reliability
- Set a reasonable SLO target. This SLO should measure the reliability that is most important for our users.
- Agree on an error budget policy that will help defend our user experience. That error budget should help to guide: (i) tactical actions to mitigate outages or to manage changes that return our system to a reliable state and (ii) longer-term prioritization of work to make the system more reliable and use less of the error budget
- Measure the SLO and commit to following the error budget policy. This commitment requires agreement from company leadership.

## SREs must have time to make tomorrow better than today
Our SRE’s initial mission is to get up to speed on the service. In order to have a positive impact, an SRE needs to understand the service’s current problems, its required toil and the engineering required to keep the system within SLOs. If the organization doesn’t already have SLOs and error budgets, our SRE needs to perform the engineering required to design and implement these tools.

Initial project work might focus on one of the following:       
- Improving monitoring so you can better understand the system when things go wrong.          
- Addressing any high-priority actions identified in recent postmortems 
- Implementing automation to reduce a specific element of toil required to run the service.

## SRE teams have the ability to regulate their workload
The team:                   
- Engages initially on a single important service.
- Engages as early as possible on the project, ideally at the design stage.
- Has input into the design, with a particular focus on defining SLOs and analyzing reliability risks inherent in the design.
- Partners with the product development team and works on features specific to reliability and integration with existing operational platforms.
- Is not expected to have operational responsibility on day one. Instead, this responsibility initially sits with the product development team or project team. This may be a significant cultural change that needs support from management.
- Has clear agreement on the conditions that a service must meet to be onboarded by SRE.

Also, the teams needs to agree on an acceptable level of toil, appropriate alerting thresholds, and important and relevant SRE practices. It needs to become self-sufficient at proactively identifying the challenges ahead of the service and setting medium- and long-term goals to improve the service.

## Example of SLO document and Error Budget
- [SLO Document](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/app01.html)
- [Error Budget Policy](https://learning.oreilly.com/library/view/the-site-reliability/9781492029496/app02.html)

---
## Site Reliability Engineering Principles
[https://medium.com/@alexbmeng/site-reliability-engineering-principals-fd52229bfcd6](https://medium.com/@alexbmeng/site-reliability-engineering-principals-fd52229bfcd6)

### Automation
- Everything should be completely automated.
- If an existing process cannot be automated, it will be replaced.
- If a proposed process cannot be automated, it will be rejected.
- The SRE’s job is to automate themselves out of a job. In practice this means constantly automating menial tasks and moving on to solve more interesting problems.

### Ephemerality
- Servers are ephemeral. They can and will go away at any time.
- Servers live in auto-scaling groups that self-heal.
- Servers have health checks that assert the health of their process(es).
- Servers boot from images that are fully equipped and operational.
- Configuration management is not run against existing servers. It is used only to create images.

### Application servers are stateless.
- Engineers are ephemeral. They can and will go away at any time.
- Engineering workloads are shared. There are no individual silos.
- Engineering practices are documented. Documentation is up to date.
- All engineers have access to all codebases.

### Continuous Integration
- All code changes are made via pull requests, verified, and approved.
- All code is functionally tested, unit tested, and linted.
- Linters are extremely opinionated. Engineers should feel empowered to propose changes to the rules in isolated discussions and pull requests.
- Unit tests and linters run on every pull request, preventing merges when the build fails.
- Functional tests run on every deploy, preventing (or rolling back) deploys when the build fails.

### Continuous Deployment
- Deploys are easy, fast, safe, and frequent.
- Changes are deployed on every merge.
- Deploys do not require any human interaction or approval.
- Deploy time matters and engineers should strive to make it faster.
- Deploys can be started manually with a single button. As many engineers as possible should have access to the button.
- Rollbacks happen automatically when a failed deploy is automatically detected.
- Rollbacks are held to all the same standards as deploys.
- The master branch is the only branch that gets deployed. All git branching is for the benefit of the engineer prior to merging the changes into master.
- It is easy to tell which commit is deployed.
- There is no such thing as a code freeze.
- Features are released by feature flags. Flipping a flag does not require a deploy. A “flip freeze” is acceptable.

### Software Engineering
- SRE’s operate as software engineers, not system administrators.
- Everything is managed in code. Any change to a system is a code change.
- Code is written to be read by other engineers. It is self-documenting.
- All processes are automated with software.
- CI/CD principles apply to all SRE code.
- The entire engineering team has access to all SRE code.

### Monitoring
- All systems are monitored for critical metrics.
- Metrics are easily available and consumable in a single interface.
- Critical metrics are displayed on dashboards for each system.
- The system that does the monitoring is monitored by a separate system.

### Alerting
- When self-healing fails, engineers are intelligently notified.
- Alerts summarize the problem succinctly and include suggested actions.
- Engineers are only paged off-hours for production. Other environments may alert engineers during business hours.
- After resolving the alert as quickly as possible, the next step (during business hours) is to ensure the same alert never fires again.
- Excessive alerting is unacceptable. It is addressed immediately.

### Incident Response
- On-call engineers (both SRE’s and SE’s) feel empowered to respond in a timely manner.
- SE’s are on-call for the systems they create and own.
- SRE’s are on-call for low level systems and to assist developers.
- All escalation policies have backups or fallbacks.
- All escalation policies have rotations. No engineer is on-call for a system full time.
- Escalating is acceptable if needed. Escalation generates a follow-up task to understand why the on-call engineer could not solve the problem.

### Postmortems
- All user-facing incidents require a postmortem.
- Postmortems are blameless.
- The process for a postmortem is easy to conduct and has very little overhead. A few sentences is sometimes sufficient. A meeting is not always required.
- Postmortems are conducted reasonably soon after the incident is resolved.
- A repository of postmortems is easily accessible.

### Security
- Security is automated and baked into everything.
- Security checks run as part of CI/CD.
- Intrusion detection systems are in place.
- Identity and access management is used to gate all actions.
- As few infrastructure components as possible are publicly accessible, ideally zero.

### Supporting Services
- The default option for supporting services (logging, monitoring, alerting, etc) is externally managed and hosted. Running these services internally requires justification.
- SRE’s are constantly evaluating supporting service options, new and old. The ability to consolidate is a factor.
- Supporting services are secure, cost effective, and useful to engineers.

### People
- SRE’s and SE’s are on the same team. They are all engineers.
- SRE’s are not blockers and allow access to as many systems as possible.
- SE’s own their services and do not “throw code over the wall.”
- SRE’s are willing and able to contribute to and debug application code.
- SRE’s use and contribute to open source, if possible.
- SE’s and SRE’s work together to plan new services and architectures.
- SRE’s strive to make the lives of all engineers better through automation.


---

## Design Trade-Offs
[https://learning.oreilly.com/library/view/building-secure-and/9781492083115/ch04.html](https://learning.oreilly.com/library/view/building-secure-and/9781492083115/ch04.html)

__Feature Requirements__
Feature requirements, also known as functional requirements, identify the primary function of a service or application and describe how a user can accomplish a particular task or satisfy a particular need. They are often expressed in terms of use cases, user stories, or user journeys—sequences of interactions between a user and the service or application. Critical requirements are the subset of feature requirements that are essential to the product or service. If a design does not satisfy a critical requirement or critical user story, you don’t have a viable product.

__Reliability__
On the flip side, __Reliability__ is primarily an emergent property of the design of your system, and indeed the design of your entire development, deployment, and operations workflow. Reliability emerges from factors such as these:

- How your overall service is broken into components, such as microservices
- How your service’s availability relates to the availability/reliability of its dependencies, including service backends, storage, and the underlying platform
- What mechanisms components use to communicate (such as RPCs, message queues, or event buses), how requests are routed, and how load balancing and load shedding are implemented and configured
- How unit testing, end-to-end functional testing, production readiness reviews (PRRs), load testing, and similar validation activities are integrated in your development and deployment workflow
- How the system is monitored, and whether available monitoring, metrics, and logs provide the information necessary to detect and respond to anomalies and failures

### Google Design Document
Google uses a design document template to guide new feature design and to collect feedback from stakeholders before starting an engineering project.

The template sections pertaining to reliability and security considerations remind teams to think about the implications of their project and kick off the production readiness or security review processes if appropriate. Design reviews sometimes happen multiple quarters before engineers officially start thinking about the launch stage.

Here are the reliability- and security-related sections of the Google design document template:

__Scalability__
How does your system scale? Consider both data size increase (if applicable) and traffic increase (if applicable).

Consider the current hardware situation: adding more resources might take much longer than you think, or might be too expensive for your project. What initial resources will you need? You should plan for high utilization, but be aware that using more resources than you need will block expansion of your service.

__Redundancy and reliability__
Discuss how the system will handle local data loss and transient errors (e.g., temporary outages), and how each affects your system.

Which systems or components require data backup? How is the data backed up? How is it restored? What happens between the time data is lost and the time it’s restored?

In the case of a partial loss, can you keep serving? Can you restore only missing portions of your backups to your serving data store?

__Dependency considerations__
What happens if your dependencies on other services are unavailable for a period of time?

Which services must be running in order for your application to start? Don’t forget subtle dependencies like resolving names using DNS or checking the local time.

Are you introducing any dependency cycles, such as blocking on a system that can’t run if your application isn’t already up? If you have doubts, discuss your use case with the team that owns the system you depend on.
Data integrity
How will you find out about data corruption or loss in your data stores?

What sources of data loss are detected (user error, application bugs, storage platform bugs, site/replica disasters)?

How long will it take to notice each of these types of losses?

What is your plan to recover from each of these types of losses?

__SLA requirements__
What mechanisms are in place for auditing and monitoring the service level guarantees of your application?

How can you guarantee the stated level of reliability?

__Security and privacy considerations__
Our systems get attacked regularly. Think about potential attacks relevant for this design and describe the worst-case impact it would have, along with the countermeasures you have in place to prevent or mitigate each attack.

List any known vulnerabilities or potentially insecure dependencies.

If, for some reason, your application doesn’t have security or privacy considerations, explicitly state so and why.
Once your design document is finalized, file a quick security design review. The design review will help avoid systemic security issues that can delay or block your final security review.

> Accommodating security and reliability requirements in an existing system often requires significant design changes, major refactorings, or even partial rewrites, and can become very expensive and time-consuming. Furthermore, such changes might have to be made under time pressure in response to a security or reliability incident—but making significant design changes to a deployed system in a hurry comes with a significant risk of introducing additional flaws. It’s therefore important to consider security and reliability requirements and corresponding design tradeoffs from the early planning phases of a software project. These discussions should involve security and SRE teams, if your organization has them.
> 
## Design for Least Priviledge
[https://learning.oreilly.com/library/view/building-secure-and/9781492083115/ch05.html](https://learning.oreilly.com/library/view/building-secure-and/9781492083115/ch05.html)