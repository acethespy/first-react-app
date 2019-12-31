import React, { Component } from "react";
import Konva from "konva";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect, Circle, Group, Text, Line } from "react-konva";
import './index.css';

class ColoredRect extends React.Component {
    changeSize = () => {
        // to() is a method of `Konva.Node` instances
        this.rect.to({
            scaleX: Math.random() + 0.8,
            scaleY: Math.random() + 0.8,
            duration: 0.2
        });
    };
    render() {
        return (
            <Group draggable>
                <Rect
                    x={20}
                    y={20}
                    width={50}
                    height={50}
                    fill="red"
                    ref={node => {
                        this.rect = node;
                    }}
                    shadowBlur={5}
                />
                <Rect
                    x={20}
                    y={30}
                    width={50}
                    height={50}
                    fill="red"
                    ref={node => {
                        this.rect = node;
                    }}
                    shadowBlur={5}
                />
            </Group>
        );
    }
}

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
                    text={this.props.id}
                    x={0}
                    y={0}
                />
            </Group>
        );
    }
}

class AddDancerButton extends React.Component {
    render() {
        return(
            <button onClick={() => this.props.addDancer()}>
                Add Dancer
            </button>
            
        );
    }
}

class Sidebar extends React.Component {
    render() {
        var text = '';
        let dancers = this.props.dancers;
        text = JSON.stringify(dancers);
        // for (key in dancers) {
        //     text = text + 'Id: ' + key + ' x: ' + dancers[key]['x']
        // }
        return (
            <div className='sidebar'>
                {text}
                <AddDancerButton addDancer={() => this.props.addDancer()}/>
            </div>
        );
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        
    }

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
        const dancers = Object.assign({}, this.props.dancers);
        var dancersComponents = [];
        for (let key in dancers) {
            dancersComponents.push(<Dancer id={key} x={dancers[key]['x']} y={dancers[key]['y']} update={this.props.update} unit={this.props.unit} />);
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dancers: {
                '0': this.defaultDancer(),
            },
            nextId: 1,
        };
    }

    defaultDancer() {
        return ({x: 40, y: 40})
    }

    updateDancer = (id, x, y) => {
        let dancers = Object.assign({}, this.state.dancers);
        dancers[id] = {
            x: x,
            y: y
        };
        this.setState({
            dancers: dancers,
            nextId: this.state.nextId
        });
    }

    addDancer = () => {
        let dancers = Object.assign({}, this.state.dancers);
        const currentId = this.state.nextId;
        dancers[currentId.toString()] = this.defaultDancer();
        this.setState({
            dancers: dancers,
            nextId: (currentId + 1)
        });
    }

    render() {
        const dancers = Object.assign({}, this.state.dancers);
        var dancersComponents = [];
        for (let key in dancers) {
            dancersComponents.push(<Dancer id={key} x={dancers[key]['x']} y={dancers[key]['y']} update={this.updateDancer} />);
        }
        return (
            <div className='flex'>
                <Canvas dancers={this.state.dancers} update={this.updateDancer} width={600} height={600} unit={40} />
                <Sidebar dancers={Object.assign({}, this.state.dancers)} addDancer={() => this.addDancer()} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);