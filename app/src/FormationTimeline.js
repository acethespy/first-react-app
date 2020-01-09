import React, { Component } from "react";
import Reorder, { reorder, reorderImmutable, reorderFromTo, reorderFromToImmutable } from 'react-reorder';

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
                    /*
                    Note this example is an ImmutableJS List so we must convert it to an array.
                    I've left this up to you to covert to an array, as react-reorder updates a lot,
                    and if I called this internally it could get rather slow,
                    whereas you have greater control over your component updates.
                    */
                }
            </Reorder>
        );
    }
}

export default FormationTimeline;
