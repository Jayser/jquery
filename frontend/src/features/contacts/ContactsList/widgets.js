import { CALL_API } from 'redux-api-middleware';
import { combineReducers } from 'redux';

import { formatUrl } from '../../../utils';

// Actions
const READ = 'contacts/READ';
const READ_SUCCESS = 'contacts/READ_SUCCESS';
const READ_FAIL = 'contacts/READ_FAIL';

const DELETE = 'contacts/DELETE';
const DELETE_SUCCESS = 'contacts/DELETE_SUCCESS';
const DELETE_FAIL = 'contacts/DELETE_FAIL';

const READ_ONE_SUCCESS = 'contacts/READ_ONE_SUCCESS';
const CREATE_SUCCESS = 'contacts/CREATE_SUCCESS';
const UPDATE_SUCCESS = 'contacts/UPDATE_SUCCESS';

// Reducer
const initialStateRead = { activePage: 1, data: [], error: null };
const read = (state = initialStateRead, action) => {
  switch (action.type) {
    case READ:
      return {
        ...state,
        loading: true
      };
    case READ_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case READ_ONE_SUCCESS:
      return {
        ...state,
        data: [ ...state.data, action.payload ]
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        data: [ ...state.data, action.payload ]
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        data: state.data.map((contact) => contact._id === action.payload._id ? action.payload : contact)
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((contact) => contact._id !== action.payload._id)
      };
    case READ_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          title: READ_FAIL,
          message: action.payload.response.message
        }
      };
    default:
      return state;
  }
};

const initialState = { loading: false, error: null };
const remove = (state = initialState, action) => {
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        loading: true
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case DELETE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          title: DELETE_FAIL,
          message: action.payload.response.message
        }
      };
    default:
      return state;
  }
};

export default combineReducers({ read, remove });

// Actions Creator
export function readContacts() {
  return {
    [CALL_API]: {
      endpoint: formatUrl('/contacts'),
      method: 'GET',
      types: [READ, READ_SUCCESS, READ_FAIL]
    }
  };
}

export function removeContact(contactId) {
  return {
    [CALL_API]: {
      endpoint: formatUrl(`/contacts/${ contactId }`),
      method: 'DELETE',
      types: [DELETE, DELETE_SUCCESS, DELETE_FAIL]
    }
  };
}

