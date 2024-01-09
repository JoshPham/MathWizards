import React, { useState } from 'react';
import './NumberLine.css'; // Import your CSS file

const NumberLine = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 9) * 2);
  const totalTicks = 20;

  const displayNum = () => {
    setNumber(Math.floor(Math.random() * 9) * 2);
  };

  const validateChoice = (numID) => {
    if (Number(numID) === number) {
      alert('Correct!');
      displayNum();
    } else {
      alert('Incorrect!');
    }
  };

  const createTicksAndCircles = () => {
    const ticksAndCircles = [];

    for (let i = 0; i <= totalTicks; i += 2) {
      const tick = (
        <div key={i} className="tick" style={{ left: `${(i / totalTicks) * 100}%` }}>
          <div className="number-container">
            <div className="number" onMouseOver={() => handleHover(i)}>
              {i}
            </div>
            <div className="circle" onClick={() => validateChoice(i)}></div>
          </div>
        </div>
      );

      ticksAndCircles.push(tick);
    }

    return ticksAndCircles;
  };

  const handleHover = (i) => {
    const circle = document.getElementById(i);
    if (circle) {
      circle.innerText = '';
      circle.classList.add('visible');
    }
  };

  return (
    <div className='whole'>
      <h1 id="numberToClick">Please locate and click on the number:</h1>
      <h1 id="number">{number}</h1>
      <h3 id="notification"></h3>
      <div className="number-line">{createTicksAndCircles()}</div>
    </div>
  );
};

export default NumberLine;
