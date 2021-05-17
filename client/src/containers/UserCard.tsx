import './UserCard.css';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { RootState } from '../redux/store';
import { openModal } from '../redux/modalSlice';
import { logoutUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Button from '../components/Button';

const UserCard: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.users);
  const daysLoggedIn = user.consecutiveDays;

  const dateTransform = () => {
    return moment(user.lastEntry).format('dddd, MMM Do');
  };

  const handleUpdate = () => {
    dispatch(openModal());
  };

  const handleLogOut = (): void => {
    dispatch(logoutUser());
    sessionStorage.removeItem('yogaMasterUser');
    history.push('/');
  };

  return (
    <div className="usercard__container">
      <img className="usercard__image" src={user.image}></img>
      <div className="usercard__main__container">
        <h2>{`Welcome ${user.firstName}!`}</h2>
        <div className="usercard__data__container">
          <div className="usercard__textinfo--titles">
            <p>Last Entry:</p>
            <p>Streak:</p>
            <p>Badges: </p>
          </div>
          <div className="usercard__textinfo--content">
            <p>{dateTransform()}</p>
            <p>
              {daysLoggedIn && daysLoggedIn > 0
                ? ` ${daysLoggedIn} days!`
                : ' No consecutive entries'}
            </p>
          </div>
        </div>
      </div>
      <div className="usercard__buttons__container">
        <Button
          label="EDIT PROFILE"
          onClick={handleUpdate}
          styles={{ width: '10rem', height: '3rem' }}
        />
        <Button
          label="LOG OUT"
          onClick={handleLogOut}
          styles={{
            backgroundColor: '#e74c3c',
            width: '10rem',
            height: '3rem',
          }}
        />
      </div>
    </div>
  );
};

export default UserCard;
