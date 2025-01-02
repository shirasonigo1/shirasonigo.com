import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './footer'
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
import { FaGithub, FaLinkedin } from 'react-icons/fa';  // Import the GitHub icon

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
            <li className={navLinkItem}>
            <a href="https://github.com/shirasonigo1" target="_blank" rel="noopener noreferrer">
        <FaGithub style={{ color: 'black' , fontSize: '24px' }}/>
    </a>
            </li>
            <li className={navLinkItem}>
            <a href="https://www.linkedin.com/in/shira-sonigo-051ab3198" target="_blank" rel="noopener noreferrer">
        <FaLinkedin style={{ color: 'black', fontSize: '24px' }}/>
    </a>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
      <div className={pagebody}> {children}</div> 
      </main>
      <Footer />
    </div>
  )
}

export default Layout