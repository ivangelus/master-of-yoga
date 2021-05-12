import React, { ReactElement, useEffect, useState } from 'react';
import { css } from '@emotion/core';
import './PoseValidation.css';
import Camera from '../components/Camera';
import Timer from '../components/Timer';
import HashLoader from 'react-spinners/HashLoader';

const PoseValidation: React.FC = (): ReactElement => {
  const [loader, setLoader] = useState(0);
  const [loading, setLoading] = useState(true);
  const [poseCounter, setPoseCounter] = useState(0);
  const [startPauseText, setStartPausetext] = useState('Start');
  const [readyCounter, setReadyCounter] = useState(5);

  const increment = 1.6;

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  function counter() {
    console.log('____________ here _______________________');
    const interval = setInterval(() => {
      if (!loading && poseCounter < 100)
        setPoseCounter((previous: number) => ++previous);
      if (poseCounter > 100) setPoseCounter(100);
      if (poseCounter <= 100) {
        setLoader((loader) => loader + increment);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="pose__validation__container">
      {loading ? (
        <div className="messageContainer">
          <HashLoader
            color={'red'}
            loading={loading}
            css={override}
            size={250}
          />
        </div>
      ) : (
        <div className="pose__validation__container__camera__container">
          <div className="pose__validation__container__camera__container_left">
            <Camera />
          </div>
          <div className="pose__validation__container__camera__container_right">
            <div className="pose__validation__container__camera__container_right__image__container">
              <h1>This is an image container</h1>
            </div>
            <div className="pose__validation__container__camera__container_right__content__container">
              <div className="timer__container">
                <Timer />
              </div>
              <div className="progress__bar__container">
                <div className="loader" style={{ width: loader + '%' }}></div>
              </div>
              <div className="btn__container">
                <button className="pose__validation__btn">Back</button>
                <button className="pose__validation__btn">
                  {startPauseText}
                </button>
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
