import React from 'react';
import noPageImg from '../components/noPage.png';
import './NoPage.css';

function NoPage() {
  const token = localStorage.getItem('authTokens');

  return (
    <>
      <div className="cool-style-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="text-center row">
          <div className="col-md-6">
            <img
              src={noPageImg}
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 mt-5 cool-text-container">
            <p className="fs-3 cool-title">
              <span role="img" aria-label="Oops emoji" className="text-danger">&#128565;</span> Oops! Page not found.
            </p>
            <p className="lead cool-description">The page you're looking for doesn't exist. Don't worry, let's get you back on track!</p>
            <a href={token ? 'dashboard' : 'home'} className="btn btn-primary cool-button">
              Go Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoPage;
