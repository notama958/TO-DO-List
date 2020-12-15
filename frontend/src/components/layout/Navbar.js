import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fab fa-optin-monster" style={{ color: `black` }}></i>
          To-do list
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Mine</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
