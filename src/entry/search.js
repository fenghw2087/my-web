import React from 'react';
import ReactDOM from 'react-dom';
import '../common/globel.less';
import SearchPage from '../page/search/search';
import SearchDPage from '../page/search/searchD';

import { HashRouter, Switch, Route } from 'react-router-dom';


ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path='/:data' component={ SearchPage } exact />
            <Route path='/searchD/:data' component={ SearchDPage } exact />
        </Switch>
    </HashRouter>,
    document.getElementById('root'));
