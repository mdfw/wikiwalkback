const redux = require('redux');
const thunk = require('redux-thunk').default;
const reducers = require('./reducers/reducers');

const createStore = redux.createStore;
const compose = redux.compose;
const applyMiddleware = redux.applyMiddleware;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(reducers.hotcoldReducer, composeEnhancers(
    applyMiddleware(thunk),
  ));

module.exports = store;
