// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {herodescription} from '../components/layout.module.css'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle="Hey, I'm Shira!">
      <div className={herodescription}>I have a passion for observing the world around me and finding new ways to tell stories. I'm a Software Engineer and a practice Designer navigating the intersection of technology, creativity, and meaningful impact.</div>
      <div className={herodescription}>Beyond my work, I enjoy long walks, reading life stories and science books, cooking, and spending time with my family and friends. 
      </div>
      <div className={herodescription}>This website is my new project! with the vision for it to be a collection of my thoughts, projects, and passions—a space where I share my notes, ideas, and reflections on life’s ticking moments. Feel free to explore and connect!</div>
    </Layout>
  )
}

export const Head = () => <Seo title="Shira Sonigo" />

// Step 3: Export your component
export default IndexPage