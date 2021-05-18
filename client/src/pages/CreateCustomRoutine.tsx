import './CreateCustomRoutine.css';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import React, { useEffect, useState } from 'react';
import { updateUserInfo } from '../services/server';

import { updateUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Button from '../components/Button';
import PoseCardGrid from '../containers/PoseCardGrid';

const CreateCustomRoutine: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const routines = useAppSelector((state) => state.routines);
  const [customTrack, setCustomTrack] = useState<PoseDTO[]>([]);
  const [posesArray, setPosesArray] = useState<PoseDTO[]>([
    ...routines['beginner'],
    ...routines['intermediate'],
    ...routines['advanced'],
  ]);

  const handleClick = (checkBox: HTMLInputElement, pose: PoseDTO) => {
    if (checkBox.checked) {
      setCustomTrack([...customTrack, pose]);
      setPosesArray(posesArray.filter((pose) => pose.id !== checkBox.value));
    } else {
      setCustomTrack(customTrack.filter((pose) => pose.id !== checkBox.value));
      setPosesArray([...posesArray, pose]);
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
        posesArray={posesArray}
        customTrack={customTrack}
        handleClick={handleClick}
      />
    </div>
  );
};

export default CreateCustomRoutine;
