import { CALL_API } from 'redux-api-middleware';

import { formatUrl } from '../../../../utils';

// Actions
const CREATE = 'contacts/CREATE';
const CREATE_SUCCESS = 'contacts/CREATE_SUCCESS';
const CREATE_FAIL = 'contacts/CREATE_FAIL';
const CREATE_CLEAR = 'contacts/CREATE_CLEAR';

// Reducer
const initialState = {
  loading: false,
  error: null
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        loading: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case CREATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          title: CREATE_FAIL,
          message: action.payload.response.message
        }
      };
    case CREATE_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
}

// Action Creators
export function createContact({ body }) {
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

export function clearCreate() {
  return { type: CREATE_CLEAR };
}
