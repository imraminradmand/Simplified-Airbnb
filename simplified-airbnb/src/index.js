import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import reduxPromise from 'redux-promise'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // using default web storage
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './utility/Spinner/Spinner';

const persistConfig = {
  key : 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = applyMiddleware(reduxPromise)(createStore)(persistedReducer)
const presister = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner/>}persistor={presister}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

