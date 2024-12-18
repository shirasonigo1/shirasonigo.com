import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  headerNav,
  pagebody, 
  navLinkTextactive
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={container}>
      <div className={headerNav}>
        <Header />
        <nav>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/about" className={navLinkText}  activeClassName={navLinkTextactive}>
                About Me
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/projects" className={navLinkText}  activeClassName={navLinkTextactive}>
                Projects
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/blog" className={navLinkText}  activeClassName={navLinkTextactive}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
      <div className={pagebody}> {children}</div> 
      </main>
    </div>
  )
}

export default Layout