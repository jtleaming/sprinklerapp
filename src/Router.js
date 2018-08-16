import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Settings from './Settings';
import Zones from './Zones';
import App from './App';
import ConfigureZones from './ConfigureZones';
import Schedules from './Scheduling/Schedules';


export default (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/settings" component={Settings} />
        <Route path="/zones" component={Zones} />
        <Route path="/configurezones" component={ConfigureZones} />
        <Route path='/schedules' component={Schedules} />
    </Switch>
);
