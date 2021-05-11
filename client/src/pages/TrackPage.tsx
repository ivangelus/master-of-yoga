import './TrackPage.css';
import React from 'react';
import { useParams } from 'react-router-dom';
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

  return (
    <div className="track-page-container">
      <div className="title">{title}</div>
      <div className="level-description-paragraph">{description}</div>
      <button className="btn-start-routine">START</button>
      {routine.map((routine: PoseDTO, index: number) => (
        <TrackPose key={routine.id} routine={routine} index={index} />
      ))}
    </div>
  );
};

export default TrackPage;
