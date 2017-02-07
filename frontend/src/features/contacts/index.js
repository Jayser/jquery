import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ContactsProvider from './ContactsProvider';
import ContactsList from './ContactsList';
import ContactsCreate from './ContactsCreate';
import ContactsUpdate from './ContactsUpdate';

export default () => (
  <Route path='contacts' component={ ContactsProvider }>
    <IndexRoute component={ ContactsList } />
    <Route path='/contacts/create-contact' component={ ContactsCreate } />
    <Route path='/contacts/update-contact' component={ ContactsUpdate } />
  </Route>
);
