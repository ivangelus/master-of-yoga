import './UserCard.css';
import React from 'react';
import { UserDTO } from '../interfaces/UserDTO';

const UserCard: React.FC = () => {
  const user: UserDTO = {
    firstName: 'Luke',
    lastName: 'SkyWalker',
    email: 'luke@email.com',
    password: '1234',
    lastEntry: 'Today',
    consecutiveDays: 5,
  };
  console.log(mockUser); // only so that linter doesn't throw an error

  return (
    <div className="user-card-container">
      <div className="user-card-left">
        <div className="profile-image"></div>
        <button className="edit-profile">Edit Profile</button>
      </div>
      <div className="user-card-right">
        <div className="title-user-name">
          <div className="user-name">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="card-content">
          <div className="email-container">
            <div className="content-description">Email</div>
            <div className="content-text">{user.email}</div>
          </div>
          <div className="last-entry-container">
            <div className="content-description">Last Entry</div>
            <div className="content-text">{user.lastEntry}</div>
          </div>
          <div className="days-container">
            <div className="content-description">Streak</div>
            <div className="content-text">{user.consecutiveDays} days!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
