import React, { Component } from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';


export default class Stats extends Component {
    constructor() {
        super()


    }

    render() {
        return (
            <div className='stats'>
                <ArrowForward onClick={this.props.toggleDrawer('left', false)} style={{ width: '100%', backgroundColor: '#599099', height: '35px' }} />
                <div className='current-leader-container'>
                    <div>
                        Current Leader:
                </div>
                    <div className='current-leader'>
                        Mad Tye - 12 Streak
                </div>
                    <div>
                        All Time Leader:
                </div>
                    <div className='current-leader'>
                        TBone Ping Pong - 18 Streak
                </div>
                </div>
                <div className='chart-container'>
                    Chart
                </div>
                <div className='stats-leader'>
                    Winner
                </div>
            </div>
        )
    }
}