import { CALL_API } from 'redux-api-middleware';

import { formatUrl } from '../../../../utils';

// Actions
const UPDATE = 'contacts/UPDATE';
const UPDATE_SUCCESS = 'contacts/UPDATE_SUCCESS';
const UPDATE_FAIL = 'contacts/UPDATE_FAIL';
const UPDATE_CLEAR = 'contacts/UPDATE_CLEAR';

// Reducers
const initialState = { loading: false, error: null };
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          title: UPDATE_FAIL,
          message: action.payload.response.message
        }
      };
    case UPDATE_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};

// Actions Creator
export function updateContact({ contactId, body }) {
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

export function clearUpdate() {
  return { type: UPDATE_CLEAR };
}
