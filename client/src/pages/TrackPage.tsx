import './TrackPage.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

import { PoseDTO } from '../interfaces/PoseDTO';

import TrackPose from '../containers/TrackPose';
import { BaseRoutinesDTO } from '../interfaces/RoutineDTO';

const TrackPage: React.FC = () => {
  const { level } = useParams<{ level: keyof BaseRoutinesDTO }>();
  const routines = useAppSelector((state: RootState) => state.routines[level]);

  const title = level[0].toUpperCase() + level.slice(1);

  return (
    <div className="track-page-container">
      <div className="title">{title}</div>
      <div className="level-description-paragraph">
        Designed for those who have had no previous exposure to yoga, but are
        eager to learn and start experiencing the amazing benefits of a yoga
        practice. The beginner student needs slow-paced direction and a great
        level of detail so they can become familiar with basic yoga poses and
        use of the breath.
      </div>
      {routines.map((routine: PoseDTO) => (
        <TrackPose key={routine.id} routine={routine} />
      ))}
    </div>
  );
};

export default TrackPage;
