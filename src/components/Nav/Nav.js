import React, { Component } from 'react';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Stats from './../Stats/Stats';
import Profile from './../Profile/Profile';

export default class Nav extends Component {
    constructor() {
        super()
        this.state = {
            stats: false,
            profile: false
        }

    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        })
    }

    render() {
        return (
            <div className='nav-bar'>
                <Button onClick={this.toggleDrawer('left', true)}>Stats</Button>
                <div>Streak</div>
                <Button onClick={this.toggleDrawer('right', true)}>Profile</Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                    >
                    {<Profile />}
                </div>
                </Drawer>
                <Drawer anchor='right' open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('right', false)}
                    onKeyDown={this.toggleDrawer('right', false)}
                    >
                    {<Stats />}
                </div>
                </Drawer>
            </div>
                )
            }
}