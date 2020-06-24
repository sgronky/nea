---
title: "AWS"
date: "2019-01-03"
slug: "aws"
tags: ["cloud", "notes"]
---

## Cloud account GSS
__scope__: GENARC  
__account__: generali-cloud  
__IAM User__: [francesco.giordano@generali-invest.com](francesco.giordano@generali-invest.com)  
__password__: Berlin1744  
__wiki (generale)__: [wiki](https://wiki.generali-cloud.com/)  
__wiki (genarc)__: [wiki genarc](https://gdwiki.generali-cloud.com/display/CloudInternational/GENARC+-+Sandbox+for+Generali+Investment)  
__tutorial__: [tutorial](https://gdwiki.generali-cloud.com/display/CloudInternational/Tutorials+AWS+Cloud)  

## AWS CLI
AWS provides command-line tools (__AWS CLI__) to control AWS infrastructure. For example, after signing up to AWS (https://aws.amazon.com/free/), then install AWS CLI (http://docs.aws.amazon.com/cli/latest/userguide/installing.html), then if you want to launch one Virtual Machine (EC2 instance), use AWS CLI.

## VPC and subnet
On AWS, first of all you need to create your own network; it is called __Virtual Private Cloud (VPC)__ and uses a SDN technology. AWS allows you to create one or more VPC on AWS. Each VPC may connect with each other as required. When you create a VPC, just define one network CIDR block and AWS region. For example, CIDR 10.0.0.0/16 on us-east-1. No matter if you have access to a public network or not, you can define any network address range (between /16 to /28 netmask range). VPC creation is very quick, once done to create a VPC, and then you need to create one or more subnets within VPC

```
//specify CIDR block as 10.0.0.0/16
//the result, it returns VPC ID as "vpc-66eda61f"
$ aws ec2 create-vpc --cidr-block 10.0.0.0/16
{
  "Vpc": {
   "VpcId": "vpc-66eda61f", 
   "InstanceTenancy": "default", 
   "Tags": [], 
   "State": "pending", 
   "DhcpOptionsId": "dopt-3d901958", 
   "CidrBlock": "10.0.0.0/16"
  }
}
```

Let's make the first subnet a __public__ facing subnet and the second subnet a __private__ subnet. This means the public facing subnet can be accessible from the internet, which allows it to have a public IP address. On the other hand, a private subnet can't have a public IP address. To do that, you need to set up gateways and routing tables.

_In order to make high availability for public networks and private networks, it is recommended to create at least four subnets (two public and two private on different availability zones).But to simplify examples that are easy to understand, these examples create one public and one private subnet._

## Internet gateway and NAT-GW
In most cases, your VPC needs to have a connection with the public internet. In this case, you need to create an IGW (internet gateway) to attach to your VPC.

In the following example, an IGW is created and attached to vpc-66eda61f:

```
//create IGW, it returns IGW id as igw-c3a695a5
$ aws ec2 create-internet-gateway 
{
   "InternetGateway": {
      "Tags": [], 
      "InternetGatewayId": "igw-c3a695a5", 
      "Attachments": []
   }
}
   
 
//attach igw-c3a695a5 to vpc-66eda61f
$ aws ec2 attach-internet-gateway --vpc-id vpc-66eda61f --internet-gateway-id igw-c3a695a5  
```

Once the IGW is attached, then set a routing table (default gateway) for a subnet that points to the IGW. If a default gateway points to an IGW, this subnet is able to have a public IP address and access from/to the internet. Therefore, if the default gateway doesn't point to IGW, it is determined as a private subnet, which means no public access.

```
//create route table within vpc-66eda61f
//it returns route table id as rtb-fb41a280
$ aws ec2 create-route-table --vpc-id vpc-66eda61f
{
  "RouteTable": {
   "Associations": [], 
   "RouteTableId": "rtb-fb41a280", 
   "VpcId": "vpc-66eda61f", 
   "PropagatingVgws": [], 
   "Tags": [], 
   "Routes": [
     {
      "GatewayId": "local", 
      "DestinationCidrBlock": "10.0.0.0/16", 
       "State": "active", 
       "Origin": "CreateRouteTable"
     }
   ]
  }
}

 
//then set default route (0.0.0.0/0) as igw-c3a695a5
$ aws ec2 create-route --route-table-id rtb-fb41a280 --gateway-id igw-c3a695a5 --destination-cidr-block 0.0.0.0/0
{
  "Return": true
}
 
   
//finally, update 1st subnet (subnet-d83a4b82) to use this route table
$ aws ec2 associate-route-table --route-table-id rtb-fb41a280 --subnet-id subnet-d83a4b82
{
  "AssociationId": "rtbassoc-bf832dc5"
}
   
 
//because 1st subnet is public, assign public IP when launch EC2
$ aws ec2 modify-subnet-attribute --subnet-id subnet-d83a4b82 --map-public-ip-on-launch  
```

On the other hand, the second subnet, although a private subnet, does not need a public IP address, however, a private subnet sometimes needs to access the internet. For example, download some packages and access the AWS service access. In this case, we still have an option to connect to the internet. It is called __Network Address Translation Gateway (NAT-GW)__.

NAT-GW allows private subnets to access the public internet through NAT-GW. Therefore, NAT-GW must be located at a public subnet, and the private subnet routing table points to NAT-GW as a default gateway. Note that in order to access NAT-GW on the public network, it needs __Elastic IP (EIP)__ attached to the NAT-GW.

## Security group
Once VPC and subnets with related gateways/routes are ready, you can create EC2 instances. However, at least one access control needs to be created beforehand, which is called a __security group__. It can define a firewall rule that ingress (_incoming network access_) and egress (_outgoing network access_).

In the following example, a security group and a rule for public subnet hosts are created that allows ssh from your machine's IP address, as well as open HTTP(80/tcp) world-wide:

_When you define a security group for public subnet, it is highly recommended it to be reviewed by a security expert. Because once you deploy an EC2 instance onto the public subnet, it has a public IP address and then everyone including crackers and bots are able to access your instances directly._

```
//create one security group for public subnet host on vpc-66eda61f
$ aws ec2 create-security-group --vpc-id vpc-66eda61f --group-name public --description "public facing host"
{
  "GroupId": "sg-7d429f0d"
}
 
   
//check your machine's public IP (if not sure, use 0.0.0.0/0 as temporary)
$ curl ifconfig.co
107.196.102.199
 
   
//public facing machine allows ssh only from your machine
$ aws ec2 authorize-security-group-ingress --group-id sg-7d429f0d --protocol tcp --port 22 --cidr 107.196.102.199/32
 
   
//public facing machine allow HTTP access from any host (0.0.0.0/0)
$ aws ec2 authorize-security-group-ingress --group-id sg-d173aea1 --protocol tcp --port 80 --cidr 0.0.0.0/0  
```

Next, create a security group for a private subnet host, that allows ssh from the public subnet host. In this case, specifing a public subnet security group ID (sg-7d429f0d) instead of a CIDR block is convenient:

```
//create security group for private subnet
$ aws ec2 create-security-group --vpc-id vpc-66eda61f --group-name private --description "private subnet host"
{
   "GroupId": "sg-d173aea1"
}
  
 
 
//private subnet allows ssh only from ssh bastion host security group
//it also allows HTTP (80/TCP) from public subnet security group
$ aws ec2 authorize-security-group-ingress --group-id sg-d173aea1 --protocol tcp --port 22 --source-group sg-7d429f0d
 
   
//private subnet allows HTTP access from public subnet security group too
$ aws ec2 authorize-security-group-ingress --group-id sg-d173aea1 --protocol tcp --port 80 --source-group sg-7d429f0d
```

## EC2 and EBS
EC2 is one important service in AWS that you can launch a VM on your VPC. Based on hardware spec (CPU, memory, and network), there are several types of EC2 instances that are available on AWS. When you launch an EC2 instance, you need to specify VPC, subnet, security group, and ssh keypair. Therefore, all of these must be created beforehand.

In addition to EC2, there is an important functionality, which is disk management. AWS provides a flexible disk management service called __Elastic Block Store (EBS)__. You may create one or more persistent data storage that can attach to an EC2 instance. From an EC2 point of view, EBS is one of HDD/SSD. Once you terminate (delete) an EC2 instance, EBS and its contents may remain and then reattach to another EC2 instance.

In the following example, one volume that has 40 GB capacity is created; and then attached to a public subnet host (instance ID i-0db344916c90fae61):

```
//create 40GB disk at us-east-1a (as same as EC2 host instance)
$ aws ec2 create-volume --availability-zone us-east-1a --size 40 --volume-type standard
{
    "AvailabilityZone": "us-east-1a", 
    "Encrypted": false, 
    "VolumeType": "standard", 
    "VolumeId": "vol-005032342495918d6", 
    "State": "creating", 
    "SnapshotId": "", 
    "CreateTime": "2017-08-16T05:41:53.271Z", 
    "Size": 40
}
 
   
//attach to public subnet host as /dev/xvdh
$ aws ec2 attach-volume --device xvdh --instance-id i-0db344916c90fae61 --volume-id vol-005032342495918d6
{
    "AttachTime": "2017-08-16T05:47:07.598Z", 
    "InstanceId": "i-0db344916c90fae61", 
    "VolumeId": "vol-005032342495918d6", 
    "State": "attaching", 
    "Device": "xvdh"
}
```

## Route 53
AWS also provides a hosted DNS service called __Route 53__. Route 53 allows you to manage your own domain name and associated FQDN to an IP address. For example, if you want to have a domain name k8s-devops.net, you can order through Route 53 to register your DNS domain.

Once registration is completed, you may receive a notification email from AWS, and then you can control this domain name via the AWS command line or a web console. Let's add one record (FQDN to IP address) that associate public.k8s-devops.net with the public facing EC2 host public IP address 54.227.197.56. To do that, get a hosted zone ID as follows:

```
$ aws route53 list-hosted-zones | grep Id
"Id": "/hostedzone/Z1CTVYM9SLEAN8",   
```

Now you get a hosted zone id as /hostedzone/Z1CTVYM9SLEAN8, so let's prepare a JSON file to update the DNS record as follows:

```
//create JSON file
$ cat /tmp/add-record.json 
```

```json
{
  "Comment": "add public subnet host",
  "Changes": [
   {
     "Action": "UPSERT",
     "ResourceRecordSet": {
       "Name": "public.k8s-devops.net",
       "Type": "A",
       "TTL": 300,
       "ResourceRecords": [
         {
          "Value": "54.227.197.56"
         }
       ]
     }
   }
  ]
}
```

```
//submit to Route53
$ aws route53 change-resource-record-sets --hosted-zone-id /hostedzone/Z1CTVYM9SLEAN8 --change-batch file:///tmp/add-record.json 

    
//a few minutes later, check whether A record is created or not
$ dig public.k8s-devops.net
    
; <<>> DiG 9.8.3-P1 <<>> public.k8s-devops.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 18609
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
    
;; QUESTION SECTION:
;public.k8s-devops.net.       IN    A
    
;; ANSWER SECTION:
public.k8s-devops.net.  300   IN    A     54.227.197.56  
```

## ELB
AWS provides a powerful software based load balancer called __Elastic Load Balancer (ELB)__. It allows you to load balance network traffic to one or multiple EC2 instances. In addition, ELB can offload SSL/TLS encryption/decryption and also supports multi-availability zone.

In the following example, an ELB is created and associated with a public subnet host nginx (80/TCP). Because ELB also needs a security group, create a new security group for ELB first:

```
$ aws ec2 create-security-group --vpc-id vpc-66eda61f --group-name elb --description "elb sg"
{
  "GroupId": "sg-51d77921"
}

$ aws ec2 authorize-security-group-ingress --group-id sg-51d77921 --protocol tcp --port 80 --cidr 0.0.0.0/0
 
    
$ aws elb create-load-balancer --load-balancer-name public-elb --listeners Protocol=HTTP,LoadBalancerPort=80,InstanceProtocol=HTTP,InstancePort=80 --subnets subnet-d83a4b82 --security-groups sg-51d77921
{
   "DNSName": "public-elb-1779693260.us-east- 
    1.elb.amazonaws.com"
}
  
 
 
$ aws elb register-instances-with-load-balancer --load-balancer-name public-elb --instances i-0db344916c90fae61
 
   
$ curl -I public-elb-1779693260.us-east-1.elb.amazonaws.com
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 3770
Content-Type: text/html
...  
```

Let's update the Route 53 DNS record public.k8s-devops.net that points to ELB. In this case, ELB already has an A record, therefore use a CNAME (alias) that points to ELB FQDN:

```
$ cat change-to-elb.json 
{
  "Comment": "use CNAME to pointing to ELB",
  "Changes": [
    {
      "Action": "DELETE",
      "ResourceRecordSet": {
        "Name": "public.k8s-devops.net",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          {
           "Value": "52.86.166.223"
          }
        ]
      }
    },
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "public.k8s-devops.net",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          {
           "Value": "public-elb-1779693260.us-east-           
1.elb.amazonaws.com"
          }
        ]
      }
    }
  ]
}
 
   
$ dig public.k8s-devops.net
    
; <<>> DiG 9.8.3-P1 <<>> public.k8s-devops.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 10278
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0
    
;; QUESTION SECTION:
;public.k8s-devops.net.       IN    A
    
;; ANSWER SECTION:
public.k8s-devops.net.  300   IN    CNAME public-elb-1779693260.us-east-1.elb.amazonaws.com.
public-elb-1779693260.us-east-1.elb.amazonaws.com. 60 IN A 52.200.46.81
public-elb-1779693260.us-east-1.elb.amazonaws.com. 60 IN A 52.73.172.171
    
;; Query time: 77 msec
;; SERVER: 10.0.0.1#53(10.0.0.1)
;; WHEN: Wed Aug 16 22:21:33 2017
;; MSG SIZE  rcvd: 134

    
$ curl -I public.k8s-devops.net
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 3770
Content-Type: text/html
...  
```

## S3
AWS provides a useful object data store service called Simple Storage Service (S3). It is not like EBS, no EC2 instance can mount as a file system. Instead, use AWS API to transfer a file to the S3. Therefore, AWS can make availability (99.999999999%) and multiple instances can access it at the same time. It is good to store non-throughput and random access sensitive files such as configuration files, log files, and data files.

In the following example, a file is uploaded from your machine to AWS S3:

```
//create S3 bucket "k8s-devops"
$ aws s3 mb s3://k8s-devops
make_bucket: k8s-devops
 
   
//copy files to S3 bucket
$ aws s3 cp add-record.json s3://k8s-devops/
upload: ./add-record.json to s3://k8s-devops/add-record.json        
$ aws s3 cp change-to-elb.json s3://k8s-devops/
upload: ./change-to-elb.json to s3://k8s-devops/change-to-elb.json  
 
   
//check files on S3 bucket
$ aws s3 ls s3://k8s-devops/
2017-08-17 20:00:21        319 add-record.json
2017-08-17 20:00:28        623 change-to-elb.json  
```

## Setup Kubernetes on AWS
We've discussed some AWS components that are quite easy to set up networks, virtual machines, and storage. Therefore, there are a variety of ways to set up Kubernetes on AWS such as __kubeadm__ (https://github.com/kubernetes/kubeadm), __kops__ (https://github.com/kubernetes/kops), and __kubespray__ (https://github.com/kubernetes-incubator/kubespray). One of the recommended ways to set up Kubernetes is using kops, which is a production grade setup tool and supports a lot of configuration. In this chapter, we will use kops to configure Kubernetes on AWS. Note that kops stands for Kubernetes operations.

Kops needs an S3 bucket that stores the configuration and status. In addition, use Route 53 to register the Kubernetes API server name, and etcd server name to the domain name system.

```
$ kops create cluster --name my-cluster.k8s-devops.net --state=s3://k8s-devops --zones us-east-1a --cloud aws --network-cidr 10.0.0.0/16 --master-size t2.large --node-size t2.medium --node-count 2 --networking calico --topology private --ssh-public-key /tmp/internal_rsa.pub --bastion --yes
    
I0818 20:43:15.022735   11372 create_cluster.go:845] Using SSH public key: /tmp/internal_rsa.pub
...
I0818 20:45:32.585246   11372 executor.go:91] Tasks: 78 done / 78 total; 0 can run
I0818 20:45:32.587067   11372 dns.go:152] Pre-creating DNS records
I0818 20:45:35.266425   11372 update_cluster.go:247] Exporting kubecfg for cluster
Kops has set your kubectl context to my-cluster.k8s-devops.net
    
Cluster is starting.  It should be ready in a few minutes. 
```

It may take around 5 to 10 minutes to fully complete after seeing the preceding messages. This is because it requires us to create the VPC, subnet, and NAT-GW, launch EC2s, then install Kubernetes master and node, launch ELB, and then update Route 53.

Once complete, kops updates ~/.kube/config on your machine points to your Kubernetes API Server. Kops creates an ELB and sets the corresponding FQDN record on Route 53 as https://api.<your-cluster-name>.<your-domain-name>/, therefore, you may run the kubectl command from your machine directly to see the list of nodes as follows:

```
$ kubectl get nodes
NAME                          STATUS         AGE       VERSION
ip-10-0-36-157.ec2.internal   Ready,master   8m        v1.7.0
ip-10-0-42-97.ec2.internal    Ready,node     6m        v1.7.0
ip-10-0-42-170.ec2.internal   Ready,node     6m        v1.7.0
```

> While setting up Kubernetes by kops, it also configures Kubernetes cloud provider as AWS. Which means when you use the Kubernetes service with LoadBalancer, it will use ELB. It also uses __Elastic Block Store (EBS)__ as its __StorageClass__.
> 
## EKS
__Amazon Elastic Container Service for Kubernetes__ (Amazon EKS) is a managed service that makes it easy for you to run Kubernetes on AWS without needing to stand up or maintain your own Kubernetes control plane. Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications.

Amazon EKS runs up-to-date versions of the open-source Kubernetes software, so you can use all the existing plugins and tooling from the Kubernetes community. Applications running on Amazon EKS are fully compatible with applications running on any standard Kubernetes environment, whether running in on-premises data centers or public clouds. This means that you can easily migrate any standard Kubernetes application to Amazon EKS without any code modification required.

## OpsWorks
__AWS OpsWorks__ is a configuration management service that provides managed instances of Chef and Puppet. Chef and Puppet are automation platforms that allow you to use code to automate the configurations of your servers. OpsWorks lets you use Chef and Puppet to automate how servers are configured, deployed, and managed across your Amazon EC2 instances or on-premises compute environments. OpsWorks has three offerings, AWS Opsworks for Chef Automate, AWS OpsWorks for Puppet Enterprise, and AWS OpsWorks Stacks.

## AWS CloudFormation
__AWS CloudFormation__ provides a common language for you to describe and provision all the infrastructure resources in your cloud environment. CloudFormation allows you to use a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all regions and accounts. This file serves as the single source of truth for your cloud environment. 
AWS CloudFormation is available at no additional charge, and you pay only for the AWS resources needed to run your applications.

## AWS Kinesis
__Amazon Kinesis__ makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. Amazon Kinesis offers key capabilities to cost-effectively process streaming data at any scale, along with the flexibility to choose the tools that best suit the requirements of your application. With Amazon Kinesis, you can ingest real-time data such as video, audio, application logs, website clickstreams, and IoT telemetry data for machine learning, analytics, and other applications. Amazon Kinesis enables you to process and analyze data as it arrives and respond instantly instead of having to wait until all your data is collected before the processing can begin.

## Amazon EMR
__Amazon EMR__ provides a managed __Hadoop framework__ that makes it easy, fast, and cost-effective to process vast amounts of data across dynamically scalable Amazon EC2 instances. You can also run other popular distributed frameworks such as Apache Spark, HBase, Presto, and Flink in EMR, and interact with data in other AWS data stores such as Amazon S3 and Amazon DynamoDB. EMR Notebooks, based on the popular Jupyter Notebook, provide a development and collaboration environment for ad hoc querying and exploratory analysis.

EMR securely and reliably handles a broad set of big data use cases, including log analysis, web indexing, data transformations (ETL), machine learning, financial analysis, scientific simulation, and bioinformatics.

## AWS Auto Scaling
__AWS Auto Scaling__ monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. Using AWS Auto Scaling, it’s easy to setup application scaling for multiple resources across multiple services in minutes. The service provides a simple, powerful user interface that lets you build scaling plans for resources including Amazon EC2 instances and Spot Fleets, Amazon ECS tasks, Amazon DynamoDB tables and indexes, and Amazon Aurora Replicas. AWS Auto Scaling makes scaling simple with recommendations that allow you to optimize performance, costs, or balance between them. If you’re already using Amazon EC2 Auto Scaling to dynamically scale your Amazon EC2 instances, you can now combine it with AWS Auto Scaling to scale additional resources for other AWS services. With AWS Auto Scaling, your applications always have the right resources at the right time.

It’s easy to get started with AWS Auto Scaling using the AWS Management Console, Command Line Interface (CLI), or SDK. AWS Auto Scaling is available at no additional charge. You pay only for the AWS resources needed to run your applications and Amazon CloudWatch monitoring fees.

## AWS ElastiCache
__Amazon ElastiCache__ offers fully managed __Redis__ and __Memcached__. Seamlessly deploy, run, and scale popular open source compatible in-memory data stores. Build data-intensive apps or improve the performance of your existing apps by retrieving data from high throughput and low latency in-memory data stores. Amazon ElastiCache is a popular choice for Gaming, Ad-Tech, Financial Services, Healthcare, and IoT apps.

It is fully managed (no hardware provisioning) and scalable (scale-in, scale-out and scale-up)

## AWS Elastic Beanstalk
__AWS Elastic Beanstalk__ is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.

You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring. At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time.

There is no additional charge for Elastic Beanstalk - you pay only for the AWS resources needed to store and run your applications.

## Amazon Redshift
__Amazon Redshift__ is a fast, scalable data warehouse that makes it simple and cost-effective to analyze all your data across your data warehouse and data lake. Redshift delivers ten times faster performance than other data warehouses by using machine learning, massively parallel query execution, and columnar storage on high-performance disk. You can setup and deploy a new data warehouse in minutes, and run queries across petabytes of data in your Redshift data warehouse, and exabytes of data in your data lake built on Amazon S3. You can start small for just $0.25 per hour and scale to $250 per terabyte per year, less than one-tenth the cost of other solutions.

Amazon Redshift supports client connections with many types of applications, including business intelligence (BI), reporting, data, and analytics tools.

When you execute analytic queries, you are retrieving, comparing, and evaluating large amounts of data in multiple-stage operations to produce a final result.

Amazon Redshift achieves efficient storage and optimum query performance through a combination of massively parallel processing, columnar data storage, and very efficient, targeted data compression encoding schemes. This section presents an introduction to the Amazon Redshift system architecture.

Amazon Redshift integrates with various data loading and ETL (extract, transform, and load) tools and business intelligence (BI) reporting, data mining, and analytics tools. Amazon Redshift is based on industry-standard PostgreSQL, so most existing SQL client applications will work with only minimal changes. 

Amazon Redshift is a relational database management system (RDBMS), so it is compatible with other RDBMS applications. Although it provides the same functionality as a typical RDBMS, including online transaction processing (OLTP) functions such as inserting and deleting data, Amazon Redshift is optimized for high-performance analysis and reporting of very large datasets.

Amazon Redshift is based on PostgreSQL 8.0.2. Amazon Redshift and PostgreSQL have a number of very important differences that you need to take into account as you design and develop your data warehouse applications

## Amazon RDS
__Amazon Relational Database Service__ (__Amazon RDS__) makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching and backups. It frees you to focus on your applications so you can give them the fast performance, high availability, security and compatibility they need.

Amazon RDS is available on several database instance types - optimized for memory, performance or I/O - and provides you with six familiar database engines to choose from, including __Amazon Aurora__, __PostgreSQL__, __MySQL__, __MariaDB__, __Oracle Database__, and __SQL Server__. You can use the __AWS Database Migration Service__ to easily migrate or replicate your existing databases to Amazon RDS.

Amazon RDS makes it easy to use replication to enhance availability and reliability for production workloads. Using the Multi-AZ deployment option, you can run mission-critical workloads with high availability and built-in automated fail-over from your primary database to a synchronously replicated secondary database. Using Read Replicas, you can scale out beyond the capacity of a single database deployment for read-heavy database workloads.

As your storage requirements grow, you can also provision additional storage. The Amazon Aurora engine will automatically grow the size of your database volume as your database storage needs grow, up to a maximum of 64 TB or a maximum you define. The MySQL, MariaDB, Oracle, and PostgreSQL engines allow you to scale up to 32 TB of storage and SQL Server supports up to 16 TB. Storage scaling is on-the-fly with zero downtime.

__Read Replicas__ make it easy to elastically scale out beyond the capacity constraints of a single DB instance for read-heavy database workloads. You can create one or more replicas of a given source DB instance and serve high-volume application read traffic from multiple copies of your data, thereby increasing aggregate read throughput. Read replicas are available in Amazon RDS for MySQL, MariaDB, and PostgreSQL as well as Amazon Aurora.

## AWS Cloud Trail
__AWS CloudTrail__ is a service that enables governance, compliance, operational auditing, and risk auditing of your AWS account. With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure. CloudTrail provides event history of your AWS account activity, including actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services. This event history simplifies security analysis, resource change tracking, and troubleshooting.

## AWS Config
__AWS Config__ is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources. Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations. With Config, you can review changes in configurations and relationships between AWS resources, dive into detailed resource configuration histories, and determine your overall compliance against the configurations specified in your internal guidelines. This enables you to simplify compliance auditing, security analysis, change management, and operational troubleshooting.

With AWS Config, you are able to continuously monitor and record configuration changes of your AWS resources. Config also enables you to inventory your AWS resources, the configurations of your AWS resources, as well as software configurations within EC2 instances at any point in time. Once change from a previous state is detected, an Amazon Simple Notification Service (SNS) notification can be delivered for you to review and take action.

## Amazon SWF
__Amazon SWF__ helps developers build, run, and scale background jobs that have parallel or sequential steps. You can think of Amazon SWF as a fully-managed state tracker and task coordinator in the Cloud.

Amazon SWF promotes a separation between the control flow of your background job's stepwise logic and the actual units of work that contain your unique business logic. This allows you to separately manage, maintain, and scale "state machinery" of your application from the core business logic that differentiates it. As your business requirements change, you can easily change application logic without having to worry about the underlying state machinery, task dispatch, and flow control.

__Amazon Simple Workflow Service__ (SWF) is a web service that makes it easy to coordinate work across distributed application components. Amazon SWF enables applications for a range of use cases, including media processing, web application back-ends, business process workflows, and analytics pipelines, to be designed as a coordination of tasks. Tasks represent invocations of various processing steps in an application which can be performed by executable code, web service calls, human actions, and scripts.

## Amazon Glue
__AWS Glue__ is a fully managed extract, transform, and load (ETL) service that makes it easy for customers to prepare and load their data for analytics. You can create and run an ETL job with a few clicks in the AWS Management Console. You simply point AWS Glue to your data stored on AWS, and AWS Glue discovers your data and stores the associated metadata (e.g. table definition and schema) in the AWS Glue Data Catalog. Once cataloged, your data is immediately searchable, queryable, and available for ETL.

## AWS SageMaker
__Amazon SageMaker__ is a fully managed machine learning service. With Amazon SageMaker, data scientists and developers can quickly and easily build and train machine learning models, and then directly deploy them into a production-ready hosted environment. It provides an integrated Jupyter authoring notebook instance for easy access to your data sources for exploration and analysis, so you don't have to manage servers. It also provides common machine learning algorithms that are optimized to run efficiently against extremely large data in a distributed environment. With native support for bring-your-own-algorithms and frameworks, Amazon SageMaker offers flexible distributed training options that adjust to your specific workflows. Deploy a model into a secure and scalable environment by launching it with a single click from the Amazon SageMaker console. Training and hosting are billed by minutes of usage, with no minimum fees and no upfront commitments.

## AWS Transfer
[...]

## AWS Batch
__AWS Batch__ enables you to run batch computing workloads on the AWS Cloud. Batch computing is a common way for developers, scientists, and engineers to access large amounts of compute resources, and AWS Batch removes the undifferentiated heavy lifting of configuring and managing the required infrastructure, similar to traditional batch computing software. This service can efficiently provision resources in response to jobs submitted in order to eliminate capacity constraints, reduce compute costs, and deliver results quickly.

As a fully managed service, AWS Batch enables you to run batch computing workloads of any scale. AWS Batch automatically provisions compute resources and optimizes the workload distribution based on the quantity and scale of the workloads. With AWS Batch, there is no need to install or manage batch computing software, which allows you to focus on analyzing results and solving problems.

## QuickSight
__Amazon QuickSight__ is a business analytics service you can use to build visualizations, perform ad hoc analysis, and get business insights from your data. It can automatically discover AWS data sources and also works with your data sources. Amazon QuickSight enables organizations to scale to hundreds of thousands of users, and delivers responsive performance by using a robust in-memory engine (SPICE).

Using Amazon QuickSight, you can do the following:
- Get started quickly – Sign in, choose a data source, and create your first visualization in minutes  
- Access data from multiple sources – Upload files, connect to AWS data sources, or use your own external data sources  
- Take advantage of dynamic visualizations – Smart visualizations are dynamically created based on the fields that you select  
- Get answers fast – Generate fast, interactive visualizations on large data sets  
- Tell a story with your data – Create data dashboards and point-in-time visuals, share insights and collaborate with others

## Athena
__Amazon Athena__ is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.

Athena is easy to use. Simply point to your data in Amazon S3, define the schema, and start querying using standard SQL. Most results are delivered within seconds. With Athena, there’s no need for complex ETL jobs to prepare your data for analysis. This makes it easy for anyone with SQL skills to quickly analyze large-scale datasets.

Athena is out-of-the-box integrated with AWS Glue Data Catalog, allowing you to create a unified metadata repository across various services, crawl data sources to discover schemas and populate your Catalog with new and modified table and partition definitions, and maintain schema versioning. You can also use Glue’s fully-managed ETL capabilities to transform data or convert it into columnar formats to optimize cost and improve performance.

## Presto
__Presto__ (or PrestoDB) is an open source, distributed SQL query engine, designed from the ground up for fast analytic queries against data of any size. It supports both non-relational sources, such as the Hadoop Distributed File System (HDFS), Amazon S3, Cassandra, MongoDB, and HBase, and relational data sources such as MySQL, PostgreSQL, Amazon Redshift, Microsoft SQL Server, and Teradata.

Presto can query data where it is stored, without needing to move data into a separate analytics system. Query execution runs in parallel over a pure memory-based architecture, with most results returning in seconds. You’ll find it used by many well-known companies like Facebook, Airbnb, Netflix, Atlassian, and Nasdaq.

Presto is a distributed system that runs on Hadoop, and uses an architecture similar to a classic massively parallel processing (MPP) database management system. It has one coordinator node working in synch with multiple worker nodes. Users submit their SQL query to the coordinator which uses a custom query and execution engine to parse, plan, and schedule a distributed query plan across the worker nodes. It is designed to support standard ANSI SQL semantics, including complex queries, aggregations, joins, left/right outer joins, sub-queries, window functions, distinct counts, and approximate percentiles.

After the query is compiled, Presto processes the request into multiple stages across the worker nodes. All processing is in-memory, and pipelined across the network between stages, to avoid any unnecessary I/O overhead. Adding more worker nodes allows for more parallelism, and faster processing.

To make Presto extensible to any data source, it was designed with storage abstraction to make it easy to build pluggable connectors. Because of this, Presto has a lot of connectors, including to non-relational sources like the Hadoop Distributed File System (HDFS), Amazon S3, Cassandra, MongoDB, and HBase, and relational sources such as MySQL, PostgreSQL, Amazon Redshift, Microsoft SQL Server, and Teradata. The data is queried where it is stored, without the need to move it into a separate analytics system.  

Presto is an open source, distributed SQL query engine designed for fast, interactive queries on data in HDFS, and others. Unlike Hadoop/HDFS, it does not have its own storage system. Thus, Presto is complimentary to Hadoop, with organizations adopting both to solve a broader business challenge. Presto can be installed with any implementation of Hadoop, and is __packaged in the Amazon EMR Hadoop distribution__.

## AWS Trusted Advisor
__AWS Trusted Advisor__ is an online tool that provides you real time guidance to help you provision your resources following AWS best practices.

Whether establishing new workflows, developing applications, or as part of ongoing improvement, take advantage of the recommendations provided by Trusted Advisor on a regular basis to help keep your solutions provisioned optimally.

## AWS MSK
__Amazon MSK__ is a fully managed service that makes it easy for you to build and run applications that use Apache Kafka to process streaming data. Apache Kafka is an open-source platform for building real-time streaming data pipelines and applications. With Amazon MSK, you can use native Apache Kafka APIs to populate data lakes, stream changes to and from databases, and power machine learning and analytics applications.

Apache Kafka clusters are challenging to setup, scale, and manage in production. When you run Apache Kafka on your own, you need to provision servers, configure Apache Kafka manually, replace servers when they fail, orchestrate server patches and upgrades, architect the cluster for high availability, ensure data is durably stored and secured, setup monitoring and alarms, and carefully plan scaling events to support load changes. Amazon MSK makes it easy for you to build and run production applications on Apache Kafka without needing Apache Kafka infrastructure management expertise. That means you spend less time managing infrastructure and more time building applications.
