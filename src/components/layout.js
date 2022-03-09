import React, { useState } from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <></>
      // <h1 className="main-heading">
      //   <Link to="/">{title}</Link>
      // </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        ← Home
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        Thanks to
        {` `}
        <a href="https://www.gatsbyjs.com">GatsbyJS</a>
      </footer>
    </div>
  )
}

export default Layout