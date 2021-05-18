import './NavBar.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { openModal } from '../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const NavBar: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users);

  const handleClick = () => {
    if (user.email) history.push('/dashboard');
    else dispatch(openModal());
  };

  const scroll = (): void => {
    const y = document.documentElement.clientHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <div className="navbar-link-container">
        <a onClick={scroll}>LEARN MORE</a>
        <Link className="btn-navbar" to="/about">
          MEET THE TEAM
        </Link>
        <a onClick={handleClick}>SIGN IN</a>
      </div>
    </nav>
  );
};

export default NavBar;
