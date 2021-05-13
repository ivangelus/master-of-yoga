import './Dashboard.css';
import React, { useEffect } from 'react';

import { RootState } from '../redux/store';
import { updateRoutines } from '../redux/routinesSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { getRoutines } from '../services/server';

import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Tips from '../containers/Tips';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector((state: RootState) => state.routines);

  useEffect(() => {
    if (routine.intermediate.length === 0) {
      (async (): Promise<void> => {
        const data = await getRoutines();
        dispatch(updateRoutines(data));
      })();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-up">
        <UserCard />
        <Tips />
      </div>
      <div className="dashboard-content-down">
        <Tracks title="beginner" />
        <Tracks title="intermediate" />
        <Tracks title="advanced" />
      </div>
    </div>
  );
};

export default Dashboard;
