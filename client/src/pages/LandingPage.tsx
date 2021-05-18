import './LandingPage.css';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { openModal } from '../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import LearnMorePage from './LearnMorePage';
import Footer from '../components/Footer';
import NavBar from '../containers/NavBar';
import Button from '../components/Button';
import Modal from '../containers/Modal';
import UserAuth from '../components/UserAuth';

const LandingPage: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users);

  const handleClick = (): void => {
    if (user.email) history.push('/dashboard');
    else dispatch(openModal());
  };

  const btnAdditionalStyles = {
    padding: '.75rem 1rem',
    alignSelf: 'flex-start',
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-main">
        <NavBar />
        <div className="landing-page-content-container">
          <div className="landing-page-content">
            <h1>Master of Yoga</h1>
            <h3>Build strength, awareness and harmony</h3>
            <h3>in both the mind and body</h3>
            <Button
              label="GET STARTED"
              onClick={handleClick}
              styles={btnAdditionalStyles}
            />
          </div>
        </div>
        <Modal>
          <UserAuth />
        </Modal>
      </div>
      <LearnMorePage />
      <Footer />
    </div>
  );
};

export default LandingPage;
