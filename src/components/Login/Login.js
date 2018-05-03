import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';
import Button from 'material-ui/Button';
import Person from '@material-ui/icons/Person';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';



export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }



    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        { this.state.open }
        return (
            <div className='login-container'>
                {/* <video autoplay muted loop className='login-video'>
                <source src='./../../SampleVideo_640x360_10mb.mp4' type='video'/>
            </video> */}

                <Transition
                    component="div"
                    enter={{
                        opacity: 1,
                        translateY: spring(0, { stiffness: 50, damping: 7.5 })
                    }}
                    leave={{
                        opacity: 0,
                        translateY: -700
                    }}
                >
                    <div className="login-title" key='1'>
                        Would You Rather?
                    </div>

                </Transition>
                <div>
                    <div>
                        <a href={process.env.REACT_APP_LOGIN}><Button style={{ boxShadow: '1px 1px 2px black', borderRadius: '50px' }}><Person style={{ fontSize: '46px' }} /></Button></a>
                    </div>
                    <div className="login-rules">
                        <Button
                            style={{ fontFamily: 'Acme, sans-serif', fontSize: '20px', boxShadow: '1px 1px 2px black', borderRadius: '50px' }}
                            onClick={this.handleOpen}
                        >Rules</Button>

                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <DialogTitle>
                                Rules:
                        </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Do Biz
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    style={{ fontFamily: 'Acme, sans-serif', fontSize: '20px', boxShadow: '1px 1px 1px black'}}
                                    onClick={this.handleClose}
                                >Close</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}
