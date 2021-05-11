import React, { ReactElement, useEffect, useState } from 'react';
import './PoseValidation.css';
import Camera from '../components/Camera';
import Timer from '../components/Timer';

const PoseValidation: React.FC = (): ReactElement => {
  const [loader, setLoader] = useState(-50);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(5);

  let counter = -50;
  let readyCounter = 5;
  useEffect(() => {
    const interval = setInterval(() => {
      counter += 10;
      if (counter <= 100) {
        setLoader((loader) => loader + 10);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading((loading) => !loading);
    }, 5000);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      readyCounter--;
      if (readyCounter > 0) {
        setReady((ready) => ready - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  return (
    <div className="pose__validation__container">
      {loading ? (
        <div className="messageContainer">
          <p className="readyMessage">Get Ready!</p>
          <p className="readyCounter">{ready}</p>
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default PoseValidation;
