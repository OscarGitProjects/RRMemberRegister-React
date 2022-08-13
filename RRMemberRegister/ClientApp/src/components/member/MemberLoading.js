import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MemberLoading extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <h1>{this.props.heading}</h1>
                </div>

                <div className="row">
                    <div className="cols-sm-12">{this.props.message}</div>
                </div>

                <div className="row">
                    <div className="cols-sm-12">
                        <Link to={`/memberlist`} className="btn btn-secondary">Tillbaka</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export { MemberLoading };