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
    const increment = 1.6;
    const interval = setInterval(() => {
      counter += increment;
      if (counter <= 100) {
        console.log(counter)
        setLoader((loader) => loader + increment);
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
          <div className="readyMessage">Get Ready!</div>
          <div className="readyCounter">{ready}</div>
        </div>
      ) : (
        <div className = "pose__validation__container__camera__container">
          <div className= "pose__validation__container__camera__container_left">
            <Camera />
          </div>
          <div className = "pose__validation__container__camera__container_right">
            <div className = "pose__validation__container__camera__container_right__image__container">
              <h1>This is an image container</h1>
            </div>
            <div className = "pose__validation__container__camera__container_right__content__container">
              <div className = "timer__container">
                <Timer />
              </div>
              <div className="progress__bar__container">
                <div className="loader" style={{ width: loader + '%' }}></div>
              </div>
              <div className="btn__container">
                <button className="pose__validation__btn">Back</button>
                <button className="pose__validation__btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoseValidation;
