import './TrackPage.css';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

import { PoseDTO } from '../interfaces/PoseDTO';

import TrackPose from '../containers/TrackPose';

const TrackPage: React.FC = () => {
  const { level } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced';
  }>();
  const routines = useAppSelector((state: RootState) => state.routines);
  const description = routines.descriptions[level];
  const routine = routines[level];

  const title = level[0].toUpperCase() + level.slice(1);

  const history = useHistory();

  const handleClick = (): void => {
    history.push(`/pose/${level}/0`);
  };

  return (
    <div className="track-page-container">
      <div className="title__container">
        <div className="title">{title}</div>
      </div>
      <div className="level-description-paragraph">{description}</div>
      <div className="btn__start__container">
        <button onClick={handleClick} className="btn-start-routine">
          START
        </button>
      </div>
      {routine.map((routine: PoseDTO, index: number) => (
        <TrackPose key={routine.id} routine={routine} index={index} />
      ))}
      <footer className="footer__main__container">
        <div className="info__links__container">
          <p>Terms of use</p>
          <p>FAQ</p>
          <p>Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
};

export default TrackPage;
