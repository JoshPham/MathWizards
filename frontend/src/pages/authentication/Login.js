import React, { useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import "./AuthStyles.css";
import blue_background from './blue.png';
const swal = require('sweetalert2');

function Login() {
  const { loginUser, isAuthenticated } = useContext(AuthContext);
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      history("/dashboard");
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    // Enable the button only if both fields are not blank
    setIsButtonDisabled(username.trim() === "" || password.trim() === "");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the username exists
    const response = await checkUsernameExists(username);
  
    if (response.exists) {
      // Username exists, proceed with login
      loginUser(username, password, handleSuccessfulLogin);
    } else {
      // Username does not exist, show an alert
      swal.fire({
        title: 'Error While Logging In',
        html: 'Username Does Not Exist',
        icon: 'error',
        toast: true,
        timer: 5001,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  
  // Function to check if the username exists
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(`http://localhost:8000/api/check-username-exists/${username}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking username existence:', error);
      return { exists: false };
    }
  };

  const handleSuccessfulLogin = () => {
    history("/dashboard");
  };

  return (
    <>
    <div className="container">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="welcome">
            <FontAwesomeIcon icon={faCubes} className="icon" />
            <span className="title">Welcome back</span>
          </div>
          <div className="sub-container">
            <div className="form-container">
              <h1 className="">Sign into your account</h1>
              <div className="">
                <label className="field-title" htmlFor="form2Example17">
                  Username
                </label>
                <br />
                <input
                  type="text"
                  id="form2Example17"
                  className="field"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="">
                <label className="field-title" htmlFor="form2Example27">
                  Password
                </label>
                <br />
                <input
                  type="password"
                  id="form2Example27"
                  className="field"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="button-div">
                <button
                  className="button"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Login
                </button>
              </div>
              <div className="account">
                <p>
                  Don't have an account?{" "}
                  <a href="/register">
                    Register here
                  </a>
                </p>
              </div>
              
            </div>
          </div>
          
        </form>
      </div>
    </div>
    <img src={blue_background} alt="login form" className="background-image"/>
    </>
  );
}

export default Login;
