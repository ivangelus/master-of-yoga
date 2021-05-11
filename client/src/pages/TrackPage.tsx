import './TrackPage.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

import { PoseDTO } from '../interfaces/PoseDTO';

import TrackPose from '../containers/TrackPose';
import { BaseRoutinesDTO } from '../interfaces/RoutineDTO';

const TrackPage: React.FC = () => {
  const { level } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced';
  }>();
  const routines = useAppSelector((state: RootState) => state.routines);
  const description = routines.descriptions[level];
  const routine = routines[level];

  return (
    <div>
      {routine.map((routine: PoseDTO) => (
        <TrackPose key={routine.id} routine={routine} />
      ))}
    </div>
  );
};

export default TrackPage;
