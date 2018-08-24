import React from 'react';
import ReactDOM from 'react-dom';
import '../common/globel.less';
import LoginPage from '../page/login/login';
import { HashRouter, Switch, Route } from 'react-router-dom';
import RegisterPage from "../page/login/register";


ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path='/' component={ LoginPage } exact />
            <Route path='/register/:data' component={ RegisterPage } exact />
            <Route path='/:data' component={ LoginPage } exact />
        </Switch>
    </HashRouter>,
    document.getElementById('root'));