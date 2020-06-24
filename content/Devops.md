---
title: "DevOps"
date: "2020-05-20"
slug: "devops"
tags: ["enterprise-architecture", "notes"]
---

## Devops Stack
- __Jenkins__ / __Bamboo__ / __Gitlab__ (CD / CI) _OK_
- __GIT__ (Software Repository) _OK_
- __Kubernates__ (Container Orchestration) 
- __Helm__
- __Docker__ (Container) 
- __Artifactory__ (Repository Management)
- __Nexus__ (Repository Management) _OK_
- __SonarQube__ (Quality) _OK_
- __Chef__ (Configuration Management)
- __Puppet__ (Configuration Management)
- __ELK__ (Monitoring) _OK_
- __Prometheus__ (Monitoring) _OK_
- __Terraform__ (Infrastructure as Code) _OK_
- __Ansible__ (Configuration Management) _OK_
- __Grafana__ (Analytics & Monitoring) _OK_
- __Graphite__ (Analytics & Monitoring)  
- __Gradle__ (Package Manager) _OK_
- __Maven__ (Package Manager)
- __JIRA__ (Software Development Tool)

## Grafana
__Grafana__ allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data driven culture.

- From heatmaps to histograms. Graphs to geomaps. Grafana has a plethora of visualization options to help you understand your data, beautifully.  
- Seamlessly define alerts where it makes sense — while you’re in the data. Define thresholds visually, and get notified via Slack, PagerDuty, and more.  
- Bring your data together to get better context. Grafana supports dozens of databases, natively. Mix them together in the same Dashboard.  

Grafana supports over 30 open source and commercial data sources (ElasticSearch, Prometheus, AWSCloudWatch)

## Graphite
__Graphite__ is an enterprise-ready monitoring tool that runs equally well on cheap hardware or Cloud infrastructure. Teams use Graphite to track the performance of their websites, applications, business services, and networked servers. It marked the start of a new generation of monitoring tools, making it easier than ever to store, retrieve, share, and visualize time-series data.

Graphite consists of 3 software components:
- __carbon__ - a Twisted daemon that listens for time-series data  
- __whisper__ - a simple database library for storing time-series data (similar in design to RRD)  
- __graphite webapp__ - A Django webapp that renders graphs on-demand using Cairo  

Feeding in your data is pretty easy, typically most of the effort is in collecting the data to begin with. As you send datapoints to Carbon, they become immediately available for graphing in the webapp. The webapp offers several ways to create and display graphs including a simple URL API for rendering that makes it easy to embed graphs in other webpages.

## Prometheus
__Prometheus__ is an open-source systems monitoring and alerting toolkit originally built at _SoundCloud_. Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company. To emphasize this, and to clarify the project's governance structure, Prometheus joined the Cloud Native Computing Foundation in 2016 as the second hosted project, after Kubernetes.

Prometheus's main features are:  
- a multi-dimensional data model with __time series__ data identified by metric name and key/value pairs  
- __PromQL__, a flexible query language to leverage this dimensionality  
- __no reliance on distributed storage__; single server nodes are autonomous  
- time series collection happens via a __pull model over HTTP__  
- pushing time series is supported via an __intermediary gateway__  
- targets are discovered via __service discovery__ or static configuration  
- multiple modes of __graphing and dashboarding__ support  

## Terraform
__Terraform__ is a tool for building, changing, and versioning infrastructure safely and efficiently. Terraform can manage existing and popular service providers as well as custom in-house solutions.

Configuration files describe to Terraform the components needed to run a single application or your entire datacenter. Terraform generates an execution plan describing what it will do to reach the desired state, and then executes it to build the described infrastructure. As the configuration changes, Terraform is able to determine what changed and create incremental execution plans which can be applied.

The infrastructure Terraform can manage includes low-level components such as compute instances, storage, and networking, as well as high-level components such as DNS entries, SaaS features, etc.

__Infrastructure as Code__  
Infrastructure is described using a high-level configuration syntax. This allows a blueprint of your datacenter to be versioned and treated as you would any other code. Additionally, infrastructure can be shared and re-used.

__Execution Plans__  
Terraform has a "planning" step where it generates an execution plan. The execution plan shows what Terraform will do when you call apply. This lets you avoid any surprises when Terraform manipulates infrastructure.

__Resource Graph__  
Terraform builds a graph of all your resources, and parallelizes the creation and modification of any non-dependent resources. Because of this, Terraform builds infrastructure as efficiently as possible, and operators get insight into dependencies in their infrastructure.

__Change Automation__  
Complex changesets can be applied to your infrastructure with minimal human interaction. With the previously mentioned execution plan and resource graph, you know exactly what Terraform will change and in what order, avoiding many possible human errors.

__Terraform vs. Chef, Puppet, etc.__
Configuration management tools install and manage software on a machine that already exists. Terraform is not a configuration management tool, and it allows existing tooling to focus on their strengths: bootstrapping and initializing resources.

Using __provisioners__, Terraform enables any configuration management tool to be used to setup a resource once it has been created. Terraform focuses on the higher-level abstraction of the datacenter and associated services, without sacrificing the ability to use configuration management tools to do what they do best. It also embraces the same codification that is responsible for the success of those tools, making entire infrastructure deployments easy and reliable.

## Packer
__Packer__ is an open source tool for creating identical machine images for multiple platforms from a single source configuration. Packer is lightweight, runs on every major operating system, and is highly performant, creating machine images for multiple platforms in parallel. Packer does not replace configuration management like Chef or Puppet. In fact, when building images, Packer is able to use tools like Chef or Puppet to install software onto the image.

A machine image is a single static unit that contains a pre-configured operating system and installed software which is used to quickly create new running machines. Machine image formats change for each platform. Some examples include AMIs for EC2, VMDK/VMX files for VMware, OVF exports for VirtualBox, etc.

## Ansible
__Ansible__ is a radically simple IT automation engine that automates cloud provisioning, configuration management, application deployment, intra-service orchestration, and many other IT needs.

Designed for multi-tier deployments since day one, Ansible models your IT infrastructure by describing how all of your systems inter-relate, rather than just managing one system at a time.

It uses no agents and no additional custom security infrastructure, so it's easy to deploy - and most importantly, it uses a very simple language (YAML, in the form of Ansible Playbooks) that allow you to describe your automation jobs in a way that approaches plain English.

__EFFICIENT ARCHITECTURE__
Ansible works by connecting to your nodes and pushing out small programs, called "Ansible modules" to them. These programs are written to be resource models of the desired state of the system. Ansible then executes these modules (over SSH by default), and removes them when finished.

Your library of modules can reside on any machine, and there are no servers, daemons, or databases required. Typically you'll work with your favorite terminal program, a text editor, and probably a version control system to keep track of changes to your content.

## Consul
__Consul__ is a service mesh solution providing a full featured control plane with service discovery, configuration, and segmentation functionality. Each of these features can be used individually as needed, or they can be used together to build a full service mesh. Consul requires a data plane and supports both a proxy and native integration model. Consul ships with a simple built-in proxy so that everything works out of the box, but also supports 3rd party proxy integrations such as Envoy.

The key features of Consul are:

- __Service Discovery__: Clients of Consul can register a service, such as api or mysql, and other clients can use Consul to discover providers of a given service. Using either DNS or HTTP, applications can easily find the services they depend upon.

- __Health Checking__: Consul clients can provide any number of health checks, either associated with a given service ("is the webserver returning 200 OK"), or with the local node ("is memory utilization below 90%"). This information can be used by an operator to monitor cluster health, and it is used by the service discovery components to route traffic away from unhealthy hosts.

- __KV Store__: Applications can make use of Consul's hierarchical key/value store for any number of purposes, including dynamic configuration, feature flagging, coordination, leader election, and more. The simple HTTP API makes it easy to use.

- __Secure Service Communication__: Consul can generate and distribute TLS certificates for services to establish mutual TLS connections. Intentions can be used to define which services are allowed to communicate. Service segmentation can be easily managed with intentions that can be changed in real time instead of using complex network topologies and static firewall rules.

- __Multi Datacenter__: Consul supports multiple datacenters out of the box. This means users of Consul do not have to worry about building additional layers of abstraction to grow to multiple regions.

Consul is designed to be friendly to both the DevOps community and application developers, making it perfect for modern, elastic infrastructures.

## Helm
__Helm__ is a _package manager_ that allows to install complex applications such as Wordpress, Hadoop or Gitlab onto Kubernetes clusters – including dependencies such as a database.

In principle, Helm is to Kubernetes what yum or aptitude is to Linux. But a package can be installed multiple times.

The packages are called __Helm Charts__ and consist of the Kubernetes resources as templates in YAML format, a configuration file values.yaml with the default settings of the chart, a list of dependencies to other Helm charts and some more metadata such as name and version.

Further configuration can be handed over to Helm in the form of additional YAMLs which then overwrite the defaults.

Concrete resource descriptions are generated from the templates and the default values ​​as well as from the transferred configuration and are sent to Kubernetes. Kubernetes then creates resources such as docker containers, storage volumes and so on.
With your own Helm chart for self-written applications, you can put a description of the required runtime conditions into code – how many instances should run, what are the memory requirements, what other containers should run in parallel as sidecars, which databases are needed and how should they be configured, which endpoints should be reachable from the outside, should the application run permanently or only daily at 4 am, how to determine whether the application is still running and when is it ready to receive traffic etc. – and that’s of course all configurable for different types of environments.

Deployments in the dev environment on the laptop and deployments in the prod environment in the cloud may differ only in the configuration YAML.

## CloudFoundry
__Cloud Foundry__ is an open source cloud application platform, providing a choice of clouds, developer frameworks, and application services. Cloud Foundry makes it faster and easier to build, test, deploy, and scale applications. It is an open source project and is available through a variety of private cloud distributions and public cloud instances.

Cloud Foundry (CF) has become the industry standard. It is an open source platform that you can deploy to run your apps on your own computing infrastructure, or deploy on an IaaS like AWS, vSphere, or OpenStack. You can also use a PaaS deployed by a commercial CF cloud provider. A broad community contributes to and supports Cloud Foundry. The platform’s openness and extensibility prevent its users from being locked into a single framework, set of app services, or cloud.

Cloud Foundry is ideal for anyone interested in removing the cost and complexity of configuring infrastructure for their apps. Developers can deploy their apps to Cloud Foundry using their existing tools and with zero modification to their code.

Clouds balance their processing loads over multiple machines, optimizing for efficiency and resilience against point failure. A Cloud Foundry installation accomplishes this at three levels:

1. __BOSH__ creates and deploys virtual machines (VMs) on top of a physical computing infrastructure, and deploys and runs Cloud Foundry on top of this cloud. To configure the deployment, BOSH follows a manifest document.

2. The __CF Cloud Controller__ runs the apps and other processes on the cloud’s VMs, balancing demand and managing app lifecycles.

3. The __router__ routes incoming traffic from the world to the VMs that are running the apps that the traffic demands, usually working with a customer-provided load balancer.

## Docker
See: [Docker Docs](https://docs.docker.com/)

__Docker__ is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.

Docker provides the ability to package and run an application in a loosely isolated environment called a container. The isolation and security allow you to run many containers simultaneously on a given host. Containers are lightweight because they don’t need the extra load of a hypervisor, but run directly within the host machine’s kernel. This means you can run more containers on a given hardware combination than if you were using virtual machines.

__Docker Engine__ is a _client-server application_ with these major components:  
- A server which is a type of long-running program called a daemon process (the `dockerd` command).  
- A REST API which specifies interfaces that programs can use to talk to the daemon and instruct it what to do.  
- A command line interface (CLI) client (the `docker` command).  

A __Docker registry__ stores __Docker images__. __Docker Hub__ is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default. You can even run your own private registry. If you use __Docker Datacenter__ (__DDC__), it includes __Docker Trusted Registry__ (__DTR__).

When you use the `docker pull` or `docker run` commands, the required images are pulled from your configured registry. When you use the `docker push` command, your image is pushed to your configured registry.

An __image__ is a read-only template with instructions for creating a Docker container. Often, an image is based on another image, with some additional customization. For example, you may build an image which is based on the ubuntu image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.

You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

A __container__ is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker API or CLI. You can connect a container to one or more networks, attach storage to it, or even create a new image based on its current state.

By default, a container is relatively well isolated from other containers and its host machine. You can control how isolated a container’s network, storage, or other underlying subsystems are from other containers or from the host machine.

A container is defined by its image as well as any configuration options you provide to it when you create or start it. When a container is removed, any changes to its state that are not stored in persistent storage disappear.

Services allow you to scale containers across multiple Docker daemons, which all work together as a __swarm__ with multiple _managers_ and _workers_. Each member of a swarm is a Docker daemon, and the daemons all communicate using the Docker API. A service allows you to define the desired state, such as the number of replicas of the service that must be available at any given time. By default, the service is load-balanced across all worker nodes. To the consumer, the Docker service appears to be a single application.

Docker can build images automatically by reading the instructions from a `Dockerfile`. A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image. Using `docker build` users can create an automated build that executes several command-line instructions in succession.

__Compose__ (Docker) is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. The features of Compose that make it effective are:

- Multiple isolated environments on a single host  
- Preserve volume data when containers are created  
- Only recreate containers that have changed  
- Variables and moving a composition between environments  

The __Compose file__ provides a way to document and configure all of the application’s service dependencies (databases, queues, caches, web service APIs, etc). Using the Compose command line tool you can create and start one or more containers for each dependency with a single command (`docker-compose up`).

__Docker Machine__ is a tool that lets you install Docker Engine on virtual hosts, and manage the hosts with docker-machine commands. You can use Machine to create Docker hosts on your local Mac or Windows box, on your company network, in your data center, or on cloud providers like Azure, AWS, or DigitalOcean.

Using `docker-machine` commands, you can _start_, _inspect_, _stop_, and _restart_ a managed host, upgrade the Docker client and daemon, and configure a Docker client to talk to your host.

Machine was the only way to run Docker on Mac or Windows previous to Docker v1.12. Starting with the beta program and Docker v1.12, __Docker Desktop for Mac__ and __Docker Desktop for Windows__ are available as native apps and the better choice for this use case on newer desktops and laptops. 

Typically, you install Docker Machine on your local system. Docker Machine has its own command line client docker-machine and the Docker Engine client, docker. You can use Machine to install Docker Engine on one or more virtual systems. These virtual systems can be local (as when you use Machine to install and run Docker Engine in VirtualBox on Mac or Windows) or remote (as when you use Machine to provision Dockerized hosts on cloud providers). The Dockerized hosts themselves can be thought of, and are sometimes referred to as, managed “machines”.


---
## Immutable Infrastructure Using Packer, Ansible, and Terraform
See: [itnext.io](https://itnext.io/immutable-infrastructure-using-packer-ansible-and-terraform-7ca6f79582b8)

__Immutable infrastructure__ is all about immutable components which are recreated and replaced instead of updating after infrastructure creation. Immutable infrastructure reduces the number of places where things can go wrong. This helps reduce inconsistency and improve reliability in the deployment process. Updating a server can be lengthy, painful and things can go wrong easily. When an update is necessary for immutable infrastructure then new servers are provisioned with a preconfigured image and old servers are destroyed. We create a new machine image that is built for deployment and use it for creating new servers. In immutable infrastructure, we are moving configuration setup after server creation process to build process. As all deployments are done by new images, we can keep the history of previous releases in case of reverting to old build. This allows us to reduce deployment time, failure of configuration, scale deployments etc.

We use __terraform__ to provision our servers and then ansible on instances for configuration management. This adds time for provisioning servers as we have to wait till configuration completes. We should do configuration up front using Packer. Packer helps bake configuration into the machine image during image creation time. This helps in creating identical servers in case things go wrong. If you are new to Packer, please read my blog on packer here.

In this post, we are going to bake an AMI using __Packer__ and do configuration using __ansible__ during the baking process. We are going to deploy a static website exactly same as what we did here (Code can be found here). We are going to use same ansible code for provisioning our static website using nginx during the baking process. We need to make sure nginx is enabled in systemctl and starts on every boot so it is ready to process immediately. We are going to assign tags in bake process to AMI. This tag can be used by terraform to identify the latest AMI available and use it for EC2 instance creation. We need to provide subnet id to packer builder so it can use this subnet id while creating AMI. We are going to divide our terraform code into two parts, one which contains all network details: create VPC, subnet, and other network details. Another part which spawns our EC2 instance inside our network using AMI generated by the packer.

---
## Società di consulenza

- [https://www.reti.it/](https://www.reti.it/)
- [https://www.thoughtworks.com](https://www.thoughtworks.com)
- [https://www.xpeppers.com/](https://www.xpeppers.com/)
