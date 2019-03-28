import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './routes';
import { SnackBarProvider } from './pages/SnackBarProvider'
import { AvailableUsers, NoMatch, HomePage, AvailableMessage, Messanger } from './pages';

const App = () => {
  return (
    <SnackBarProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/users" component={AvailableUsers} />
          {/* <PrivateRoute exact path="/users/:id" component={Messanger} /> */}
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </SnackBarProvider>
  );
}

export default App;