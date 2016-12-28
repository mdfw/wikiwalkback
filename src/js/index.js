import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';
import subscriber from './actions/subscribe';

document.addEventListener('DOMContentLoaded', function() { // eslint-disable-line
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app') // eslint-disable-line
  );
});
