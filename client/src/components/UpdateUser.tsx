import './UpdateUser.css';
import React, { useState } from 'react';
import { storage } from '../services/firebase';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateUser } from '../redux/usersSlice';

import { UserDTO } from '../interfaces/UserDTO';
import { updateUserInfo } from '../services/server';

type Update = Pick<UserDTO, 'firstName' | 'lastName' | 'password' | 'image'>;

const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users);
  const [image, setImage] = useState<File>();
  const [update, setUpdate] = useState<Update>({
    firstName: user.firstName,
    lastName: user.lastName,
    password: '',
    image: '',
  });

  const valueChange = (
    target: keyof Update,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newUpdate = update;
    newUpdate[target] = event.target.value;
    if (event.target.files && target === 'image')
      setImage(event.target.files[0]);
    setUpdate({ ...newUpdate });
  };

  const clickHandler = async (target: keyof Update): Promise<void> => {
    const updateResponse = document.getElementById('update-response');
    let updatedUser: UserDTO = user;
    const info: Partial<Update> = {};
    if (update[target] && update[target] != '') {
      info[target] = update[target];
      if (target === 'image' && image) {
        // const { token } = await auth.currentUser.getIdTokenResult();
        const snapshot = await storage.ref(`/images/${image.name}`).put(image);
        const imageUrl = await snapshot.ref.getDownloadURL();
        info[target] = imageUrl;
      }

      updatedUser = await updateUserInfo(info);
      dispatch(updateUser(updatedUser));
      if (updateResponse) {
        updateResponse.textContent = 'Update Successful!';
        setTimeout(() => {
          updateResponse.textContent = ' ';
        }, 3000);
      } else alert('Update Successful!');
    }
  };

  return (
    <div>
      <h1 className="update-header">Update User Details</h1>
      <div className="update-fields">
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            value={update.firstName}
            onChange={(event) => valueChange('firstName', event)}
          ></input>
          <button
            className="update-btn"
            onClick={() => clickHandler('firstName')}
          >
            Update
          </button>
        </label>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            value={update.lastName}
            onChange={(event) => valueChange('lastName', event)}
          ></input>
          <button
            className="update-btn"
            onClick={() => clickHandler('lastName')}
          >
            Update
          </button>
        </label>
        {/* <label htmlFor="password">
          Password:
          <input
            type="password"
            value={update.password}
            onChange={(event) => valueChange('password', event)}
          ></input>
          <button
            className="update-btn"
            onClick={() => clickHandler('password')}
          >
            Update
          </button>
        </label> */}
        <label htmlFor="image">
          Profile Image:
          <input
            id="profile-image"
            type="file"
            value={update.image}
            onChange={(event) => valueChange('image', event)}
          ></input>
          <button className="update-btn" onClick={() => clickHandler('image')}>
            Update
          </button>
        </label>
        <h2 id="update-response"> </h2>
      </div>
    </div>
  );
};

export default UpdateUser;
