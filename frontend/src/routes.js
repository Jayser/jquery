import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './features/App';
import Contacts from './features/contacts';
import Home from './features/Home';
import NotFound from './features/NotFound';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
    { Contacts() }
    <Route path='*' component={ NotFound } />
  </Route>
);
