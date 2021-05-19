import './CreateCustomRoutine.css';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import React, { useState } from 'react';
import { updateUserInfo } from '../services/server';

import { updateUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Button from '../components/Button';
import PoseCardGrid from '../containers/PoseCardGrid';

const CreateCustomRoutine: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const routines = useAppSelector((state) => state.routines);
  const [dragPose, setDragPose] = useState<PoseDTO>();
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
  const handleOnDrag = (pose: PoseDTO) => {
    setDragPose(pose);
  };

  const handleOnDrop = (dropPose: PoseDTO) => {
    if (dragPose) {
      const indexOfPose = customTrack.findIndex(
        (pose) => pose.id === dragPose.id
      );
      console.log(indexOfPose);
      const newPosition = customTrack.findIndex(
        (pose) => pose.id === dropPose.id
      );

      const newCustomTrack = [
        ...customTrack.slice(0, indexOfPose),
        ...customTrack.slice(indexOfPose + 1),
      ];
      newCustomTrack.splice(newPosition, 0, dragPose);
      setCustomTrack(newCustomTrack);
      // setPosesArray(prevState => prevState.splice(1,indexOfPose))
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
        routine. As you do, your selection will automatically move to the top of
        the list, and you can reorder them by simply draggin and dropping them
        in place! When you are satisfied, click on &quot;Save&quot; to store
        your sequence and return to the Dashboard.
      </p>
      <PoseCardGrid
        posesArray={posesArray}
        customTrack={customTrack}
        handleClick={handleClick}
        handleOnDrag={handleOnDrag}
        handleOnDrop={handleOnDrop}
      />
    </div>
  );
};

export default CreateCustomRoutine;
