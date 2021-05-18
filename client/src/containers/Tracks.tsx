import './Tracks.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';

interface Props {
  title: 'beginner' | 'intermediate' | 'advanced';
}

const buttonAdditionalStyles = {
  marginBottom: '2rem',
  fontSize: '1.2rem',
  width: '5rem',
};

const Tracks: React.FC<Props> = ({ title }: Props) => {
  const history = useHistory();

  const completedPoses = useAppSelector((state) => state.users.posesCompletion);

  let percentageSum = 0;
  let numOfPoses = 0;
  let masteredPoses = 0;
  for (let i = 0; i < completedPoses.length; i++) {
    if (completedPoses[i].level === title) {
      if (completedPoses[i].percentage === 100) {
        masteredPoses = masteredPoses + 1;
      }
      percentageSum = percentageSum + completedPoses[i].percentage;
      numOfPoses = numOfPoses + 1;
    }
  }

  const trackPercentage = Math.floor(
    (percentageSum / (numOfPoses * 100)) * 100
  );

  const handleClick = (): void => {
    history.push(`trackPage/${title.toLowerCase()}`);
  };

  return (
    <div className="tracks-container">
      <h2>{title.toUpperCase()}</h2>
      <CircularProgressBar progress={trackPercentage} />
      <p>{`${masteredPoses} out of ${numOfPoses}\npositions mastered!`}</p>
      <Button
        label="START"
        onClick={handleClick}
        styles={buttonAdditionalStyles}
      />
    </div>
  );
};

export default Tracks;
