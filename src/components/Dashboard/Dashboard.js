import React, {Component} from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className='dashboard'>
                <Nav/>
                Dashboard
            </div>
        )
    }
}