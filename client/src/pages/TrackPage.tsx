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
      {routines.map((routine: PoseDTO) => (
        <TrackPose key={routine.id} routine={routine} />
      ))}
    </div>
  );
};

export default TrackPage;
