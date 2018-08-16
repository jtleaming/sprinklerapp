import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import sprinkler from './sprinkler.svg';
import './App.css';
import Schedule from './Scheduling/Schedule';

class App extends Component {
    constructor(props){
        super();

        this.state = {
            currentSchedule: this.getCurrentSchedule()
        };
    }

    getCurrentSchedule = () =>{
        var schedules = Object.keys(localStorage);
        var zonesIndex = schedules.indexOf('Zones');
        schedules.splice(zonesIndex, 1);

        var runningSchedules = [];
        var rows = [];

        schedules.forEach(schedule => {
            let sched = JSON.parse(localStorage[schedule]);
            if (sched.Run) {
                runningSchedules.push(
                    <Schedule key={schedule[9]} createRows={true} rowConfig={sched}/>
                );
            }
        });
        return runningSchedules;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={sprinkler} className="App-logo" alt="sprinkler" />
                    <h1 className="App-title">Welcome to your sprinkler system!</h1>
                    <nav className='nav'>
                        <Link to="/settings"> <Button className='nav-button'>Settings</Button> </Link>
                        <Link to="/zones"> <Button className='nav-button'>Zones</Button> </Link>
                    </nav>
                </header>
                <h3>Current Schedule</h3>
                {this.state.currentSchedule}
            </div>
        );
    }
}
export default App;
