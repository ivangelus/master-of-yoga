import './Dashboard.css';
import React, { useEffect } from 'react';

import { RootState } from '../redux/store';
import { updateRoutines } from '../redux/routinesSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { getRoutines } from '../services/server';

import UpdateUser from '../components/UpdateUser';
import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Modal from '../containers/Modal';

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
      <div className="dashboard-banner">
        <UserCard />
      </div>
      <div className="dashboard-content">
        <Tracks title="beginner" />
        <Tracks title="intermediate" />
        <Tracks title="advanced" />
      </div>
      <Modal>
        <UpdateUser />
      </Modal>
    </div>
  );
};

export default Dashboard;
