<img style="width:50%" src="./static/logo.png" alt="Logo" />

# Notes of an Enterprise Architect

Just a simple example of a __personal blog website__ to store and read personal notes, done using [Gatsby](https://www.gatsbyjs.org/) as a site generator. You can copy markdown files directly in the `content` folder and, as a result of a static build, the contents are rendered as pages that can be read and navigated through a content page. To easily index the files, a searchbox is also added, with a built-in search functionalities that look for specific front-matter metadata inside the files.

## Notes on build
The project has been kicked off using [Hello World Tailwind CSS](https://www.gatsbyjs.org/starters/ohduran/gatsby-starter-hello-world-tailwind-css/)  as hello-world boilerplate. This starter ships with some basic configuration files of Gatsby and with the [Tailwind CSS](https://tailwindcss.com/) boilerplate.

## Gatsby's Plugins
The website makes use of `gatsby-transformer-remark`, to transform the markdown files inside the `content` directory. Each file should present a front-matter with the fields in the following example:

```
title: "Analytics and Big Data"
date: "2020-01-20"
slug: "analytics-and-big-data"
tags: ["enterprise-architecture", "notes"]
```

In particular, `slug`represents the relative path inside the website and `tags` is a list of tags to be assigned to the document, to facilitate the search.

To easily implement the search functionality, `gatsby-plugin-elasticlunr-search` is used. It helps building up a static index by using the metadata inside each file. 

Finally, the website is rendered as a PWA. To do that, Gatsby recomends to employ in tandem `gatsby-plugin-manifest` (to generate favicon icons and a webmanifest file) and `gatsby-plugin-offline`, to install and manage a service worker for the application.

## Compile, build and deploy
To make unnecessary the installation of Gatsby to perform the build, a [docker image](https://www.docker.com/) is used, following the approach indicated in [this article](https://github.com/gatsbyjs/gatsby-docker). This way, the process of compiling, building and deploying the application is just a matter of executing the following three commands:

```sh
docker build -t docker_user/nea .
docker push docker_user/nea
docker run --rm -p 80:80 sgronky/nea
```

The container configures and executes an NGINX server to serve the website.