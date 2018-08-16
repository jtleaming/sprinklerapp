import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import './App.css';
import sprinkler from './sprinkler.svg';
import Scheduler from './Scheduling/Scheduler';
import Notifications from 'react-notify-toast';

class Settings extends Component {

   initialSate = () => {
       if(!localStorage.Zones){
           localStorage.setItem('Zones', '{"NumberOfZones":0}');
       }
       return {
       };
   }

    state = this.initialSate();

    createSchedule = () =>{
        this.setState({schedules: <Scheduler />});
    }

    render() {
        return (
            <div className="App">
                <Notifications />
                <header className="App-header">
                    <Link to='/'>
                        <img src={sprinkler} className="App-logo" alt="sprinkler" />
                    </Link>
                    <h1>Settings</h1>
                    <nav className='nav'>
                        <Link to='/ConfigureZones'><Button className='nav-button'>Configure Zones</Button></Link>
                        <Link to="/zones"> <Button className='nav-button'>Zones</Button> </Link>
                        <Link to="/schedules"> <Button className='nav-button'>Schedules</Button> </Link>
                    </nav>
                </header>
                <div>
                    <Button onClick={this.createSchedule} style={{margin: 15}}>Create Schedule</Button>
                </div>
                {this.state.schedules}
                <br />
            </div>
        );
    }
}
 
export default Settings;