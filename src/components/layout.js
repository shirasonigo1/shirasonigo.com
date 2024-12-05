import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
// import {
//   container,
//   heading,
//   navLinks,
//   navLinkItem,
//   navLinkText,
//   siteTitle,
// } from './layout.module.css'
import '../styles/global.css'

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
    <div class="flex w-full sans-serif">
      <div class="fixed inset-0 flex justify-center">
        <div class="flex w-full max-w-7xl">
          <div class="w-full bg-white ring-1 ring-zinc-100 p-4"></div>
        </div>
      </div>
      <div class="relative flex w-full flex-col bg-gray-100 p-4">
      <nav class="pointer-events-auto hidden md:block">
        <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur ">
        <li><Link to="/" class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
              Home
            </Link> 
            </li>
            <li><Link to="/about" class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
              About
            </Link> 
            </li>
            <li><Link to="/blog" class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400">
              blog
            </Link> 
            </li>
        </ul>
      </nav>
      <main>
        <h1 >{pageTitle}</h1>
        {children}
      </main> 
      </div>
    </div>
  )
}

export default Layout