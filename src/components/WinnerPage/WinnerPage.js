import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import Dashboard from './../Dashboard/Dashboard';
import Button from 'material-ui/Button';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';

export default class WinnerPage extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div className='winner-page'>
                <Nav />
                <div className='winner-page-container'>
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}><Button style={{ fontFamily: 'Acme, sans-serif', fontSize: '25px' }}>Return to DashBoard</Button></Link>
                </div>
                <div className='winner-page-inner-container'>
                    <div className='winner-page-chart'>
                        Display Chart.js Animations
                    </div>
                    {/* Need to do a SetTimeout here */}
                    <Transition
                        component="div"
                        enter={{
                            opacity: 1,
                            translateX: spring(0, { stiffness: 50, damping: 7.5 })
                        }}
                        leave={{
                            opacity: 0,
                            translateX: -700
                        }}
                    >
                        <div className='winner-page-winner'>
                            Winner: Option 1 or 2
                        </div>
                    </Transition>
                </div>
            </div>
        )
    }
}