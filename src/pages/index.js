import * as React from 'react'
import Seo from '../components/seo'
import HomeNav from '../components/home/HomeNav'
import Hero from '../components/home/Hero'
import SelectedWork from '../components/home/SelectedWork'
import AboutStrip from '../components/home/AboutStrip'
import ContactCTA from '../components/home/ContactCTA'
import HomeFooter from '../components/home/HomeFooter'
import * as s from '../components/home/home.module.css'

/*
 * Home page (redesign).
 * Deliberately does NOT use the shared <Layout>: this page has its own nav,
 * footer, palette and type system per the design references. Every other route
 * still uses Layout, so routing and the rest of the site are unchanged. Design
 * tokens are scoped to the .page wrapper so nothing leaks out.
 */
const IndexPage = () => (
  <div className={s.page}>
    <HomeNav />
    <Hero />
    <SelectedWork />
    <AboutStrip />
    <ContactCTA />
    <HomeFooter />
  </div>
)

export const Head = ({ location }) => <Seo title="Shira Sonigo" pathname={location.pathname} />

export default IndexPage
