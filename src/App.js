import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './routes';
import { AvailableUsers, NoMatch, HomePage, Messanger } from './pages';

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/users" component={AvailableUsers} />
        <PrivateRoute exact path="/users/:id" component={Messanger} />
        <PrivateRoute component={NoMatch} />
      </Switch>
    </Router>       
  );
}

export default App;