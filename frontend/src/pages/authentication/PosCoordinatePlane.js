import React, { useEffect, useRef, useState } from 'react';
import './PosCoordinatePlane.css'; // Import your CSS styles here

const PosCoordinatePlane = () => {
  const positivePlaneRef = useRef();
  const clickablePointRef = useRef();
  const numberRef = useRef();

  const [xCor, setXCor] = useState(0);
  const [yCor, setYCor] = useState(0);

  useEffect(() => {
    generateCoordinates();
  }, []); // Run only once on component mount

  const generateCoordinates = () => {
    const newXCor = Math.floor(Math.random() * 6) * 10;
    const newYCor = Math.floor(Math.random() * 6) * 10;
    setXCor(newXCor);
    setYCor(newYCor);
    numberRef.current.innerText = `Click on the point (${newXCor}, ${newYCor})`;
  };

  const updateClickablePoint = (event) => {
    const rect = positivePlaneRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    clickablePointRef.current.style.left = `${offsetX - (offsetX % (rect.width / 5))}px`;
    clickablePointRef.current.style.top = `${offsetY - (offsetY % (rect.height / 5))}px`;
  };

  const validateClick = (event) => {
    const rect = positivePlaneRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const snappedX = Math.round(offsetX / (rect.width / 5)) * 10;
    const snappedY = -Math.round(offsetY / (rect.height / 5)) * 10  + 50;

    if (xCor === snappedX && yCor === snappedY) {
      alert('Correct!');
      generateCoordinates();
    } else {
      alert(`Incorrect. Clicked: (${snappedX}, ${snappedY}). Try again.`);
    }
  };

  return (
    <div>
      {/* Number Display */}
      <h1 className="number" ref={numberRef}></h1>
      <div id="positive-plane" ref={positivePlaneRef} onClick={validateClick} onMouseMove={updateClickablePoint}>
        {/* Horizontal Grid Lines and Labels */}
        {[0, 20, 40, 60, 80].map((top) => (
          <div key={top} className="grid-line horizontal" style={{ top: `${top}%` }}></div>
        ))}

        {/* Vertical Grid Lines and Labels */}
        {[0, 20, 40, 60, 80].map((left) => (
          <div key={left} className="grid-line vertical" style={{ left: `${left}%` }}></div>
        ))}

        {/* Tick Labels */}
        {[
          { top: '100%', left: '-4%', label: '0' },
          { top: '18%', left: '-4%', label: '40' },
          { top: '38%', left: '-4%', label: '30' },
          { top: '58%', left: '-4%', label: '20' },
          { top: '78%', left: '-4%', label: '10' },
          { top: '0%', left: '-4%', label: '50' },
          { top: '100%', left: '18%', label: '10' },
          { top: '100%', left: '38%', label: '20' },
          { top: '100%', left: '58%', label: '30' },
          { top: '100%', left: '78%', label: '40' },
          { top: '100%', left: '98%', label: '50' },
        ].map(({ top, left, label }) => (
          <div key={`${top}-${left}`} className="tick-label" style={{ top, left }}>
            {label}
          </div>
        ))}

        {/* Clickable Point */}
        <div className="clickable-point" id="clickable-point" ref={clickablePointRef}></div>
      </div>
    </div>
  );
};

export default PosCoordinatePlane;
