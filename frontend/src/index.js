import React from 'react'
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import DevTools from './DevTools';

import configureStore from './store/configureStore';
import routes from './routes';

const MOUNT_NODE = document.getElementById('app');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ history } routes={ routes } />
      { __DEV__ ? <DevTools /> : null }
    </div>
  </Provider>,
  MOUNT_NODE
);
