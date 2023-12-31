import React, { useState } from 'react';
import './NavbarStyles.css';
import logo from './logo192.png';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  let boxClass = ["main-menu"];

  return (
    <>
      <nav>
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="LOGO" />
            <span>Math Wizards</span>
          </NavLink>
          <div className="item-2"></div>
        </div>
        <div className="menu">
          <ul className={boxClass.join(' ')}>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li>
              <NavLink to="/grades/" id="grade">Grades ⮟</NavLink>
              <ul className="dropdown">
                <li className='menu-item'><NavLink to="/grades/0/">Kindergarten</NavLink></li>
                <li className='menu-item'><NavLink to="/grades/1/">First Grade</NavLink></li>
                <li className='menu-item'><NavLink to="/grades/2/">Second Grade</NavLink></li>
                <li className='menu-item'><NavLink to="/grades/3/">Third Grade</NavLink></li>
                <li className='menu-item'><NavLink to="/grades/4/">Fourth Grade</NavLink></li>
                <li className='menu-item'><NavLink to="/grades/5/">Fifth Grade</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/help/">Help Desk</NavLink></li>
            <li><NavLink to="/login/">Login</NavLink></li>
            <li><NavLink to="/register/">Register</NavLink></li>
            <li><NavLink to="/settings/">Settings</NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  );
}
