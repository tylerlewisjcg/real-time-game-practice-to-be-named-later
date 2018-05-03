import React, { Component } from 'react';
import axios from 'axios';
import Nav from './../Nav/Nav';
import Button from 'material-ui/Button';

export default class QuestionPage extends Component {
    constructor() {
        super()
        this.state = {
            time: 60,
            option1: 'this is some dummy data data',
            option2: 'this is also some other dummy data  datathis is some dummy data'
        }
    }

    timeCount(){
        setInterval(() => {
            this.setState({
                time: this.state.time-1
            })
        }, 1000)
    }

    componentDidMount() {
        this.timeCount();
        // axios.get()
        //get would you rather question
        //grab 1 minute timer
    }

    render() {
        return (
            <div className='question-page'>
                <Nav />
                <div className='question-page-container'>
                    <div className='question-page-counter'>
                        Time: <span style={{textShadow: '1px 1px 1px black'}}>{this.state.time}</span>
                    </div>
                    <div className='question-page-title'>
                        Would You Rather...
                    </div>
                    <div>
                        <Button
                            style={{ fontFamily: 'Acme, sans-serif', fontSize: '20px', boxShadow: '1px 1px 2px black', borderRadius: '50px', backgroundColor: '#FF9C9B', color: 'white', textShadow: '1px 1px 1px black' }}
                        >{this.state.option1}</Button>
                    </div>
                    <div style={{fontFamily: 'Acme, sans-serif', fontSize: '25px'}}>
                        Or...
                    </div>
                    <div>
                        <Button
                            style={{ fontFamily: 'Acme, sans-serif', fontSize: '20px', boxShadow: '1px 1px 2px black', borderRadius: '50px', backgroundColor: '#FF9C9B', color: 'white', textShadow: '1px 1px 1px black' }}
                        >{this.state.option2}</Button>
                    </div>
                </div>
            </div>
        )
    }
}