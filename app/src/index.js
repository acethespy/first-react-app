import React, { Component } from "react";
import Konva from "konva";
import ReactDOM from "react-dom";
import './index.css';
import App from "./components/App"

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import initialState from './initialState.js'

const store = createStore(rootReducer, initialState)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
