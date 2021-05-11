import './LandingPage.css';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import LandingViewImage from '../assets/landing_view_image.svg';

import { updateUser } from '../redux/usersSlice';
import { openModal } from '../redux/modalSlice';
import { useAppDispatch } from '../redux/hooks';

import NavBar from '../containers/NavBar';
import Button from '../components/Button';
import Modal from '../containers/Modal';
import UserAuth from './UserAuth';

const LandingPage: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    const sessionUser = sessionStorage.getItem('yogaMasterUser');
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      dispatch(updateUser({ ...user }));
      history.push('/dashboard');
    } else dispatch(openModal());
  };

  return (
    <div className="landing-page-container">
      <NavBar />
      <div className="landing-page-content">
        <div className="landing-page-text-container">
          <h1>Master of Yoga</h1>
          <h3>Learn Yoga you will.</h3>
          <h3>Pay the premium you must.</h3>
          <Button
            onClick={handleClick}
            label="Start you shall!"
            styles={{ fontSize: '1.5rem', padding: '.75rem 1rem' }}
          />
        </div>
        <div className="landing-page-image-container">
          <img src={LandingViewImage} alt="Womam sitting in front of temple." />
        </div>
      </div>
      <Modal>
        <UserAuth />
      </Modal>
    </div>
  );
};

export default LandingPage;
