import React, { Fragment } from 'react';
import './NavbarStyles.css';
import logo from './logo192.png';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const swal = require('sweetalert2')

export default function Navbar() {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem('authTokens')

  if (token) { // a token exists, meaning logged in
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
  }
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
          <ul className="main-menu">
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
            {/* <li><NavLink to="/help/">Help Desk</NavLink></li> */}
            {token === null && // not logged in
                <Fragment>
                  <li>
                    <NavLink className="nav-link" to="/login" activeClassName="active" aria-current="page">Login</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/register" activeClassName="active" aria-current="page">Register</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/help" activeClassName="active" aria-current="page">Help Desk</NavLink>
                  </li>
                </Fragment>
              }
              {token !== null && // logged in
                <Fragment>
                  <li>
                    <NavLink to="/dashboard" activeClassName="active" aria-current="page">Dashboard</NavLink>
                  </li>
                  {/* <li>
                    <a onClick={logoutUser} style={{ cursor: 'pointer' }}>Logout</a>
                  </li> */}
                  <li>
                    <NavLink onClick={logoutUser} activeClassName="active" style={{ cursor: 'pointer' }}>Logout</NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings" activeClassName="active" style={{ cursor: 'pointer' }}>Settings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/help" activeClassName="active" style={{ cursor: 'pointer' }}>Help Desk</NavLink>
                  </li>
                </Fragment>
              }
          </ul>
        </div>
      </nav>
    </>
  );
}
