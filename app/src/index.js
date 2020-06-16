import React, { Component } from "react";
import Konva from "konva";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect, Circle, Group, Text, Line } from "react-konva";
import './index.css';
import Reorder, { reorder, reorderImmutable, reorderFromTo, reorderFromToImmutable } from 'react-reorder';

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

class FormationTimeline extends React.Component {

    onReorder(event, previousIndex, nextIndex, fromId, toId) {
        this.props.setFormOrder(reorder(this.props.formationOrder, previousIndex, nextIndex));
    }

    onReorderGroup(event, previousIndex, nextIndex, fromId, toId) {
        if (fromId === toId) {
            const list = reorderImmutable(this.state[fromId], previousIndex, nextIndex);

            this.setState({
                [fromId]: list
            });
        } else {
            const lists = reorderFromToImmutable({
                from: this.state[fromId],
                to: this.state[toId]
            }, previousIndex, nextIndex);

            this.setState({
                [fromId]: lists.from,
                [toId]: lists.to
            });
        }
    }

    render() {
        return(
            <Reorder
                className="timeline"
                reorderId="formations-list" // Unique ID that is used internally to track this list (required)
                reorderGroup="formations-group" // A group ID that allows items to be dragged between lists of the same group (optional)
                component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
                placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
                draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                lock="vertical" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
                onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
                autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
            >
                {
                    this.props.formationOrder.map((item) => (
                        <div onClick={() => {this.props.setCurrentForm(item)}} className='timeline-formation' key={item}>
                            {item}
                        </div>
                    ))
                }
            </Reorder>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formations: {
                '0': {},
                '1': {},
                '2': {},
            },
            dancers: {},
            formationOrder: ['0', '1', '2'],
            nextId: 0,
            nextFormId: 3,
            currentFormId: '0',
        };
    }

    defaultPos() {
        return ({x: 40, y: 40})
    }

    updateDancer = (id, x, y) => {
        let formations = Object.assign({}, this.state.formations);
        formations[this.state.currentFormId][id] = {
            x: x,
            y: y,
        };
        this.setState({
            formations: formations,
        });
    }

    addToFormation = (id) => {
        let formations = Object.assign({}, this.state.formations);
        if (!formations[this.state.currentFormId][id]) {
            formations[this.state.currentFormId][id] = this.defaultPos();
        }
        this.setState({
            formations: formations,
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

    setCurrentForm = (id) => {
        this.setState({
            currentFormId: id,
        });
    }

    setFormOrder = (newFormOrder) => {
        this.setState({
            formationOrder: newFormOrder,
        });
    }

    addFormation = ()=> {
        let formations = Object.assign({}, this.state.formations);
        let formationOrder = Object.assign([], this.state.formationOrder);
        formations[this.state.nextFormId.toString()] = {};
        formationOrder.push(this.state.nextFormId.toString());
        this.setState({
            formations: formations,
            formationOrder: formationOrder,
            nextFormId: this.state.nextFormId + 1,
        })
    }

    render() {
        return (
            <div className='outerDiv'>
                <div className='upperDiv'>
                    <Canvas dancers={this.state.dancers} formation={this.state.formations[this.state.currentFormId]} update={this.updateDancer} width={600} height={600} unit={40} />
                    <Sidebar addToFormation={this.addToFormation} dancers={this.state.dancers} formation={this.state.formations[this.state.currentFormId]} addDancer={this.addDancer} />
                </div>
                <div className='lowerDiv'>
                    <FormationTimeline setCurrentForm={this.setCurrentForm} setFormOrder={this.setFormOrder} formationOrder={this.state.formationOrder} currentFormId={this.state.currentFormId} />
                    <div>
                        {'Current Formation: ' + this.state.currentFormId}
                    </div>
                    <div>
                        <button onClick={this.addFormation}>
                            Add Formation
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// Anime.js