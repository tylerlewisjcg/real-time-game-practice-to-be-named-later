import React, { Component } from 'react';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Stats from './../Stats/Stats';
import Profile from './../Profile/Profile';
import Equalizer from '@material-ui/icons/Equalizer';
import Mood from '@material-ui/icons/Mood';

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            stats: false,
            profile: false,
            currentStreak: 0,
        }

    }

    // componentDidMount(){
    //     this.setState({
    //         currentStreak: this.props.currentStreak
    //     })
    // }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        })
    }

    render() {

        return (
            <div className='nav-bar'>
                {/* needed to apply inline styling because material ui next can't get it's styling together... */}
                <div className='stats-button'>
                    <Button onClick={this.toggleDrawer('left', true)} style={{ fontFamily: 'Acme, sans-serif', fontSize: '25px' }} ><Equalizer style={{fontSize: '46px'}}/></Button>
                </div>
                <div style={{fontSize: '25px'}}>Streak[<span style={{color: '#1D1D1D'}}> {this.state.currentStreak} </span>/11]</div>
                <Button onClick={this.toggleDrawer('right', true)}><Mood style={{fontSize: '46px'}}/></Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        // tabIndex={0}
                        // role="button"
                        // onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {<Stats toggleDrawer={this.toggleDrawer}/>}
                    </div>
                </Drawer>
                <Drawer anchor='right' open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {<Profile />}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Nav;