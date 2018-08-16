import React, { Component } from 'react';
import '../App.css';
import CellSlider from '../CellSlider';
import 'react-table/react-table.css';
import { notify } from 'react-notify-toast';
import Schedule from './Schedule';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import sprinkler from '../sprinkler.svg';


class Schedules extends Component {
    constructor(props) {
        super();
        this.state = Schedules.setInitialState();
    }

    static setInitialState = () =>({
        schedule: null
    });

    toggleSchedule = (scheduleName) =>{
        var schedule = JSON.parse(localStorage.getItem(scheduleName));

        schedule.Run ? schedule.Run = false : schedule.Run = true;

        localStorage.setItem(scheduleName, JSON.stringify(schedule));

        this.expandSchedule(scheduleName);
    }

    expandSchedule = name => {
        var scheduleProps = JSON.parse(localStorage.getItem(name));
        var schedule = this.state.schedule;

        schedule = 
        <div>
            <Schedule createRows={true} rowConfig={scheduleProps}> </Schedule>
            <div style={{textAlign: 'center'}}>
                {scheduleProps.Run ?
                    <Button id='save-button' onClick={() => this.toggleSchedule(name)}>Set to Run</Button>:
                    <Button id='clear-button' onClick={() => this.toggleSchedule(name)}>Set to not Run</Button>
                }
                <Button>Edit Schedule</Button>
                <Button>Delete Schedule</Button>
            </div>
        </div>;
        this.setState({
            schedule
        });
    }

    render() {
        let zonesToSelect = Object.keys(JSON.parse(localStorage.Zones));
        zonesToSelect.shift();
        return (
            <div>
                <div className="App">
                    <Notifications />
                    <header className="App-header">
                        <Link to='/'>
                            <img src={sprinkler} className="App-logo" alt="sprinkler" />
                        </Link>
                        <h1>Schedules</h1>
                        <nav className='nav'>
                            <Link to='/ConfigureZones'><Button className='nav-button'>Configure Zones</Button></Link>
                            <Link to="/zones"> <Button className='nav-button'>Zones</Button> </Link>
                            <Link to="/Settings"> <Button className='nav-button'>Settings</Button> </Link>
                        </nav>
                    </header>
                </div>
                {
                    Object.keys(localStorage).map((name, i) =>
                        name.includes('Schedule') &&
                        <Button key={i} onClick={() => this.expandSchedule(name)}>{name}</Button>
                    )
                }
                {this.state.schedule}
            </div>
        );
    }
}

export default Schedules;
