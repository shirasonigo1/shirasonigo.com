import React from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaLinkedin, FaTimes, FaBars } from 'react-icons/fa';
import CV from '../CV/ShiraSonigoCV.pdf';
import {
  navLinks,
  navLinkItem,
  navLinkText,
  navLinkTextactive,
  hamburgerIcon,
  mobileNavActive,
} from './layout.module.css';

/*
 * Nav (Phase 3).
 * Extracted from Layout so navigation (including its mobile-menu state) is
 * self-contained. Adds accessibility: labelled nav landmark, an aria-label +
 * aria-expanded hamburger toggle, and labelled external icon links.
 */
const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const toggleMenu = () => setMobileMenuOpen((open) => !open);

  return (
    <nav aria-label="Main navigation">
      <ul className={`${navLinks} ${isMobileMenuOpen ? mobileNavActive : ''}`}>
        <li className={navLinkItem}>
          <Link to="/about" className={navLinkText} activeClassName={navLinkTextactive}>
            About Me
          </Link>
        </li>
        <li className={navLinkItem}>
          <Link to="/projects" className={navLinkText} activeClassName={navLinkTextactive}>
            Projects
          </Link>
        </li>
        {/* Blog nav entry removed (Phase 4): the /blog page is still an unlisted
            "Coming soon" placeholder, so it isn't advertised until it has content. */}
        <li className={navLinkItem}>
          <a href={CV} download className={navLinkText}>
            CV
          </a>
        </li>
        <li className={navLinkItem}>
          <a
            href="https://github.com/shirasonigo1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub style={{ color: 'black', fontSize: '24px' }} />
          </a>
        </li>
        <li className={navLinkItem}>
          <a
            href="https://www.linkedin.com/in/shira-sonigo-051ab3198"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin style={{ color: 'black', fontSize: '24px' }} />
          </a>
        </li>
      </ul>
      <button
        className={hamburgerIcon}
        onClick={toggleMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <FaTimes style={{ color: 'black' }} />
        ) : (
          <FaBars style={{ color: 'black' }} />
        )}
      </button>
    </nav>
  );
};

export default Nav;
