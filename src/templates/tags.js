import React from "react"
import PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

  return (
    <div className="">
      <Helmet title="Categories" />
      <Layout>
        <div className="max-w-4xl mx-auto pt-10 pb-5 z-50">
          <h2 className="text-black text-2xl w-full mb-10 font-semibold">{tagHeader}</h2>
          <ul className="list-none text-base tracking-wide leading-loose font-thin">
            {edges.map(({ node }) => {
              const { slug, title, date } = node.frontmatter
              return (
                <li className="flex flex-col mt-2 text-black" key={slug}>
                  <Link className="text-black text-lg tracking-wide font-semibold uppercase" to={slug}>{title}</Link>
                  <span className="text-xs uppercase font-thin -mt-2">Created on {date}</span>
                </li>
              )
            })}
          </ul>
          <Link className="mt-5 block font-semibold tracking-wide" to="/tags">&gt; All tags</Link>
        </div>
      </Layout>
    </div>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`