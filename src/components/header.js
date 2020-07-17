import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Logo from "../../static/logo.png"

import Search from "./search"

const Header = () =>
  (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          siteSearchIndex {
            index
          }
        }
      `}

      render={data => (
        <nav className="px-6 py-2 bg-white shadow-md flex">
          <div className="flex w-1/4 bg-white justify-between items-center">
            <Link to="/">
              <img className="inline-block content-center w-32 mb-0" src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="flex w-2/4 bg-white justify-between items-center">
            <Search searchIndex={data.siteSearchIndex.index} />
          </div>
          <div className="flex w-1/4 hidden" />
        </nav>
      )}
    />
  )

export default Header
