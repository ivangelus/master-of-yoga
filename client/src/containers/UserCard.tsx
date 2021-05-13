import './UserCard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { RootState } from '../redux/store';
import { logoutUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Button from '../components/Button';

const UserCard: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.users);

  const handleLogOut = (): void => {
    dispatch(logoutUser());
    sessionStorage.removeItem('yogaMasterUser');
    history.push('/');
  };

  return (
    <div className="user-card-container">
      <div className="user-card-left">
        <div className="profile-image-container">
          <img className="profile-image" src={user.image} />
        </div>
      </div>
      <div className="user-card-middle">
        <h3>{`Welcome ${user.firstName}!`}</h3>
        <div className="user-card-middle-content">
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
          <p>
            Badges: <span>All of them!</span>
          </p>
        </div>
      </div>
      <div className="user-card-right">
        <Button label="Edit Profile" onClick={() => console.log('clicked')} />
        <Button label="Log Out" onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default UserCard;
