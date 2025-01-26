import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from "gatsby-plugin-image";
import {aboutpage, aboutimage, pagetext} from '../components/about.module.css'

const AboutPage = () => {
  return (
    // try floating the image to the right
    <Layout pageTitle="About Me">
      <div className={aboutpage}>
        <div className={pagetext}>
<p>Hey, I’m Shira! I’m a software engineer who started my journey in the Israeli Army as a programmer. During my service, I gained experience in different contexts and technologies. I decided to go to officer school to challenge myself and make a bigger impact in my place of service. This has become my main goal in life’s continuous journey.</p>
</div>

<div className={aboutimage}>
        <StaticImage
          alt="profile picture"
          src="../images/about.JPG"
          imgStyle={{ borderRadius: '3%', objectPosition:'bottom', float: 'right'}}
          transformOptions={{
            fit: "cover",  // Options: 'cover', 'contain', 'fill', 'inside', 'outside'
            cropFocus: "center" // Focus on the bottom part of the image (where the table might be)
          }}
          height={270}
          width={200}
        />
        </div>
</div>
<h2>My goal is to consistently create value and inspire growth.</h2>
<p> After my army service, I decided to pack a 40L bag, end my lease, and travel alone to Central America for three months. This was my first solo trip. It wasn’t an easy choice, but I did it, experiencing an amazing journey and meeting lifelong friends from all over the world.</p> 
<StaticImage
          alt="trip to gutamala"
          src="../images/gutamala.jpeg"
          width={800}
          height={600}
          imgStyle={{ borderRadius: '3%', objectPosition:'center bottom'}}
        />
        <p>After my trip, I joined Forter as a software engineer, and I couldn’t have made a better choice. I was part of the infrastructure group, where I worked with incredibly talented people who I now call friends! I contributed to projects involving K8S, multi-cloud environments, and networking. In my last year, I was part of the observability team in the UK, opening new doors to how we monitor our systems and build the right infrastructure for these challenges. I worked at Forter for three years, with a short one-month holiday to India—my second solo trip adventure!</p>
        <p> Software has always been a part of my life. I enjoy the process of learning new technical skills and developing my thinking. It all started when I developed my first Python game at 16, earning the nickname "The Python Queen" from my friend May later in life. I have always been curious about how things work from the ground up! As a kid, my favorite pastime was observing building layouts from airplanes and being amazed that someone designed it all. Being naturally observant, my mother often called me the quality control at home. </p>
        <p>During my trip to India, I discovered my passion for crafting and sketching. I started to learn by doing, exploring how I can tell a story about craft, culture, and the functionality of living through writing, sketching, and sculpting. I asked myself a lot of questions and decided to challenge them all.</p>
<StaticImage
          alt="trip to india"
          src="../images/india.jpeg"
          width={800}
          height={600}
          transformOptions={{
            fit: "cover",  // Options: 'cover', 'contain', 'fill', 'inside', 'outside'
            cropFocus: "south" // Focus on the bottom part of the image (where the table might be)
          }}
          imgStyle={{ 
            borderRadius: '3%', 
            objectPosition: 'center bottom' 
          }}
        />
<p> My journey led me to the pursue an MA / MSc in Innovation Design Engineering (IDE) at Imperial College London and the Royal College of Art, where I explore the intersection of technology, creativity, culture and impact. </p>
<h2>My aim is to work on projects that will impact the world we live in and help create a better future.</h2>
<p> Beyond work, I enjoy being active, cooking, reading books, and spending time with my family and friends. </p>

<p> Thanks for stopping by!</p>
        

    </Layout>
  )
}

export const Head = () => <Seo title="About me" />

export default AboutPage