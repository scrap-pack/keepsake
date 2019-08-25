import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';

import store from './redux/reducers/index.js';

// eslint-disable-next-line no-undef
const appDiv = document.getElementById('app');

render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  appDiv
);
