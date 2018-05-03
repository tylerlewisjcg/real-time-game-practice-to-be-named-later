import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import QuestionPage from './components/QuestionPage/QuestionPage';
import Stats from './components/Stats/Stats';
import WinnerPage from './components/WinnerPage/WinnerPage';

export default (
    <Switch>
        <Route component={Login} exact path='/'/>
        <Route component={Dashboard} path='/dashboard'/>
        <Route component={Profile} path='/profile'/>
        <Route component={QuestionPage} path='/question-page'/>
        <Route component={WinnerPage} path='/winner-page'/>
        <Route component={Stats} path='/stats'/>
    </Switch>
)