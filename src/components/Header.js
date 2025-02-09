// Header.js
import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {headerbox, navLinkText} from './layout.module.css'
import { Link } from 'gatsby';
import { useLocation } from '@reach/router'; 

const Header = () => {
  const location = useLocation(); // Get the current location
  console.log(location.pathname); // Log the current path
  return (
    <header>
        <div className={headerbox}>
        {location.pathname !== '/about/' && (
        <Link to="/" >
      <StaticImage 
        src="../images/header.jpg"
        alt="Profile picture"
        className="profileImage"
        width={50}
        height={50}
        imgStyle={{ borderRadius: '50%', objectFit: "cover", objectPosition:"center top" }}
      />
          </Link> )}
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