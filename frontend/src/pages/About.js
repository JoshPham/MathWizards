// About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-us-container">
      <header>
        <h1>About Us</h1>
      </header>
      <section className="team-section">
        <h2>Our Amazing Team</h2>
        <div className="team-member">
          <img src="https://cdn-icons-png.flaticon.com/512/202/202306.png" alt="John Doe" />
          <div>
            <h3>John Doe</h3>
            <p>Software Developer & Math Tutor</p>
            <p>
              Hi, we're Math Wizard! As a math tutor, we're passionate about creating innovative
              solutions and helping students excel in math.
            </p>
          </div>
        </div>
        {/* Add more team members as needed */}
      </section>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quas perspiciatis ipsam, amet aut
          doloribus odit quae repudiandae quaerat ipsum, velit, commodi quod magni error distinctio beatae
          voluptas minima alias?
        </p>
      </section>
      <footer>
        <p>Contact us at: <a href="mailto:info@example.com">info@example.com</a></p>
      </footer>
    </div>
  );
};

export default About;
