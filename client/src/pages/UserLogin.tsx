import './UserLogin.css';
import React, { useState } from 'react';
import firebase, { auth, provider } from '../services/firebase';

import { updateUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

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
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<Form>(initialForm);

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

  const handleSubmit = (event: React.FormEvent) => {
    const errorSpan = document.getElementById('form-error');
    event.preventDefault();
    console.log(user); // Just so eslint allows me to push an unused variable...

    if (isLogin && form.email !== '' && form.password !== '')
      console.log('valid');
    else if (!isLogin && Object.values(form).indexOf('') === -1)
      console.log('registered');
    else {
      if (errorSpan)
        errorSpan.textContent = 'An e-mail and a password are required!';
      else alert('An e-mail and a password are required!');
    }

    dispatch(updateUser({ ...form }));
    handleReset();
  };

  const googleSignIn = async () => {
    const googleUser = (await auth.signInWithPopup(provider))
      .credential as firebase.auth.OAuthCredential;
    if (googleUser) console.log(googleUser.idToken);
    else alert('User not found');
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
              placeholder="Min. 8 characters, letters & numbers"
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
