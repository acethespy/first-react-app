import React, { Component } from "react";
import Konva from "konva";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect, Circle, Group, Text, Line } from "react-konva";
import './index.css';
import Reorder, { reorder, reorderImmutable, reorderFromTo, reorderFromToImmutable } from 'react-reorder';
import App from "./App"

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
