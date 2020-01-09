import React, { Component } from "react";
import AddDancerSection from './AddDancerSection'

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

export default Sidebar;
