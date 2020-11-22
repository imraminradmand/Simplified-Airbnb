import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/rootReducer'
import reduxPromise from 'redux-promise'

const store = applyMiddleware(reduxPromise)(createStore)(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

