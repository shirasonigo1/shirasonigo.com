// Header.js
import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {headerbox, navLinkText} from './layout.module.css'
import { Link } from 'gatsby';

const Header = () => {
  return (
    <header>
        <div className={headerbox}>
        <Link to="/" >
      <StaticImage 
        src="../images/about.JPG"
        alt="Profile picture"
        className="profileImage"
        width={50}
        height={50}
        imgStyle={{ borderRadius: '50%', objectFit: "cover", objectPosition:"center" }}
      />
          </Link>
      <span>
    
       <Link to="/" className={navLinkText}  >
                Shira Sonigo
              </Link> 
              </span>
      </div> 

    </header>
  );
};

export default Header;