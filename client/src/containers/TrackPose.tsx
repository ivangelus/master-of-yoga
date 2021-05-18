import './TrackPose.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import Instructions from '../components/Instructions';
import Arrow from '../assets/BlackArrow.svg';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useAppSelector } from '../redux/hooks';

interface Props {
  routine: PoseDTO;
  index: number;
}

const TrackPose: React.FC<Props> = ({ routine, index }: Props) => {
  const history = useHistory();

  const posesCompletion = useAppSelector(
    (state) => state.users.posesCompletion
  );

  const handleClick = (): void => {
    history.push(`/posePractice/${routine.level}/${index}`);
  };

  let completionPercentage = 0;
  for (let i = 0; i < posesCompletion.length; i++) {
    if (posesCompletion[i].id === routine.id) {
      completionPercentage = posesCompletion[i].percentage;
    }
  }

  return (
    <div className="allTracks__container">
      <div className="track-pose-container">
        <img
          style={{
            height: '300px',
            width: '400px',
            objectFit: 'cover',
            borderRadius: '2rem',
          }}
          src={routine.imageAddress}
          alt="Yoga Pose"
        />
        <div className="pose-content-container">
          <div className="routine-name">
            {index + 1}. {routine.name}
          </div>
          <div className="routine-description">{routine.description}</div>
          <button onClick={handleClick} className="btn-progress-practice">
            PRACTICE
          </button>
        </div>
        <div className="progressBar-container">
          <CircularProgressbar
            value={completionPercentage}
            text={`${completionPercentage} %`}
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
                stroke: 'rgb(0, 204, 187)',
              },
              text: {
                fill: 'rgb(0, 204, 187)',
              },
            }}
            strokeWidth={10}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackPose;
