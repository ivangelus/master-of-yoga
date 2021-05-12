import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [timer, setTimer] = useState(60);
  let counter = 60;
  useEffect(() => {
    const interval = setInterval(() => {
      counter--;
      if (counter >= 0) {
        setTimer((timer) => timer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="webcam__timer__container">
      <div className="webcam__timer">Time left: {timer}s</div>
    </div>
  );
};

export default Timer;
