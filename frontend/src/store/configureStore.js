import { applyMiddleware, createStore, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { persistState } from 'redux-devtools';
import rootReducer from './reducers';
import DevTools from '../DevTools';

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const middleware = [];

const enhancers = [];

if (__DEV__) {
  enhancers.push(
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
  );
}

export default (initialState = {}) => {
  const store = createStoreWithMiddleware(rootReducer, initialState, compose(
      ...enhancers,
      applyMiddleware(...middleware)
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
}

