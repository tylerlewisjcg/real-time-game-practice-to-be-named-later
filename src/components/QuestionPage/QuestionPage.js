import React, { Component } from 'react';
import axios from 'axios';
import Nav from './../Nav/Nav';
import Button from 'material-ui/Button';
import io from 'socket.io-client';


export default class QuestionPage extends Component {
    constructor() {
        super()
        this.state = {
            time: 60,
            option1: 'this is some dummy data data',
            option2: 'this is also some other dummy data  datathis is some dummy datathis is also some other dummy data  dataththis is also some other dummy data  dataththis is also some other dummy data  dataththis is also some other dummy data  dataththis is also some other dummy data  datath',
            decision: null
        }
    }

    timeCount() {
        setInterval(() => {
            this.setState({
                time: this.state.time - 1
            }, () => {
                if (this.state.time <= 0) {
                    
                    console.log('hello')
                    axios.get(`/final-count/${this.state.decision}`)
                        .then((result) => {
                            console.log('.then workin', result)
                            this.props.history.push('/winner-page')
                        })
                }
            })

        }, 1000)
    }

    componentDidMount() {
        this.timeCount();
        // axios.get()
        //get would you rather question
    }

    handleDecision(decision) {
        this.setState({
            decision
        })
    }

    render() {
        return (
            <div className='question-page'>
                <Nav />
                <div className='question-page-container'>
                    <div className='question-page-counter'>

                        Time: <span style={{ textShadow: '1px 1px 1px black' }}>{this.state.time}</span>
                    </div>
                    <div className='question-page-title'>
                        Would You Rather...
                    </div>
                    <div className='question-page-button'>
                        <Button
                            style={{ fontFamily: 'Acme, sans-serif', fontSize: '20px', boxShadow: '1px 1px 2px black', borderRadius: '50px', backgroundColor: '#07B0CC', color: 'white', textShadow: '1px 1px 1px black' }}
                            onClick={() => this.handleDecision('1')}
                        >1. {this.state.option1}</Button>
                    </div>
                    <div style={{ fontFamily: 'Acme, sans-serif', fontSize: '25px' }}>
                        Or...
                    </div>
                    <div>
                        <Button
                            style={{ fontFamily: 'Acme, sans-serif', fontSize: '20px', boxShadow: '1px 1px 2px black', borderRadius: '50px', backgroundColor: '#CC0C64', color: 'white', textShadow: '1px 1px 1px black' }}
                            onClick={() => this.handleDecision('2')}
                        >2. {this.state.option2}</Button>
                    </div>
                    <div className='question-page-footer'>
                        <div style={{ fontFamily: 'Acme, sans-serif', fontSize: '25px' }}>
                            Your Decision:
                    </div>
                        <div style={{ fontFamily: 'Acme, sans-serif', fontSize: '25px', textShadow: '1px 1px 1px black' }}>
                            {this.state.decision}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}