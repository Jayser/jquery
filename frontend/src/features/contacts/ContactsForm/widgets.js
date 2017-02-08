import { combineReducers } from 'redux';

import create from './ContactsFormCreate/widgets';
import update from './ContactsFormUpdate/widgets';

export { createContact, clearCreate } from './ContactsFormCreate/widgets';
export { updateContact, clearUpdate } from './ContactsFormUpdate/widgets';

export default combineReducers({ create, update });
