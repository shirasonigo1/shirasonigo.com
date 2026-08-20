// Header.js
import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import { headerbox, navLinkText } from './layout.module.css';

/*
 * Header (Phase 3 cleanup).
 * Removed the stray console.log and the @reach/router useLocation special-case
 * that hid the logo only on /about — the logo now shows consistently everywhere.
 */
const Header = () => {
  return (
    <header>
      <div className={headerbox}>
        <Link to="/">
          <StaticImage
            src="../images/header.jpg"
            alt="Shira Sonigo profile picture"
            className="profileImage"
            width={50}
            height={50}
            imgStyle={{ borderRadius: '50%', objectFit: "cover", objectPosition: "center top" }}
          />
        </Link>
        <span>
          <Link to="/" className={navLinkText}>
            Shira Sonigo
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
