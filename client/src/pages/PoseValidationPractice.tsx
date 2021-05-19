import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changeCurrentPose } from '../redux/currentPoseSlice';
import { updatePoseCompletion } from '../redux/usersSlice';
import { useParams, useHistory } from 'react-router-dom';
import React, { ReactElement, useState } from 'react';
import { RootState } from '../redux/store';

import GetReadyMarker from '../components/GetReadyMarker';
import Camera from '../components/Camera';
import './PoseValidationPractice.css';

const PoseValidation: React.FC = (): ReactElement => {
  const { level, index } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced';
    index: string;
  }>();

  const timeLimit = 60;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const routines = useAppSelector((state: RootState) => state.routines[level]);

  const [time, setTime] = useState(timeLimit);
  const [progress, setProgress] = useState(0);
  const [poseOk, setPoseOk] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [getReadyHidden, setGetReadyHidden] = useState(true);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const handleBack = (): void => {
    if (index !== '0') {
      setProgress(0);
      setTime(timeLimit);
      dispatch(changeCurrentPose(routines[Number(index) - 1].id));
      history.push(`/posePractice/${level}/${Number(index) - 1}`);
    }
  };

  const handleNext = (): void => {
    if (Number(index) < routines.length - 1) {
      setTimerOn(false);
      setTime(timeLimit);
      setProgress(0);
      dispatch(changeCurrentPose(routines[Number(index) + 1].id));
      history.push(`/posePractice/${level}/${Number(index) + 1}`);
    } else history.push('/dashboard', { update: false });
  };

  const handleStart = (): void => {
    function startLogic() {
      setTimerOn((previous) => !previous);
      setGetReadyHidden(true);
    }

    if (time === timeLimit && !timerOn) {
      setTimeout(startLogic, 15000);
      setGetReadyHidden(false);
    } else if (Number(index) !== 0) {
      startLogic();
    } else if (timerOn) {
      startLogic();
    }
  };

  const handleReset = (): void => {
    setProgress(0);
    setTimerOn(false);
    setTime(timeLimit);
  };

  React.useEffect(() => {
    let interval: number | undefined;

    if (timerOn) {
      clearInterval(interval);
      interval = window.setInterval(() => {
        setTime((prevTime: number): number => {
          let newTime: number;
          if (prevTime <= 0) {
            newTime = 0;
            clearInterval(interval);
          } else {
            newTime = prevTime - 1;
          }
          return newTime;
        });

        if (time <= 0) setTimerOn(false);
      }, 1000);
    } else if (!timerOn || time <= 0) {
      clearInterval(interval);
      setTimerOn(false);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  React.useEffect(() => {
    let progressInterval: number | undefined;
    const scoreIncrement = 100 / (timeLimit - 10);

    if (poseOk && progress < 100 && timerOn) {
      clearInterval(progressInterval);
      progressInterval = window.setInterval(() => {
        setProgress((prevProgress: number): number => {
          let newProgress: number;
          if (prevProgress >= 100) newProgress = 100;
          else newProgress = prevProgress + scoreIncrement;
          return newProgress;
        });

        if (progress >= 100) setProgress(100);
      }, 1000);
    } else if (!poseOk || progress >= 100) {
      clearInterval(progressInterval);
    }

    return () => clearInterval(progressInterval);
  }, [poseOk]);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, [width, height]);

  function startPauseText() {
    if (timerOn) return 'Stop';
    return 'Start';
  }

  if (time === 0 && progress > 0) {
    dispatch(
      updatePoseCompletion({
        id: routines[Number(index)].id,
        percentage: progress,
      })
    );
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
            width={width}
            height={height}
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
