import React, {Component} from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3010');

export default class Dashboard extends Component{
    constructor(){
        super()
        this.state={
            newTime: 50,
            countdown: null
        }
        this.subscribeToTimer(data => this.setState({countdown: data.countdown}))
        this.subscribeToTimer = this.subscribeToTimer.bind(this)
        this.setTimer = this.setTimer.bind(this)
    }

    subscribeToTimer(cb){
        socket.on('timer', data => cb(data))
    }

    setTimer(){
        console.log('componentDidMount workin')
        socket.emit('settimer', {time: this.state.newTime})
    }

    componentDidMount(){
        this.setTimer();
    }

    render(){
        console.log('state newTime', this.state.newTime)
        return(
            <div className='dashboard'>
                <Nav/>

                Dashboard
                {this.state.countdown}
            </div>
        )
    }
}