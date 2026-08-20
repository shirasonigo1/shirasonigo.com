import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Button from '../components/ui/Button'
import { herodescription } from '../components/layout.module.css'

/*
 * Home (Phase 4 redesign).
 * Leads with the Engineer × Designer positioning as the page title, keeps
 * Shira's own copy, and adds a clear call-to-action into the work.
 */
const IndexPage = () => {
  return (
    <Layout pageTitle="Engineer × Designer">
      <div className={herodescription}>
        I have a passion for observing the world around me and finding new ways to tell
        stories. I'm a Software Engineer and a practice Designer navigating the intersection
        of technology, creativity, and meaningful impact.
      </div>
      <div className={herodescription}>
        Beyond my work, I enjoy long walks, reading life stories and science books, cooking,
        and spending time with my family and friends.
      </div>
      <div className={herodescription}>
        This website is my new project! With the vision for it to be a collection of my
        thoughts, projects, and passions—a space where I share my notes, ideas, and
        reflections on life's ticking moments. Feel free to explore and connect!
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <Button to="/projects">View my work →</Button>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Shira Sonigo" />

export default IndexPage
