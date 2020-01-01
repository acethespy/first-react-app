import React, { Component } from "react";
import Konva from "konva";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect, Circle, Group, Text, Line } from "react-konva";
import './index.css';

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

class AddDancerSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validName: true,
        };
    }
    
    addDancer = () => {
        const name = this.refs.dancerName.value;
        if (this.props.addDancer(name) === false) {
            this.setState({
                validName: false,
            });
        } else {
            this.setState({
                validName: true,
            });
            this.refs.dancerName.value = '';
        }

    }

    render() {
        var errorMessage = null;
        if (!this.state.validName) {
            errorMessage = 'Error: Blank or duplicate dancer name';
        }
        return(
            <div className='dancer-section'>
                <div>
                    <label>Dancer Name:</label>
                    <input name="dancer_name" ref='dancerName' />
                </div>
                <div>
                    <button onClick={this.addDancer}>
                        Add Dancer
                    </button>
                </div>
                <div>
                    {errorMessage}
                </div>
            </div>
        );
    }
}


class Sidebar extends React.Component {
    render() {
        var dancerInfo = [];
        let formation = this.props.formation;
        let dancers = this.props.dancers;
        for (let key in dancers) {
            if (formation[key]) {
                dancerInfo.push(<li>{dancers[key] + ': (' + formation[key]['x'] + ', ' + formation[key]['y'] + ')'}</li>)
            } else {
                dancerInfo.push(<li>{dancers[key] + ': N/A'}<button onClick={() => this.props.addToFormation(key)}>Add To Formation</button></li>)
            }
        }
        // for (key in dancers) {
        //     text = text + 'Id: ' + key + ' x: ' + dancers[key]['x']
        // }
        return (
            <div className='sidebar'>
                <div className='text-div'>
                    <ul>
                        {dancerInfo}
                    </ul>

                </div>
                <AddDancerSection addDancer={this.props.addDancer}/>
            </div>
        );
    }
}

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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formation: {
            },
            dancers: {
            },
            nextId: 0,
        };
    }

    defaultPos() {
        return ({x: 40, y: 40})
    }

    updateDancer = (id, x, y) => {
        let formation = Object.assign({}, this.state.formation);
        formation[id] = {
            x: x,
            y: y,
        };
        this.setState({
            formation: formation,
        });
    }

    addToFormation = (id) => {
        let formation = Object.assign({}, this.state.formation);
        if (!formation[id]) {
            formation[id] = this.defaultPos();
        }
        this.setState({
            formation: formation,
        });
    }

    addDancer = (name) => {
        name = name.trim();
        if (name === null || name === '') {
            return false;
        }
        let dancers = Object.assign({}, this.state.dancers);
        for (let key in dancers) {
            if (dancers[key].toLowerCase() === name.toLowerCase()) {
                return false;
            }
        }
        const currentId = this.state.nextId;
        dancers[currentId.toString()] = name;
        this.setState({
            dancers: dancers,
            nextId: (currentId + 1)
        });
        return true;
    }

    render() {
        return (
            <div className='flex'>
                <Canvas dancers={Object.assign({}, this.state.dancers)} formation={this.state.formation} update={this.updateDancer} width={600} height={600} unit={40} />
                <Sidebar addToFormation={this.addToFormation} dancers={Object.assign({}, this.state.dancers)} formation={Object.assign({}, this.state.formation)} addDancer={this.addDancer} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);