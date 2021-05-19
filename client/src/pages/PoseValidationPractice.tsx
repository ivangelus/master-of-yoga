import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changeCurrentPose } from '../redux/currentPoseSlice';
import { updatePoseCompletion } from '../redux/usersSlice';
import { useParams, useHistory } from 'react-router-dom';
import React, { ReactElement, useState } from 'react';
import { RootState } from '../redux/store';

import GetReadyMarker from '../components/GetReadyMarker';
import Camera from '../components/Camera';
import Button from '../components/Button';
import './PoseValidation.css';

const btnAdditionalStyles = {
  width: '40%',
  fontSize: '1.5rem',
  margin: '.25rem',
};

const PoseValidationPractice: React.FC = (): ReactElement => {
  const { level, index } =
    useParams<{
      level: 'beginner' | 'intermediate' | 'advanced';
      index: string;
    }>();

  const timeLimit = 60;
  const height = window.innerHeight;
  const width = window.innerWidth * 0.7;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const routines = useAppSelector((state: RootState) => state.routines[level]);

  const [time, setTime] = useState(timeLimit);
  const [progress, setProgress] = useState(0);
  const [poseOk, setPoseOk] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [getReadyHidden, setGetReadyHidden] = useState(true);

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
    <div className="pose-val-wrapper">
      <div className="pose-val-container-left">
        <Camera
          poseName={routines[Number(index)].id}
          setPoseOK={setPoseOk}
          width={width}
          height={height}
        />
      </div>
      <div className="pose-val-container-right">
        <div className="pose-val-image-container">
          <img
            src={routines[Number(index)].imageAddress}
            alt={routines[Number(index)].name}
          />
        </div>
        <div className="pose-val-loader-wrapper">
          <p>Pose Mastery</p>
          <div
            className="pose-val-loader"
            style={{ width: progress + '%', transition: 'width 2s' }}
          ></div>
        </div>
        <div className="pose-val-webcam-timer">Time left: {time}s</div>
        <div className="container-bottom-right-bottom">
          <GetReadyMarker isHidden={getReadyHidden} />
        </div>
        <div className="pose-val-btns-top">
          <Button
            label={startPauseText()}
            onClick={handleStart}
            styles={btnAdditionalStyles}
          />
          <Button
            label="Reset"
            onClick={handleReset}
            styles={btnAdditionalStyles}
          />
        </div>
        <div className="pose-val-btns-bottom">
          <Button
            label="Back"
            onClick={handleBack}
            styles={btnAdditionalStyles}
          />
          <Button
            label="Next"
            onClick={handleNext}
            styles={btnAdditionalStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default PoseValidationPractice;
