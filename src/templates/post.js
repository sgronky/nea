import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Author from "../../static/author.jpg"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

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
            <div className="flex flex-row mt-4 mb-10 items-center">
              <div className="mr-3">
                <img className="w-12 h-12 object-fill object-center rounded-full border-4 border-black mb-0" src={Author} alt="author" />
              </div>
              <div className="flex-col w-auto">
                <span className="text-sm text-black block mb-0 uppercase font-thin">Created on {frontmatter.date}</span>
                {frontmatter.tags.map(tag => (
                  <Link className="text-xs px-2 mr-1 bg-yellow bg-opacity-50 rounded-full uppercase font-semibold tracking-wide" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                ))}
              </div>
            </div>
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
        tags
      }
    }
  }
`
