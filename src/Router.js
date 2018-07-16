import React from 'react';
import { Route } from 'react-router-dom';
import Settings from './Settings'
import Zones from './Zones'
import App from "./App";

export default (
    <div>
        <Route exact path="/" component={App}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/zones" component={Zones}></Route>
    </div>
);