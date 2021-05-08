import './LandingPage.css';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import LandingViewImage from '../assets/landing_view_image.svg';

import NavBar from '../components/NavBar';
import Button from '../components/Button';

const LandingPage: React.FC = (): ReactElement => {
  const history = useHistory();

  const handleClick = (): void => {
    history.push('/enter');
  };

  return (
    <div className="landing-page-container">
      <NavBar />
      <div className="landing-page-content">
        <div className="landing-page-text-container">
          <h1>Master Yoga</h1>
          <h3>Learn Yoga you will.</h3>
          <h3>Pay the premium you must.</h3>
          <Button
            onClick={handleClick}
            label="Start you shall!"
            styles={{ fontSize: '1.5rem' }}
          />
        </div>
        <div className="landing-page-image-container">
          <img src={LandingViewImage} alt="Womam sitting in front of temple." />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
