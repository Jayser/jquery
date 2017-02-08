import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ContactsProvider from './ContactsProvider';
import ContactsList from './ContactsList';
import ContactsFormCreate from './ContactsForm/ContactsFormCreate';
import ContactsFormUpdate from './ContactsForm/ContactsFormUpdate';
import ContactsCallHistory from './ContactsCallHistory';

export default () => (
  <Route path='contacts' component={ ContactsProvider }>
    <IndexRoute component={ ContactsList } />
    <Route path='/contacts/create-contact' component={ ContactsFormCreate } />
    <Route path='/contacts/update-contact' component={ ContactsFormUpdate } />
    <Route path='/contacts/history-calls' component={ ContactsCallHistory } />
  </Route>
);
