import React, { Component } from 'react';

class ValidationMessage extends Component {

    render() {

        if (!this.props.valid)
        {
            return (
                <span className="error-msg">
                    &nbsp;{this.props.message}!
                </span>
            );
        }
        else
        {
            return (
                <></>
            );
        }
    }
}

export { ValidationMessage };