import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import moment from 'moment'

const socket = io.connect('http://localhost:3010');

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            countdown: 0,
        }
        this.subscribeToTimer(data => this.setState({ countdown: data.countdown }))
        this.subscribeToTimer = this.subscribeToTimer.bind(this)
        this.timeUp();
        this.timeUp = this.timeUp.bind(this)

        // this.setTimer = this.setTimer.bind(this)
    }

    subscribeToTimer(cb) {
        socket.on('timer', data => cb(data))
    }

    timeUp() {
        socket.on('change-screen', () => this.props.history.push('/question-page'))
    }

    timeConverter(time) {
        var hours = Math.floor(time / 3600);
        var remains = Math.floor(time % 3600);
        var minutes = Math.floor(remains / 60);
        var seconds = Math.floor(remains % 60);
        let newTime = `${hours}:${minutes}:${seconds}`;
        return newTime;
    }

    // setTimer() {
    //     socket.emit('settimer')
    // }

    componentDidMount() {
        // this.setTimer();
    }

    render() {
        console.log(this.props.history)
        return (
            <div className='dashboard'>
                <Nav />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <div className='dashboard-container'>
                        <div>
                            Next Game in:
                    </div>
                        <div style={{ textShadow: '1px 1px 1px black' }}>
                            <br />
                            {this.timeConverter(this.state.countdown)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}