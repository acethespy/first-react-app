import React, { Component } from "react";

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

export default AddDancerSection;
