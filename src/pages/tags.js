import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
    <div className="bg_gradient_gray h-screen">
      <Helmet title={title} />
      <Layout>
        <div className="max-w-4xl mx-auto pt-10 pb-5">
          <h2 className="text-black text-5xl w-full mb-10 font-semibold">Tags</h2>
          <ul className="list-none text-base tracking-wide leading-loose font-thin">
            {group.map(tag => (
              <li className="h-12 w-full rounded-sm shadow-md flex items-center my-2 hover:shadow-focus-red" key={tag.fieldValue}>
                <svg className="h-4 inline-block mx-2 fill-current text-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm10.54.7L9 14.25l-1.41-1.41L10.4 10 7.6 7.17 9 5.76 13.24 10l-.7.7z"/>
                </svg>
                <Link className="text-black text-lg tracking-wide font-semibold uppercase hover:text-red" to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue}
                </Link>
                <span className="text-gray">&nbsp;- posts: ({tag.totalCount})</span>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  )

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`