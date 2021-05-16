import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changeCurrentPose } from '../redux/currentPoseSlice';
import GetReadyMarker from '../components/GetReadyMarker';
import { useParams, useHistory } from 'react-router-dom';
import React, { ReactElement, useState } from 'react';
// import HashLoader from 'react-spinners/HashLoader';
import { RootState } from '../redux/store';
import Camera from '../components/Camera';
import * as tf from '@tensorflow/tfjs';
import { css } from '@emotion/core';
import './PoseValidation.css';

const PoseValidation: React.FC = (): ReactElement => {
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [timerOn, setTimerOn] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60);
  const [time, setTime] = useState(timeLimit);
  const [progress, setProgress] = useState(0);
  const [progressCounterOn, setProgressCounterOn] = useState(false);
  const history = useHistory();
  const [poseOk, setPoseOk] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<[] | number[]>([]);
  const { level, index } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced';
    index: string;
  }>();
  const prepTime = 15;
  const routines = useAppSelector((state: RootState) => state.routines[level]);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const handleBack = (): void => {
    if (index !== '0') {
      setProgress(0);
      setTime(timeLimit);
      dispatch(changeCurrentPose(routines[Number(index) - 1].id));
      history.push(`/pose/${level}/${Number(index) - 1}`);
    }
  };

  const handleNext = (): void => {
    if (Number(index) < routines.length - 1) {
      setProgressCounterOn(false);
      setTimerOn(false);
      setTime(timeLimit);
      setProgress(0);
      dispatch(changeCurrentPose(routines[Number(index) + 1].id));
      history.push(`/pose/${level}/${Number(index) + 1}`);
    } else {
      console.log(sessionProgress);
    }
  };

  const handleStart = (): void => {
    function startLogic() {
      setTimerOn((previous) => !previous);
      setProgressCounterOn((previous) => !previous);
    }
    if (Number(index) === 0) {
      setTimeout(startLogic, 15000);
    } else {
      startLogic();
    }
  };

  const handleReset = (): void => {
    setProgress(0);
    setTimerOn(false);
    setTime(timeLimit);
  };

  const handleChangePose = (): void => {
    setTimerOn(true);
    setProgressCounterOn(true);
    setSessionProgress((previous) => [...previous, progress]);
  };

  React.useEffect(() => {
    let interval: any;
    if (timerOn) {
      clearInterval(interval);
      interval = setInterval(() => {
        setTime((prevTime: number): number => {
          let newTime: number;
          if (prevTime <= 0) {
            newTime = 0;
            clearInterval(interval);
            handleNext();
            setTimeout(handleChangePose, 15000);
          } else {
            newTime = prevTime - 1;
          }
          return newTime;
        });
        if (time <= 0) {
          setTimerOn(false);
        }
      }, 1000);
    } else if (!timerOn || time <= 0) {
      clearInterval(interval);
      setTimerOn(false);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  React.useEffect(() => {
    let progressInterval: any;
    const scoreIncrement = 100 / (timeLimit - 10);
    if (poseOk && progress < 100 && timerOn) {
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        setProgress((prevProgress: number): number => {
          let newProgress: number;
          if (prevProgress >= 100) newProgress = 100;
          else newProgress = prevProgress + scoreIncrement;
          return newProgress;
        });
        if (progress >= 100) {
          setProgressCounterOn(false);
          setProgress(100);
        }
      }, 1000);
    } else if (!poseOk || progress >= 100) {
      console.log('trigger');
      clearInterval(progressInterval);
    }
    return () => clearInterval(progressInterval);
  }, [progressCounterOn, poseOk]);

  function startPauseText() {
    if (timerOn) return 'Stop';
    return 'Start';
  }

  return (
    <div className="pose__validation__container">
      {/* {loading ? (
        <div className="messageContainer">
          <HashLoader
            color={'red'}
            loading={loading}
            css={override}
            size={250}
          />
        </div>
      ) : ( */}
      <div className="pose__validation__container__camera__container">
        <div className="pose__validation__container__camera__container_left">
          <Camera poseName={routines[Number(index)].id} setPoseOK={setPoseOk} />
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
              <div className="webcam__timer__container">
                <div className="webcam__timer">Time left: {time}s</div>
                {/* <GetReadyMarker isHidden={false} /> */}
              </div>
            </div>
            <div className="progress__bar__container">
              <div
                className="loader"
                style={{ width: progress + '%', transition: 'width 2s' }}
              ></div>
            </div>
            <div className="btn__container">
              <button onClick={handleBack} className="pose__validation__btn">
                Back
              </button>
              <button onClick={handleStart} className="pose__validation__btn">
                {startPauseText()}
              </button>
              <button onClick={handleReset} className="pose__validation__btn">
                Reset
              </button>
              <button onClick={handleNext} className="pose__validation__btn">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default PoseValidation;
