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

    expandSchedule = name => {
        var scheduleProps = JSON.parse(localStorage.getItem(name));
        var schedule = this.state.schedule;
        var rows = [];
        Object.keys(scheduleProps).forEach((property) => {
            var row = scheduleProps[property];
            rows.push(
                <tr key={row['Zone Number'][5]}>
                    <td>{row['Zone Number']}</td>
                    <td>{row.Days}</td>
                    <CellSlider duration={row.Duration} onChange={() => this.upDateTime(row.Duration, row.Time)} />
                    <td>{row['Start Time']}</td>
                </tr>
            );
        });
        schedule = <Schedule rows={rows}> </Schedule>;
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
                            <Link to='/ConfigureZones'><Button style={{ margin: '0px 5px 0px 5px', alignContent: 'left' }}>Configure Zones</Button></Link>
                            <Link to="/zones"> <Button style={{ margin: '0px 5px 0px 5px', alignContent: 'left' }}>Zones</Button> </Link>
                            <Link to="/Settings"> <Button style={{ margin: '0px 5px 0px 5px', alignContent: 'left' }}>Settings</Button> </Link>
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
