import './CustomTrack.css';
import './Tracks.css';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppSelector } from '../redux/hooks';

import CircularProgressBar from '../components/CircularProgressBar';
import Button from '../components/Button';

const buttonAdditionalStyles = {
  marginBottom: '2rem',
  fontSize: '1.2rem',
  width: '5rem',
};

const CustomTrack: React.FC = () => {
  const history = useHistory();
  const user = useAppSelector((state) => state.users);
  const customTrack = user.customTracks;

  const handleStartClick = (): void => {
    history.push('trackPage/custom');
  };

  const handleCreateTrack = (): void => {
    history.push('createRoutine');
  };

  return (
    <div className="tracks-container">
      {customTrack && customTrack.length > 1 ? (
        <>
          <h2>CUSTOM TRACK</h2>
          <CircularProgressBar progress={30} />
          <p>{`${0} out of ${customTrack.length}\npositions mastered!`}</p>
          <div className="custom-track-buttons">
            <Button
              label="START"
              onClick={handleStartClick}
              styles={buttonAdditionalStyles}
            />
            <Button
              label="New Track"
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
