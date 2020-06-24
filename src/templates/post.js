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
      <article className="max-w-4xl mx-auto pt-10 pb-5">
        <div className="flex flex-wrap overflow-hidden">
          <header>
            <h2 className="text-black text-5xl w-full my-1 font-semibold">{frontmatter.title}</h2>
            <span className="text-sm text-gray-800 block mb-5 uppercase font-thin">{frontmatter.date}</span>
          </header>
          <section className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
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
