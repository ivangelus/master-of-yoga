import React, { useState, useEffect, ReactElement } from 'react';
import './Timer.css';

const Timer = (): ReactElement => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    // countdownTimer(60, 1000);
  }, []);

  return (
    <div className="webcam__timer__container">
      <div className="webcam__timer">Time left: {time}s</div>
    </div>
  );
};

export default Timer;
