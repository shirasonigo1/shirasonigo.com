// Header.js
import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {profileImage, headerbox} from './layout.module.css'

const Header = ({ }) => {
  return (
    <header>
        <div className={headerbox}>
      <StaticImage 
        src="../images/about.JPG"
        alt="Profile picture"
        className={profileImage}
        width={50}
        height={50}
        imgStyle={{ borderRadius: '50%' }}
      />
      </div>    
    </header>
  );
};

export default Header;