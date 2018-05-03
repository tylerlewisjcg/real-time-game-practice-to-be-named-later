import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';


export default class Profile extends Component {
    constructor() {
        super()


    }

    render() {
        return (
            <div className='profile'>
                <ArrowBack onClick={this.props.toggleDrawer('right', false)} style={{ width: '100%', backgroundColor: '#599099', height: '35px' }} />
                <div className='pic-container'>
                    Profile Pic
                </div>
                <div className='profile-name'>
                    <div>
                        Profile Name
                </div>
                </div>
                <div className='stats-leader'>
                    <div>
                        All Time Streak
                </div>
                    <div>
                        Current Streak
                </div>
                </div>
            </div>
        )
    }
}