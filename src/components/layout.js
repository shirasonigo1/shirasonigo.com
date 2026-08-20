import * as React from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './footer'
import { container, heading, headerNav, pagebody } from './layout.module.css'

/*
 * Layout (Phase 3).
 * Slimmed down: navigation (and its mobile-menu state) moved into <Nav />, so
 * Layout just composes header + nav, the page body, and the footer.
 */
const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <div className={headerNav}>
        <Header />
        <Nav />
      </div>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        <div className={pagebody}>{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
