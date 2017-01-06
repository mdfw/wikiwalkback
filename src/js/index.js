import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import store from './store';
import App from './components/app';
import subscriber from './actions/subscribe'; // eslint-disable-line
import SearchContainer from './components/SearchContainer';
import Results from './components/Results';

document.addEventListener('DOMContentLoaded', function() { // eslint-disable-line
  render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SearchContainer} />

          <Route path="/results/:searchTerm" component={Results} />
          <Route path="/results/:searchTerm/:steps" component={Results} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app') // eslint-disable-line
  );
});
