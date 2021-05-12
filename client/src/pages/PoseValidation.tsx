import React, { ReactElement, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

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

  const { level, index } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced';
    index: string;
  }>();

  const routines = useAppSelector((state: RootState) => state.routines[level]);

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

  const history = useHistory();

  const handleBack = (): void => {
    history.push(`/pose/${level}/${Number(index) - 1}`);
  };

  const handleNext = (): void => {
    history.push(`/pose/${level}/${Number(index) + 1}`);
  };

  console.log('routine is here son', routines[Number(index)]);

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
              <img
                src={routines[Number(index)].imageAddress}
                alt={routines[Number(index)].name}
                style={{
                  maxHeight: '100%',
                  minHeight: '100%',
                  maxWidth: '100%',
                  minWidth: '100%',
                }}
              />
            </div>
            <div className="pose__validation__container__camera__container_right__content__container">
              <div className="timer__container">
                <Timer />
              </div>
              <div className="progress__bar__container">
                <div className="loader" style={{ width: loader + '%' }}></div>
              </div>
              <div className="btn__container">
                <button onClick={handleBack} className="pose__validation__btn">
                  Back
                </button>
                <button className="pose__validation__btn">
                  {startPauseText}
                </button>
                <button onClick={handleNext} className="pose__validation__btn">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoseValidation;
