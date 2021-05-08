import React from 'react';
import './NavBar.css';

import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar-container">
      <Link to="/about">Meet the Team</Link>
      <Link to="/enter">Sign In</Link>
    </nav>
  );
};

export default NavBar;
