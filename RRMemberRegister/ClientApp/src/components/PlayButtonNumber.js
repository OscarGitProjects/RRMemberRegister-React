import React, { Component } from 'react';

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

class PlayButtonNumber extends Component 
{
    constructor()
    {
        super();
    }

    render(){
        return (
            <button className="number" 
                style={{backgroundColor: colors[this.props.status]}}
                onClick={() => this.props.onClick(this.props.number)}>

                {this.props.number}
            </button>
        );
    }
}

export {PlayButtonNumber};