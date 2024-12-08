import * as React from 'react'
import Layout from '../components/layout'
import Header from '../components/Header'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
      <StaticImage
        alt="Full size profile picture"
        src="../images/about.JPG"
      />
    </Layout>
  )
}

export const Head = () => <Seo title="About me" />

export default AboutPage