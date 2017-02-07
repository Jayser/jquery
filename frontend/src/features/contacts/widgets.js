import { CALL_API } from 'redux-api-middleware';
import { combineReducers } from 'redux';

import { formatUrl } from '../../utils';

// Actions
const CREATE = 'contacts/CREATE';
const CREATE_SUCCESS = 'contacts/CREATE_SUCCESS';
const CREATE_FAIL = 'contacts/CREATE_FAIL';

const READ = 'contacts/READ';
const READ_SUCCESS = 'contacts/READ_SUCCESS';
const READ_FAIL = 'contacts/READ_FAIL';

const READ_ONE = 'contacts/READ_ONE';
const READ_ONE_SUCCESS = 'contacts/READ_ONE_SUCCESS';
const READ_ONE_FAIL = 'contacts/READ_ONE_FAIL';

const UPDATE = 'contacts/UPDATE';
const UPDATE_SUCCESS = 'contacts/UPDATE_SUCCESS';
const UPDATE_FAIL = 'contacts/UPDATE_FAIL';

const DELETE = 'contacts/DELETE';
const DELETE_SUCCESS = 'contacts/DELETE_SUCCESS';
const DELETE_FAIL = 'contacts/DELETE_FAIL';

const CLEAR = 'contacts/CLEAR';

// Reducer
const initialState = {
  activePage: 1,
  data: []
};
export default combineReducers({
  create(state = {}, action = {}) {
    switch (action.type) {
      case CREATE:
        return {
          loading: true
        };
      case CREATE_SUCCESS:
        return {
          loading: false,
          loaded: true
        };
      case CREATE_FAIL:
        return {
          loading: false,
          loaded: false,
          error: {
            title: CREATE_FAIL,
            message: action.payload.response.message
          }
        };
      case CLEAR:
        return {};
      default:
        return state;
    }
  },
  read(state = initialState, action = {}) {
    switch (action.type) {
      case READ_ONE:
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
          loading: false,
          loaded: true,
          data: [action.payload]
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
            title: CREATE_FAIL,
            message: action.payload.response.message
          }
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
      default:
        return state;
    }
  },
  update(state = {}, action = {}) {
    switch (action.type) {
      case UPDATE:
        return {
          loading: true
        };
      case UPDATE_SUCCESS:
        return {
          loading: false,
          loaded: true
        };
      case UPDATE_FAIL:
        return {
          loading: false,
          loaded: false,
          error: {
            title: UPDATE_FAIL,
            message: action.payload.response.message
          }
        };
      case CLEAR:
        return {};
      default:
        return state;
    }
  },
  delete(state = {}, action = {}) {
    switch (action.type) {
      case DELETE:
        return {
          loading: true
        };
      case DELETE_SUCCESS:
        return {
          loading: false,
          loaded: true
        };
      case DELETE_FAIL:
        return {
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
  }
});

// Action Creators
export function createContact(body) {
  return {
    [CALL_API]: {
      endpoint: formatUrl('/contacts'),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      body: JSON.stringify(body)
    }
  };
}

export function readContacts() {
  return {
    [CALL_API]: {
      endpoint: formatUrl('/contacts'),
      method: 'GET',
      types: [READ, READ_SUCCESS, READ_FAIL]
    }
  };
}

export function readContact(contactId) {
  return {
    [CALL_API]: {
      endpoint: formatUrl(`/contacts/${ contactId }`),
      method: 'GET',
      types: [READ_ONE, READ_ONE_SUCCESS, READ_ONE_FAIL]
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

export function updateContact(contactId, body) {
  return {
    [CALL_API]: {
      endpoint: formatUrl(`/contacts/${ contactId }`),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
      body: JSON.stringify(body)
    }
  };
}

export function clearState() {
  return { type: CLEAR };
}
