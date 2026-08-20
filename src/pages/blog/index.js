import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Coming soon!">
    </Layout>
  )
}


export const Head = ({ location }) => <Seo title="My Blog Posts" pathname={location.pathname} />

export default BlogPage