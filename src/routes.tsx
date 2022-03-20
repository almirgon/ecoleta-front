import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import NotFound from './pages/NotFound';
import Collect from './pages/Collect';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={CreatePoint} path="/cadastro" />
      <Route component={Collect} path="/coleta/:id" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};

export default Routes;
