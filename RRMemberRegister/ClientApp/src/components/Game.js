import React, { Component } from 'react';
import {StarsDisplay} from './StarsDisplay';
import {PlayButtonNumber} from './PlayButtonNumber';
import {Utils} from '../Utils';
import { PlayAgain } from './PlayAgain';


class Game extends Component 
{
    constructor()
    {
        super();

        this.state = {
            availableNums: Utils.createRange(1,9),
            secondsLeft: 10,
            numberOfStars: Utils.createRandomNumber(1,9),
            availableNums: Utils.createRange(1,9),
        };
    }

    onClickNumber = (number, status) => 
    {
        alert('onClickNumber: ' + number + ', status: ' + status + ', secundsLeft: '  + this.state.secondsLeft);

        this.setState({secondsLeft: this.state.secondsLeft - 1});        
    }

    gameStatus = () =>
    {
        return this.state.availableNums.length === 0 ? 'won' : this.state.secondsLeft === 0 ? 'lost' : 'active'
    }

    componentDidMount = () => 
    {
        if(this.state.secondsLeft > 0 && this.state.availableNums.length > 0)
        {
            const timerId = setTimeout(() => {
                this.setState({secondsLeft: this.state.secondsLeft - 1});
            }, 1000);

            return () => clearTimeout(timerId);         
        }        
    }

    componentDidUpdate = () => 
    {
        if(this.state.secondsLeft > 0 && this.state.availableNums.length > 0)
        {
            const timerId = setTimeout(() => {
                this.setState({secondsLeft: this.state.secondsLeft - 1});
            }, 1000);

            return () => clearTimeout(timerId);            
        }        
    }

    render(){
        return (
            <div className="game">

                <div className="help">Pick 1 or more numbers that sum to the number of stars</div>

                <div className="body">
                    <div className="left">
                        {
                            this.state.numberOfStars = Utils.createRandomNumber(1,9)
                        }
                        {                         
                                                             
                            <StarsDisplay numberOfStars={this.state.numberOfStars} />
                        
                        }                        
                    </div>

                    <div className="right">
                        { 
                            Utils.createRange(1,9).map(number => (
                                <PlayButtonNumber key={number} status="wrong" number={number} onClick={this.onClickNumber} />
                            ))
                        }
                    </div>
                </div>

                <div className="timer">Time Remaining: {this.state.secondsLeft}</div>     
                <div>Array sum: {Utils.sumArray(this.state.availableNums)}</div>
                <div>Random number: {Utils.createRandomNumber(1, 9)}</div>
                <div>Number: {Utils.randomSumIn(this.state.availableNums, 9)}</div>

            </div>
        );
    }
}

export {Game};