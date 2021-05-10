import './UserLogin&Registration.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { auth, provider } from '../services/firebase';

import { authUser, createUser } from '../services/server';
import { updateUser } from '../redux/usersSlice';
import { useAppDispatch } from '../redux/hooks';

interface Form {
  [key: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const UserAuth: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<Form>(initialForm);

  const errorHandler = (errorMessage: string) => {
    const errorField = document.getElementById('form-error');
    if (errorField) errorField.textContent = errorMessage;
    else alert(errorMessage);
  };

  const checkAuth = async () => {
    console.log('here');
    const token = await firebase.auth().currentUser?.getIdToken();
    if (token) {
      const user = await authUser(token);
      if (user.valid) {
        dispatch(updateUser({ ...user.result }));
        history.push('/dashboard');
      } else throw new Error('Invalid user');
    }
  };

  const handleLoginOrRegister = () => {
    setIsLogin(!isLogin);
  };

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: keyof Form = event.target.name;
    const value: string = event.target.value;
    const newForm: Form = { ...form };
    newForm[target] = value;

    setForm({ ...newForm });
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLogin && form.email !== '' && form.password !== '') {
      try {
        await auth.signInWithEmailAndPassword(form.email, form.password);
        await checkAuth();
      } catch (error) {
        errorHandler(error.message);
      }
    } else if (!isLogin && Object.values(form).indexOf('') === -1) {
      const user = await createUser(form);
      dispatch(updateUser({ ...user }));
      history.push('/dashboard');
    } else {
      errorHandler('All fields are required!');
    }
  };

  const googleSignIn = async () => {
    try {
      await auth.signInWithPopup(provider);
      await checkAuth();
    } catch (error) {
      errorHandler(error.message);
    }
  };

  return (
    <div>
      {isLogin ? (
        <form className="login-form" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="email">
            E-mail:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => handleUpdate(event)}
            ></input>
          </label>
          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(event) => handleUpdate(event)}
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
              title="Min. 8 characters, with letters & numbers"
              placeholder="Min. 8 characters, with letters & numbers"
            ></input>
          </label>
          <a onClick={handleLoginOrRegister}>
            Not registered? Create an account!
          </a>
          <p id="form-error"></p>
          <div className="user-form-btn">
            <input type="reset" value="Clear" onClick={handleReset}></input>
            <input type="submit" value="Log In"></input>
          </div>
          <button className="google-sign-in" onClick={googleSignIn}>
            Sign In with Google
          </button>
        </form>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            First Name:
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={(event) => handleUpdate(event)}
            ></input>
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={(event) => handleUpdate(event)}
            ></input>
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => handleUpdate(event)}
            ></input>
          </label>
          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(event) => handleUpdate(event)}
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
              title="Min. 8 characters, with letters & numbers"
              placeholder="Min. 8 characters, with letters & numbers"
            ></input>
          </label>
          <a onClick={handleLoginOrRegister}>
            Already have an account? Sign in!
          </a>
          <p id="form-error"></p>
          <div className="user-form-btn">
            <input type="reset" value="Clear" onClick={handleReset}></input>
            <input type="submit" value="Register"></input>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserAuth;
