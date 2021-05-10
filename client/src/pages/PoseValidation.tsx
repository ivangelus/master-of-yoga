import React, { ReactElement, useEffect, useState } from 'react';
import './PoseValidation.css';
import Camera from '../components/Camera';
import Timer from '../components/Timer';

const PoseValidation: React.FC = (): ReactElement => {
  const [loader, setLoader] = useState(0);

  let counter = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      counter += 10;
      if (counter <= 100) {
        setLoader((loader) => loader + 10);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      console.log('unmount');
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pose__validation__container">
      <Camera />
      <Timer />
      <div className="btn__container">
        <button className="pose__validation__btn">Back</button>
        <button className="pose__validation__btn">Next</button>
      </div>
      <div className="progress__bar__container">
        <div className="loader" style={{ width: loader + '%' }}></div>
      </div>
    </div>
  );
};

export default PoseValidation;
