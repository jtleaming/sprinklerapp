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
        this.addRow = this.addRow.bind(this);
    }
    state = {
        startTime: null,
        daysOfTheWeek: null,
        time: '10:00',
        duration: 1,
        disableClock: false,
        selectedDays: [],
        dropdownOpen: false,
        dropdownTitle: 'Zones',
        row: [],
        selectedZones: []
    };

    upDateTime = (duration, time) => {

    };

    changeTime = (time, duration, operator) => {
        var operation = {
            '+': function (a, b) { return a + b; },
            '-': function (a, b) { return a - b; },
        };

        var splitTime = time.split(':');
        if (splitTime[1] === '00' && operator === '-') {
            splitTime[1] = '60';
            splitTime[0] = (parseInt(splitTime[0]) - 1).toString();
        }

        var minutes = operation[operator](parseInt(splitTime[1], 10), duration) < 10 ? '0' + operation[operator](parseInt(splitTime[1], 10), duration) : operation[operator](parseInt(splitTime[1], 10), duration);
        var hours = parseInt(splitTime[0], 10);

        if (minutes >= 60) {
            minutes = minutes - 60 < 10 ? '0' + (minutes - 60) : minutes - 60;
            hours = hours + 1;
        };

        return hours.toString() + ':' + minutes.toString();
    };

    onChange = (time) => this.setState({ time });

    slideChange = duration => this.setState({ duration });

    selectDay = (clickedDay) => {
        if (this.state.selectedDays.indexOf(clickedDay) >= 0) {
            document.getElementById(clickedDay).className = null;
            var selectedDays = this.state.selectedDays;
            selectedDays.splice(this.state.selectedDays.indexOf(clickedDay), 1);
            this.setState({
                selectedDays: selectedDays
            });
        }
        else {
            this.setState(prevState => ({
                selectedDays: prevState.selectedDays.concat(clickedDay)
            }));
        }
    };


    select = (zoneName) => {
        this.setState({
            dropdownTitle: zoneName
        });
    };

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    addRow = () => {
        const { duration, time, row, selectedZones, dropdownTitle, selectedDays } = this.state;
        if (dropdownTitle === 'Zones') {
            notify.show('You must select a Zone motherfucker!');
            return;
        }
        if (selectedDays.length === 0) {
            notify.show('Goddamnit motherfucker, you can\'t not select a fucking day.');
            return;
        }
        selectedZones.push(dropdownTitle);

        row.push(
            <tr key={dropdownTitle[5]}>
                <td>{dropdownTitle}</td>
                <td>{selectedDays.join(', ')}</td>
                <CellSlider duration={duration} onChange={() => this.upDateTime(duration, time)} />
                <td>{time}</td>
            </tr>
        );
        this.setState({
            row,
            disableClock: true,
            time: this.changeTime(time, duration, '+'),
            dropdownTitle: 'Zones',
            selectedZones
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
                            <Link to="/schedules"> <Button style={{ margin: '0px 5px 0px 5px', alignContent: 'left' }}>Schedules</Button> </Link>
                        </nav>
                    </header>
                </div>
                <Schedule />
            </div>
        );
    }
}

export default Schedules;
