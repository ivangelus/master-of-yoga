import 'react-circular-progressbar/dist/styles.css';
import './Tracks.css';

import React from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';

import Button from '../components/Button';
import { useAppSelector } from '../redux/hooks';
import { BaseRoutinesDTO } from '../interfaces/RoutineDTO';

interface Props {
  title: 'beginner' | 'intermediate' | 'advanced';
}

const buttonAdditionalStyles = {
  marginBottom: '2rem',
  fontSize: '1.5rem',
  width: '5rem',
};

const Tracks: React.FC<Props> = ({ title }: Props) => {
  const history = useHistory();
  const routine = useAppSelector((state) => state.routines[title]);

  const handleClick = (): void => {
    history.push(`trackPage/${title.toLowerCase()}`);
  };

  return (
    <div className="tracks-container">
      <h2>{title.toUpperCase()}</h2>
      <div className="progressbar-container">
        <CircularProgressbar
          value={70}
          text={`${70} %`}
          circleRatio={0.7}
          styles={{
            trail: {
              strokeLinecap: 'butt',
              transform: 'rotate(-126deg)',
              transformOrigin: 'center center',
            },
            path: {
              strokeLinecap: 'butt',
              transform: 'rotate(-126deg)',
              transformOrigin: 'center center',
              stroke: '	#32CD32',
            },
            text: {
              fill: '#808080',
            },
          }}
          strokeWidth={10}
        />
      </div>
      <p>{`0 out of ${routine.length}\npositions mastered!`}</p>
      <Button
        label="Start"
        onClick={handleClick}
        styles={buttonAdditionalStyles}
      />
    </div>
  );
};

export default Tracks;
