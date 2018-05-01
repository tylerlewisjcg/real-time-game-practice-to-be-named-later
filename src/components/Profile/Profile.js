import React, {Component} from 'react';

export default class Profile extends Component{
    constructor(){
        super()


    }

    render(){
        return(
            <div>
            Profile
            <a href={process.env.REACT_APP_LOGOUT}>
            <button>Logout</button>
          </a>
          </div>
        )
    }
}