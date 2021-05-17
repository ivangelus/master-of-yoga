import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { auth } from '../services/firebase';

interface Props {
  component: React.FC;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  path,
}: Props) => {
  return (
    <Route
      path={path}
      render={() => {
        return auth.currentUser ? <Component /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
