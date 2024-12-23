// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      {/* <p>I'm making this by following the Gatsby Tutorial.</p> */}
    </Layout>
  )
}

export const Head = () => <Seo title="Shira Sonigo" />

// Step 3: Export your component
export default IndexPage