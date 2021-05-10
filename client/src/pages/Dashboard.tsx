import './Dashboard.css';
import React, { useEffect } from 'react';

import { updateRoutines } from '../redux/routinesSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { RootState } from '../redux/store';

import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Tips from '../containers/Tips';

import { getRoutines } from '../services/server';

import DashboardViewImage from '../assets/dashboard_view_image.svg';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector((state: RootState) => state.routines);

  useEffect(() => {
    console.log(Object.keys(routine).length === 0);
    if (Object.keys(routine).length === 0) {
      const fetchRoutines = async (): Promise<void> => {
        const data = await getRoutines();
        dispatch(updateRoutines(data));
      };
      fetchRoutines();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-content-up">
          <UserCard />
          <Tips />
        </div>
        <div className="dashboard-content-down">
          <Tracks title="Beginner" />
          <Tracks title="Intermediate" />
          <Tracks title="Advanced" />
          <div className="dashboard-page-image-container">
            <img src={DashboardViewImage} alt="Woman standing yoga pose" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
