import React, { Component } from "react";
import { connect } from 'react-redux'

import Canvas from "./Canvas"
import Sidebar from "./Sidebar"
import FormationTimeline from "./FormationTimeline"
import Konva from "konva";

import { updateDancerPosition, updateDancerPositionAgain } from '../actions/formationsActions'
import { updateCurrentFormationId } from '../actions/metadataActions'

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
        formations[this.props.metadata.currentFormationId][id] = {
            x: x,
            y: y,
        };
        this.setState({
            formations: formations,
        });

        if (x == 40) {
            this.props.updateDancerPosition({
                id: 'id1',
                x: '5',
                y: '5'
            });
            console.log('store');
            console.log(this.props);
        } else {
            this.props.updateDancerPositionAgain();
            console.log('store again');
            console.log(this.props);
        }
    }

    addToFormation = (id) => {
        let formations = Object.assign({}, this.state.formations);
        if (!formations[this.props.metadata.currentFormationId][id]) {
            formations[this.props.metadata.currentFormationId][id] = this.defaultPos();
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

        this.props.updateCurrentFormationId({id: id});
        console.log(this.props);
    }

    setFormOrder = (newFormOrder) => {
        this.setState({
            formationOrder: newFormOrder,
        });
    }

    render() {
        return (
            <div className='outerDiv'>
                <div className='upperDiv'>
                    <Canvas
                      dancers={this.state.dancers}
                      formation={this.state.formations[this.props.metadata.currentFormationId]}
                      update={this.updateDancer}
                      width={600}
                      height={600}
                      unit={40}
                    />
                    <Sidebar
                      addToFormation={this.addToFormation}
                      dancers={this.state.dancers}
                      formation={this.state.formations[this.props.metadata.currentFormationId]}
                      addDancer={this.addDancer}
                    />
                </div>
                <div className='lowerDiv'>
                    <FormationTimeline
                      setCurrentForm={this.setCurrentForm}
                      setFormOrder={this.setFormOrder}
                      formationOrder={this.state.formationOrder}
                      currentFormId={this.props.metadata.currentFormationId}
                    />
                    <div>
                        {'Current Formation: ' + this.props.metadata.currentFormationId}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formations: state.formations,
    metadata: state.metadata,
})

const mapDispatchToProps = {
    updateDancerPosition,
    updateDancerPositionAgain,
    updateCurrentFormationId,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
