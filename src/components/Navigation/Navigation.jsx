import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';


const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/"><img src="/logo.png" alt="Logo" /></Link> 
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cards">Word Cards</Link></li>
        <li><Link to="/facts">Interesting Facts</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
