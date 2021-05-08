import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { openModal } from '../redux/modalSlice';
import { useAppDispatch } from '../redux/hooks';

import UserLogin from '../pages/UserLogin';
import Modal from '../containers/Modal';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <nav className="navbar-container">
      <Link to="/about">Meet the Team</Link>
      <a style={{ cursor: 'pointer' }} onClick={handleClick}>
        Sign In
      </a>
      <Modal>
        <UserLogin />
      </Modal>
    </nav>
  );
};

export default NavBar;
