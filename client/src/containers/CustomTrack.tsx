import './CustomTrack.css';
import './Tracks.css';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppSelector } from '../redux/hooks';

import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';

const buttonAdditionalStyles = {
  marginBottom: '2rem',
  fontSize: '1.2rem',
  width: '5rem',
};

const CustomTrack: React.FC = () => {
  const history = useHistory();
  const userTrack = useAppSelector((state) => state.users.customTracks);
  const completedPoses = useAppSelector((state) => state.users.posesCompletion);

  let masteredPoses = 0;
  let trackPercentage: number;
  if (userTrack && userTrack.length > 1) {
    const userPosesId = userTrack.map((pose) => pose.id);
    console.log(userPosesId);

    let percentageSum = 0;
    for (let i = 0; i < completedPoses.length; i++) {
      if (userPosesId.includes(completedPoses[i].id)) {
        if (completedPoses[i].percentage === 100) {
          masteredPoses = masteredPoses + 1;
        }
        percentageSum = percentageSum + completedPoses[i].percentage;
      }
    }

    trackPercentage = Math.ceil(
      (percentageSum / (userTrack.length * 100)) * 100
    );
  } else {
    masteredPoses = 0;
    trackPercentage = 0;
  }

  const handleStartClick = (): void => {
    history.push('trackPage/custom');
  };

  const handleCreateTrack = (): void => {
    history.push('createRoutine');
  };

  return (
    <div className="tracks-container">
      {userTrack && userTrack.length > 1 ? (
        <>
          <h2>CUSTOM TRACK</h2>
          <CircularProgressBar progress={trackPercentage || 0} />
          <p>{`${masteredPoses} out of ${userTrack.length}\npositions mastered!`}</p>
          <div className="custom-track-buttons">
            <Button
              label="START"
              onClick={handleStartClick}
              styles={buttonAdditionalStyles}
            />
            <Button
              label="NEW"
              onClick={handleCreateTrack}
              styles={buttonAdditionalStyles}
            />
          </div>
        </>
      ) : (
        <>
          <div className="create-custom-track">
            <h2>Create a Track!</h2>
            <p className="create-custom-description">
              Select among all available poses and build a routine that is just
              right for you!
            </p>
            <Button
              label="New Track"
              onClick={handleCreateTrack}
              styles={buttonAdditionalStyles}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomTrack;
