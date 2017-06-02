import React from 'react';
import './footer.scss';

const Footer = () => (
  <footer>
    <small className="footer-text">
      Created by
      <a className="link" href="https://www.alexmdodge.ca"> Alex Dodge </a>
    </small>

    <a
      href="https://github.com/alexmdodge/grid-grind"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-github"
    >
      <i className="fa fa-github" />
    </a>
    <a
      href="https://www.paypal.me/AlexDodge"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-paypal"
    >
      <i className="fa fa-coffee" />
    </a>
    <small className="footer-text">
      2017
    </small>
  </footer>
);

export default Footer;
