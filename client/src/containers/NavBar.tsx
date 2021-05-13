import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { openModal } from '../redux/modalSlice';
import { useAppDispatch } from '../redux/hooks';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <div className="navbar-link-container">
        <a>LEARN MORE</a>
        <Link className="btn-navbar" to="/about">
          MEET THE TEAM
        </Link>
        <a onClick={handleClick}>SIGN IN</a>
      </div>
    </nav>
  );
};

export default NavBar;
