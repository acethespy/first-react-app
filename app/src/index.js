import React, { Component } from "react";
import Konva from "konva";
import ReactDOM from "react-dom";
import './index.css';
import App from "./components/App"

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import initialState from './initialState'
import rootReducer from './reducers/rootReducer';

// creating a store for the redux structure
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
