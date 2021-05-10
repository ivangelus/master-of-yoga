import './Dashboard.css';
import React from 'react';

import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Tips from '../containers/Tips';
import AttendanceGraph from '../components/AttendanceGraph';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-content-up">
          <UserCard />
          <Tracks title="Beginner" />
          <Tracks title="Intermediate" />
          <Tracks title="Advanced" />
        </div>
        <div className="dashboard-content-down">
          <AttendanceGraph />
          <Tips />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
