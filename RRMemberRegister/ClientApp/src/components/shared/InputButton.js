import React, { Component } from 'react';

class InputButton extends Component {

    render() {

        if (this.props.active) {
            return (
                <input type="submit" value={this.props.text} className="btn btn-primary" />
            );
        }
        else
        {
            return (
                <input type="submit" value={this.props.text} className="btn btn-primary" disabled />
            );
        }
    }
}

export { InputButton };