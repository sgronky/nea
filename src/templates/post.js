import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function Post({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <main class="max-w-4xl mx-auto pt-10 pb-5">
        <div class="flex flex-wrap overflow-hidden">
          <h2 class="text-gray-900 text-5xl w-full my-1 font-thin">{frontmatter.title}</h2>
          <span class="text-sm text-gray-800 block mb-5 uppercase font-thin">{frontmatter.date}</span>
          <div class="font-thin text-gray-900 tracking-wider leading-loose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: { eq: $slug }}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
