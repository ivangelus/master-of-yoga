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
  const [getReadyHidden, setGetReadyHidden] = useState(true);
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
    console.log(timerOn);
    function startLogic() {
      setTimerOn((previous) => !previous);
      setProgressCounterOn((previous) => !previous);
      setGetReadyHidden(true);
      console.log('start logic done');
    }
    if (Number(index) === 0 && !timerOn) {
      setTimeout(startLogic, 15000);
      setGetReadyHidden(false);
    } else if (Number(index) !== 0) {
      startLogic();
    } else if (timerOn) {
      console.log('here');
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
    setGetReadyHidden(true);
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
            setGetReadyHidden(false);
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
    <div className="wrapper">
      <div className="container">
        <div className="container_top">
          <Camera
            poseName={routines[Number(index)].id}
            setPoseOK={setPoseOk}
            source={routines[Number(index)].imageAddress}
            alt={routines[Number(index)].name}
          />
        </div>
        <div className="container_bottom">
          <div className="container_bottom_left">
            <div className="webcam__timer">Time left: {time}s</div>
          </div>
          <div className="container_bottom_middle">
            <div className="container_bottom_middle_btns_top">
              <button onClick={handleStart} className="btn_left">
                {startPauseText()}
              </button>
              <button onClick={handleReset} className="btn_right">
                Reset
              </button>
            </div>
            <div className="container_bottom_middle_btns_bottom">
              <button onClick={handleBack} className="btn_left">
                Back
              </button>
              <button onClick={handleNext} className="btn_right">
                Next
              </button>
            </div>
          </div>
          <div className="container_bottom_right">
            <div className="container_bottom_right_top">
              <div className="loader_wrapper">
                <div
                  className="loader"
                  style={{ width: progress + '%', transition: 'width 2s' }}
                ></div>
              </div>
            </div>
            <div className="container_bottom_right_bottom">
              <GetReadyMarker isHidden={getReadyHidden} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoseValidation;
