import './TrackPage.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const TrackPage: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const routines = useAppSelector(
    (state: RootState) => state.routines[level.toLowerCase()]
  );
  return (
    <div>
      <h1>TrackPage</h1>
      <p>{level}</p>
    </div>
  );
};

export default TrackPage;
