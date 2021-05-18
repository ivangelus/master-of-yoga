import React, { ReactElement } from 'react';
import './Footer.css';
import facebookIcon from '../assets/facebook-24.png';
import instagramIcon from '../assets/instagram-24.png';
import twitterIcon from '../assets/twitter-24.png';
import linkedInIcon from '../assets/linkedin-3-24.png';

const Footer: React.FC = (): ReactElement => {
  return (
    <div className="footer-container">
      <div className="footer-left-container">
        <div className="footer-logo"></div>
      </div>
      <div className="footer-right-container">
        <div className="additional-info-container">
          <div className="additional-info">Terms of Use</div>
          <div className="additional-info">FAQ</div>
          <div className="additional-info">Privacy Policy</div>
        </div>
        <div className="social-network-container">
          <img src={facebookIcon} className="social-network" />
          <img src={instagramIcon} className="social-network" />
          <img src={twitterIcon} className="social-network" />
          <img src={linkedInIcon} className="social-network" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
