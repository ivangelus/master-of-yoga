import './UserCard.css';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { RootState } from '../redux/store';
import { logoutUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Button from '../components/Button';

const UserCard: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.users);

  const dateTransform = () => {
    return moment(user.lastEntry).format('dddd, MMM Do');
  };

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
          <div className="middle-content-taglines">
            <p>Last Entry: </p>
            <p>Streak: </p>
            <p>Badges: </p>
          </div>
          <div className="middle-content-text">
            <p>{dateTransform()}</p>
            <p>
              {user.consecutiveDays > 0
                ? ` ${user.consecutiveDays} days!`
                : ' No consecutive entries'}
            </p>
            <p> </p>
          </div>
        </div>
      </div>
      <div className="user-card-right">
        <Button label="EDIT PROFILE" onClick={() => console.log('clicked')} />
        <Button
          label="LOG OUT"
          onClick={handleLogOut}
          styles={{ backgroundColor: 'orangered' }}
        />
      </div>
    </div>
  );
};

export default UserCard;
