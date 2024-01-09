import React, { useState } from 'react';
import './TenFrame.css'; // You can import your CSS styles here

const TenFrame = () => {
  const [clickedNum, setClickedNum] = useState(null);

  const handleSquareClick = (circleId) => {
    console.log(circleId);
    setClickedNum(circleId);
  };

  const createSquares = () => {
    const squares = [];
    for (let i = 1; i <= 10; i++) {
      const circleId = 11 - i;
      squares.push(
        <div className="square" key={circleId} onClick={() => handleSquareClick(circleId)}>
          <div className={`circle ${clickedNum === circleId ? 'circle-visible' : ''}`}></div>
        </div>
      );
    }
    return squares;
  };

  return (
    <div className='body'>
      <div id="ten-frame" className="ten-frame">
        {createSquares()}
      </div>
      <div id="numClicked">{clickedNum}</div>
    </div>
  );
};

export default TenFrame;
