import React, { Component } from 'react';

class ErrorMessage extends Component {

    render() {

        if (this.props.error)
        {
            return (
                <div className="row">
                    <div className="cols-sm-12 alert alert-danger" role="alert">{this.props.message}</div>
                </div>
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

export { ErrorMessage };