// Footer.js
import React from 'react';
import {footerSection} from './layout.module.css'
import {Link } from 'gatsby'

const Footer = () => {
  return (
    <footer>
        <section className={footerSection}>
            <div className="madeby">Crafted with ❤️ by Shira Sonigo</div>
        </section>
</footer>
  );
};

export default Footer;