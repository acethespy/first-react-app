import React, { Component } from "react";
import Dancer from "./Dancer"
import { Stage, Layer, Rect, Circle, Group, Text, Line } from "react-konva";

class Canvas extends React.Component {
    updateDancer = (id, x, y) => {
        const unit = this.props.unit;
        const roundX = unit * Math.round(x / unit);
        const roundY = unit * Math.round(y / unit);
        this.props.update(id, roundX, roundY);
    }

    render() {
        const unit = this.props.unit;
        const width = this.props.width;
        const height = this.props.height;
        var gridComponents = [];
        for (let i = unit; i < width; i += unit) {
            gridComponents.push(<Line points={[i, 0, i, height]} stroke={'grey'} strokeWidth={2} opacity={.2} />);
        }
        for (let i = unit; i < height; i += unit) {
            gridComponents.push(<Line points={[0, i, width, i]} stroke={'grey'} strokeWidth={2} opacity={.2} />)
        }
        const formation = Object.assign({}, this.props.formation);
        const dancers = Object.assign({}, this.props.dancers);
        var dancersComponents = [];
        for (let key in formation) {
            dancersComponents.push(<Dancer id={key} name={dancers[key]} x={formation[key]['x']} y={formation[key]['y']} update={this.props.update} unit={this.props.unit} />);
        }
        return(
            <Stage className='stage' width={this.props.width} height={this.props.height}>
                <Layer>
                    {gridComponents}
                    {dancersComponents}
                </Layer>
            </Stage>
        );
    }
}

export default Canvas;
