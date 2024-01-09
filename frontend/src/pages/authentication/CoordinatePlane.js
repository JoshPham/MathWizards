import React, { useEffect, useRef, useState } from 'react';
import './CoordinatePlane.css'; // Import your CSS styles here

const CoordinatePlaneComponent = () => {
  const coordinatePlaneRef = useRef();
  const clickablePointRef = useRef();
  const coordinateDisplayRef = useRef();

  const [xCor, setXCor] = useState(0);
  const [yCor, setYCor] = useState(0);

  useEffect(() => {
    generateCoordinates();
  }, []); // Run only once on component mount

  const generateCoordinates = () => {
    const newXCor = Math.floor(Math.random() * 11) * 10 - 50;
    const newYCor = Math.floor(Math.random() * 11) * 10 - 50;
    setXCor(newXCor);
    setYCor(newYCor);
    coordinateDisplayRef.current.innerText = `Click on the point (${newXCor}, ${newYCor})`;
  };

  const validateClick = (event) => {
    const relativeX = event.clientX - coordinatePlaneRef.current.getBoundingClientRect().left;
    const relativeY = event.clientY - coordinatePlaneRef.current.getBoundingClientRect().top;
  
    const clickedX = Math.round(((relativeX / coordinatePlaneRef.current.clientWidth) * 100) / 10) * 10 - 50;
    const clickedY = -Math.round(((relativeY / coordinatePlaneRef.current.clientHeight) * 100) / 10) * 10 + 50;
  
    if (xCor === clickedX && yCor === clickedY) {
      alert('Correct!');
      generateCoordinates();
    } else {
      alert(`Incorrect. Clicked: (${clickedX}, ${clickedY}). Try again.`);
    }
  };

  const updateClickablePoint = (event) => {
    const relativeX = event.clientX - coordinatePlaneRef.current.getBoundingClientRect().left;
    const relativeY = event.clientY - coordinatePlaneRef.current.getBoundingClientRect().top;

    const gridX = Math.round(((relativeX / coordinatePlaneRef.current.clientWidth) * 100) / 10) * 10 - 50;
    const gridY = (Math.round(((relativeY / coordinatePlaneRef.current.clientHeight) * 100) / 10) * 10 - 50);

    clickablePointRef.current.style.left = `${gridX + 50}%`;
    clickablePointRef.current.style.top = `${gridY + 50}%`;
  };

  return (
    <div>
      {/* Coordinate Display */}
      <h1 id="coordinate" ref={coordinateDisplayRef}></h1>
      <div id="coordinate-plane" ref={coordinatePlaneRef} onClick={validateClick} onMouseMove={updateClickablePoint}>
        {/* Axis */}
        <div className="axis horizontal-axis"></div>
        <div className="axis vertical-axis"></div>

        {/* Horizontal Grid Lines */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((top) => (
          <div key={`horizontal-${top}`} className="grid-line horizontal" style={{ top: `${top}%` }}></div>
        ))}

        {/* Vertical Grid Lines */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((left) => (
          <div key={`vertical-${left}`} className="grid-line vertical" style={{ left: `${left}%` }}></div>
        ))}

        {/* Clickable Point */}
        <div className="point" id="clickable-point" ref={clickablePointRef}></div>

        {/* Tick Labels */}
        {[
          { top: '48%', left: '51%', label: '0' },
          { top: '38%', left: '51%', label: '10' },
          { top: '28%', left: '51%', label: '20' },
          { top: '18%', left: '51%', label: '30' },
          { top: '8%', left: '51%', label: '40' },
          { top: '0%', left: '51%', label: '50' },
          { top: '58%', left: '51%', label: '-10' },
          { top: '68%', left: '51%', label: '-20' },
          { top: '78%', left: '51%', label: '-30' },
          { top: '88%', left: '51%', label: '-40' },
          { top: '98%', left: '51%', label: '-50' },
          { top: '51%', left: '38%', label: '-10' },
          { top: '51%', left: '28%', label: '-20' },
          { top: '51%', left: '18%', label: '-30' },
          { top: '51%', left: '8%', label: '-40' },
          { top: '51%', left: '0%', label: '-50' },
          { top: '51%', left: '58%', label: '10' },
          { top: '51%', left: '68%', label: '20' },
          { top: '51%', left: '78%', label: '30' },
          { top: '51%', left: '88%', label: '40' },
          { top: '51%', left: '98%', label: '50' },
        ].map(({ top, left, label }) => (
          <div key={`tick-${top}-${left}`} className="tick-label" style={{ top, left }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoordinatePlaneComponent;
