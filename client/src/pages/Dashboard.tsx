import './Dashboard.css';
import React from 'react';

import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Tips from '../containers/Tips';
import AttendanceGraph from '../components/AttendanceGraph';

import DashboardViewImage from '../assets/dashboard_view_image.svg';

const Dashboard: React.FC = () => {
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
