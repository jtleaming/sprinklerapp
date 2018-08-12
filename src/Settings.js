import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Zone from './Zone';
import './App.css';
import sprinkler from './sprinkler.svg';
import 'react-table/react-table.css';
import Scheduler from './Scheduling/Scheduler';
import Notifications from 'react-notify-toast';

class Settings extends Component {

   initialSate = () => {
       return {
           zones: Zone.setZones(),
           selectedDays: [],
           zoneNumber: window.localStorage.length === 0 ? 0 : window.localStorage.length,
           time: '10:00',
           duration: 1,
           disableClock: false,
           rows: this.props.rows
       };
   }

    state = this.initialSate();

    reset = () => {
        this.setState(this.initialSate());
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: '#fafafa' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const zones = this.state.zones;
                    zones[cellInfo.index].props[cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ zones });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.zones[cellInfo.index].props[cellInfo.column.id]
                }}
            />
        );
    }

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
                        <Link to='/ConfigureZones'><Button style={{ margin: '0px 5px 0px 5px', alignContent: 'left' }}>Configure Zones</Button></Link>
                        <Link to="/zones"> <Button style={{ margin: '0px 5px 0px 5px' , alignContent: 'left' }}>Zones</Button> </Link>
                        <Link to="/schedules"> <Button style={{ margin: '0px 5px 0px 5px' , alignContent: 'left' }}>Schedules</Button> </Link>
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