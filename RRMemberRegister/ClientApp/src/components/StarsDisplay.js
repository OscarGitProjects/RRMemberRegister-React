import React, { Component } from 'react';
import {Utils} from '../Utils';

class StarsDisplay extends Component  
{
    constructor()
    {
        super();
    }

    render (){
        return (
            <>
                {
                    Utils.createRange(1, this.props.numberOfStars).map(starId => (
                        <img className="star" key={starId} src={`${process.env.PUBLIC_URL}/assets/images/star.png`} alt="star"/>
                    ))
                }
            </>
        );
    }

}

export {StarsDisplay};