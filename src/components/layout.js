import * as React from 'react'
import { Link } from 'gatsby'
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
  navLinkTextactive, 
  hamburgerIcon, 
  mobileNavActive
} from './layout.module.css'
import { FaGithub, FaLinkedin, FaTimes, FaBars } from 'react-icons/fa';  // Import the GitHub icon
import CV from '../CV/ShiraSonigoCV.pdf'

const Layout = ({ pageTitle, children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };  



  return (
    <div className={container}>
      <div className={headerNav}>
        <Header />
        <nav>
        <ul
            className={`${navLinks} ${
              isMobileMenuOpen ? mobileNavActive : ''
            }`}
          >
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
        <a href={CV} download className={navLinkText}>
          CV
        </a>
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
          <button className={hamburgerIcon} onClick={toggleMenu}>
          {isMobileMenuOpen ? <FaTimes style={{ color: 'black'}} /> : <FaBars style={{ color: 'black'}} />}
        </button>
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