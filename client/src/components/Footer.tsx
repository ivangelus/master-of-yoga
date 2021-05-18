import React, { ReactElement } from 'react';
import './Footer.css';

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
          <div className="social-network">f</div>
          <div className="social-network">tweet</div>
          <div className="social-network">In</div>
          <div className="social-network">lIn</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
