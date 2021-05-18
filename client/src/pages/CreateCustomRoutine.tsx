import './CreateCustomRoutine.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import { updateUserInfo } from '../services/server';

import { updateUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import PoseCard from '../containers/PoseCard';
import Button from '../components/Button';
import PoseCardGrid from '../containers/PoseCardGrid';

const CreateCustomRoutine: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const routines = useAppSelector((state) => state.routines);
  let customTrack: PoseDTO[] = [];
  let routineArray = [
    ...customTrack,
    ...routines['beginner'],
    ...routines['intermediate'],
    ...routines['advanced'],
  ];

  const handleClick = (checkBox: HTMLInputElement) => {
    const poseId = checkBox.value;
    if (checkBox.checked) {
      routineArray.forEach((pose) =>
        pose.id === poseId ? customTrack.push(pose) : {}
      );
      routineArray = routineArray.filter((pose) => pose.id !== poseId);
    } else {
      customTrack = customTrack.filter((pose) => pose.id !== poseId);
    }
  };

  const handleSave = async () => {
    dispatch(updateUser({ customTracks: customTrack }));
    updateUserInfo({ customTracks: customTrack });
    history.push('dashboard');
  };

  const handleBack = () => {
    history.push('dashboard');
  };

  return (
    <div className="custom-routine-container">
      <div className="custom-routine-header">
        <h2>Create your Routine!</h2>
        <Button label="Save" onClick={handleSave} />
        <Button label="Back" onClick={handleBack} />
      </div>
      <p>
        Click on the cards below to add or remove them from your personalized
        routine. When you are satisfied, click on &quot;Save&quot; to store your
        sequence and return to the Dashboard.
      </p>
      <PoseCardGrid
        posesArray={routineArray}
        customTrack={customTrack}
        handleClick={handleClick}
      />
    </div>
  );
};

export default CreateCustomRoutine;
