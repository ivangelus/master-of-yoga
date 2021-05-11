import './UserCard.css';
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

import Button from '../components/Button';

const UserCard: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.users);

  return (
    <div className="user-card-container">
      <div className="user-card-left">
        <img className="profile-image" src={user.image} />
        <Button label="Edit Profile" onClick={() => console.log('clicked')} />
      </div>
      <div className="user-card-right">
        <div className="title-user-name">
          <div className="user-name">{`Welcome ${user.firstName}!`}</div>
        </div>
        <div className="card-content">
          <p>
            Last Entry:{' '}
            <span>{`${new Date(user.lastEntry).toDateString()}`}</span>
          </p>
          <p>
            Streak:
            <span>
              {user.consecutiveDays > 0
                ? ` ${user.consecutiveDays} days!`
                : ' No consecutive entries'}
            </span>
          </p>
          <p>Badges:</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
