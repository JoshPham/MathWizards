import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    const token = localStorage.getItem('authTokens')
  return (
    <div className="container">
      <div className="main">
        <div className="jumbotron text-center bg-primary text-white rounded-3 shadow" style={{ backgroundImage: 'linear-gradient(to right, #007BFF, #00BFFF)', padding: '50px 20px' }}>
          <h1 className="display-4 font-weight-bold">Welcome to Math Wizard</h1>
          <p className="lead">
            Experience the magic of Math Wizard, an engaging educational platform designed for grades K-5.
            Our captivating lessons and interactive activities turn learning math into a thrilling adventure,
            ensuring students build a <stro></stro>ng foundation with confidence and joy. Join us on a journey where math
            becomes exciting, accessible, and fun for every young learner.
          </p> 
          {token === null && // not logged in
            <p className="lead">
              <NavLink className="button" to="/login" role="button">
                Login
              </NavLink>
              <NavLink className="button" to="/register" role="button">
                Register
              </NavLink>
            </p>
          }
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src="./images/modules.jpg" alt="Card cap" />
                <div className="card-body">
                  <h2 className="card-title">Interactive Learning Modules</h2>
                  <p className="card-text">
                    Immerse students in our comprehensive collection of digital learning modules,
                    meticulously crafted to cover essential math concepts for grades K-5. Our user-friendly
                    platform provides a seamless exploration of mathematical principles through engaging visual
                    content, fostering a deep and intuitive understanding of key topics.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src="./images/progress.jpg" alt="Card cap" />
                <div className="card-body">
                  <b>MIGHT NOT BE COPYRIGHT FREE</b>
                  <h2 className="card-title">Personalized Progress Tracking</h2>
                  <p className="card-text">
                    Dive into our personalized progress tracking system, allowing parents and teachers
                    to monitor each student's journey. Detailed insights, assessments, and performance
                    analytics empower educators to tailor lessons to individual needs, ensuring a customized
                    and effective learning experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src="./images/practice.PNG" alt="Card cap" />
                <div className="card-body">
                  <h2 className="card-title">Engaging Resources for Practice</h2>
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti nostrum
                    sint asperiores vel eligendi tempore obcaecati facilis quaerat, sequi nesciunt
                    aliquid fugit, repellendus id tenetur doloremque eos eius magnam saepe!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
        </div>
      </div>
      
    </div>
  );
}

export default Home;