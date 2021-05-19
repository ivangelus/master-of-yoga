import './Dashboard.css';
import React, { useEffect } from 'react';

import { RootState } from '../redux/store';
import { updateRoutines } from '../redux/routinesSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { getRoutines } from '../services/server';
import { useHistory } from 'react-router-dom';

import { updateUserInfo } from '../services/server';

import CustomTrack from '../containers/CustomTrack';
import UpdateUser from '../components/UpdateUser';
import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Modal from '../containers/Modal';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector((state: RootState) => state.routines);
  const history = useHistory();
  const posesCompletion = useAppSelector(
    (state) => state.users.posesCompletion
  );

  useEffect(() => {
    if (routine.intermediate.length === 0) {
      (async (): Promise<void> => {
        const data = await getRoutines();
        dispatch(updateRoutines(data));
      })();
    }
    if (history.location.state) {
      updateUserInfo({ posesCompletion });
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
        <CustomTrack />
      </div>
      <Modal>
        <UpdateUser />
      </Modal>
      <Footer />
    </div>
  );
};

export default Dashboard;
