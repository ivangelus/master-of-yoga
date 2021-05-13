import './LandingPage.css';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import LandingViewImage from '../assets/landing_view_image.svg';

import { openModal } from '../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import NavBar from '../containers/NavBar';
import Button from '../components/Button';
import Modal from '../containers/Modal';
import UserAuth from './UserAuth';

const LandingPage: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users);

  const handleClick = (): void => {
    if (user.email) history.push('/dashboard');
    else dispatch(openModal());
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-main">
        <NavBar />
        <div className="landing-page-content-container">
          <div className="landing-page-content">
            <h1>Master of Yoga</h1>
            <h3>Build strength, awareness and harmony in both the mind and body</h3>
          <button className="btn-landing-page-get-started" onClick={handleClick}>GET STARTED</button>
          </div>
            {/* <Button
              onClick={handleClick}
              label="Start you shall!"
              styles={{ fontSize: '1.5rem', padding: '.75rem 1rem' }}
            /> */}
          {/* <div className="landing-page-image-container">
            <img src={LandingViewImage} alt="Womam sitting in front of temple." />
          </div> */}
        </div>
        <Modal>
          <UserAuth />
        </Modal>

      </div>
    </div>
  );
};

export default LandingPage;
