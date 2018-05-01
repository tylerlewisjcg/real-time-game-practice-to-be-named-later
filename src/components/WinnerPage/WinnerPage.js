import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import {Link} from 'react-router-dom';
import Dashboard from './../Dashboard/Dashboard';

export default class WinnerPage extends Component {
    constructor() {
        super()


    }

    render() {
        return (
            <div>
                <Nav />
                WinnerPage
                <Link to='/dashboard'>Go Back To Dashboard</Link>
            </div>
        )
    }
}