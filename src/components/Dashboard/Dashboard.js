import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3010');

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            countdown: null
        }
        this.subscribeToTimer(data => this.setState({ countdown: data.countdown }))
        this.subscribeToTimer = this.subscribeToTimer.bind(this)
        // this.setTimer = this.setTimer.bind(this)
    }

    subscribeToTimer(cb) {
        socket.on('timer', data => cb(data))
    }

    // setTimer() {
    //     socket.emit('settimer')
    // }

    componentDidMount() {
        // this.setTimer();
    }

    render() {
        return (
            <div className='dashboard'>
                <Nav />
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <div className='dashboard-container'>
                        <div>
                            Next Game in:
                    </div>
                        <div style={{textShadow: '1px 1px 1px black'}}>
                            {this.state.countdown}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}