import { CALL_API } from 'redux-api-middleware';
import { combineReducers } from 'redux';

import { formatUrl } from '../../utils';

import form from './ContactsForm/widgets';
import list from './ContactsList/widgets';

// Actions
const READ_ONE = 'contacts/READ_ONE';
const READ_ONE_SUCCESS = 'contacts/READ_ONE_SUCCESS';
const READ_ONE_FAIL = 'contacts/READ_ONE_FAIL';
const CLEAR_READ_ONE = 'contacts/CLEAR_READ_ONE';

// Reducers
const initialState = { loading: false, error: null };
const readOne = (state = initialState, action) => {
  switch (action.type) {
    case READ_ONE:
      return {
        ...state,
        loading: true
      };
    case READ_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case READ_ONE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          title: READ_ONE_FAIL,
          message: action.payload.response.message
        }
      };
    case CLEAR_READ_ONE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions Creator
export function readContact({ contactId }) {
  return {
    [CALL_API]: {
      endpoint: formatUrl(`/contacts/${ contactId }`),
      method: 'GET',
      types: [READ_ONE, READ_ONE_SUCCESS, READ_ONE_FAIL]
    }
  };
}

export function clearReadOne() {
  return { type: CLEAR_READ_ONE };
}

export { createContact, clearCreate } from './ContactsForm/ContactsFormCreate/widgets';
export { updateContact, clearUpdate } from './ContactsForm/ContactsFormUpdate/widgets';
export { readContacts, removeContact } from './ContactsList/widgets';

export default combineReducers({ form, list, readOne });
