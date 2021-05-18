import './App.css';
import { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import { updateUser } from './redux/usersSlice';
import { useAppDispatch } from './redux/hooks';

import About from './pages/About';
import Dashboard from './pages/Dashboard';
import TrackPage from './pages/TrackPage';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import PoseValidation from './pages/PoseValidation';
import PrivateRoute from './components/PrivateRoute';
import CreateCustomRoutine from './pages/CreateCustomRoutine';

function App(): ReactElement {
  const dispatch = useAppDispatch();

  const sessionUser = sessionStorage.getItem('yogaMasterUser');
  if (sessionUser) {
    dispatch(updateUser({ ...JSON.parse(sessionUser) }));
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/about" component={About} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/trackPage/:level" component={TrackPage} />
        <PrivateRoute path="/createRoutine" component={CreateCustomRoutine} />
        <PrivateRoute path="/pose/:level/:index" component={PoseValidation} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
