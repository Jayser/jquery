import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import contacts from '../features/contacts/widgets';

const rootReducer = combineReducers({
  contacts,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
