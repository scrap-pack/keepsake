import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main.jsx';
import store from './redux';
import { fetchUser, changeLoginStatus } from './redux/users';
import Footer from './components/Footer.jsx';

// eslint-disable-next-line no-undef
const appDiv = document.getElementById('app');

const session = Cookies.get('sid');

if (session) {
  store.dispatch(fetchUser());
  store.dispatch(changeLoginStatus(true));
}

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  appDiv
);
render(<Footer />, document.getElementById('footer'));
