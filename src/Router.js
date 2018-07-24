import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Settings from './Settings'
import Zones from './Zones'
import App from "./App";

export default (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/zones" component={Zones}/>
    </Switch>
);