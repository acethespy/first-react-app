import React, { Component } from "react";
import { Stage, Layer, Rect, Circle, Group, Text, Line } from "react-konva";

class Dancer extends React.Component {
    update = () => {
        const unit = this.props.unit;
        var group = this.refs.group;
        const roundX = unit * Math.round(group.x() / unit);
        const roundY = unit * Math.round(group.y() / unit);
        group.x(roundX);
        group.y(roundY);
        this.props.update(this.props.id, group.x(), group.y());
    }
    render() {
        return (
            <Group
            ref='group'
            draggable
            onDragEnd={this.update}
            x={this.props.x}
            y={this.props.y}
            >
                <Circle
                    ref='circle'
                    x={0}
                    y={0}
                    radius={20}
                    fill="red"
                />
                <Text
                    text={this.props.name}
                    x={-20}
                    y={-10}
                    width={40}
                    height={20}
                    align='center'
                    verticalAlign='middle'
                />
            </Group>
        );
    }
}

export default Dancer;
