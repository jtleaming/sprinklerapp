import React, { Component } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import Zone from './Zone';
import './App.css';
import sprinkler from './sprinkler.svg';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import Slider from 'rc-slider';
import "react-table/react-table.css";
import Notifications, { notify } from 'react-notify-toast';


const DaysOfTheWeek = (props) => {
    let days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
    const className = (day) => {
        if (props.selectedDays.indexOf(day) >= 0) { return 'selected'; }
    }
    return (
        <div>
            {days.map((day, i) =>
                    <day id={day} key={i} className={className(day)} onClick={() => props.selectDay(day)}>{day}</day>
                )}
        </div>
    )
}

class Schedule extends Component {
    constructor(props){
        super();
        this.addRow = this.addRow.bind(this);
    }
    state ={
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
            '+': function (a, b) { return a + b },
            '-': function (a, b) { return a - b },
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
            hours = hours + 1
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
            })
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
        const { duration, time, row, selectedZones, dropdownTitle, selectedDays} = this.state;
        if(dropdownTitle === 'Zones'){
            notify.show('You must select a Zone motherfucker!');
            return;
        }
        if(selectedDays.length === 0){
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
        )
        this.setState({ 
            row, 
            disableClock: true,
            time: this.changeTime(time, duration, '+'),
            dropdownTitle: 'Zones',
            selectedZones
        });

    }

    render(){
        let zonesToSelect = Object.keys(JSON.parse(localStorage.Zones));
        zonesToSelect.shift();
        return(
            <div>
                <div>
                    <DaysOfTheWeek selectDay={this.selectDay} selectedDays={this.state.selectedDays} time={this.state.time} />
                </div>
                    <TimePicker onChange={this.onChange} value={this.state.time} disabled={this.state.disableClock} className='react-time-picker' />
                    <Slider marks={{ 5: '5', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30' }} min={1} max={35} onChange={this.slideChange} value={this.state.duration} />
                <br />
                <p>{this.state.duration}</p> 
                <div>
                    <Button onClick={this.addRow}>Create Row</Button>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>{this.state.dropdownTitle}</DropdownToggle>
                        <DropdownMenu>
                            {zonesToSelect.map((zoneName, i) => {
                                return <DropdownItem onClick={() => this.select(zoneName)} disabled={this.state.selectedZones.includes(zoneName)} key={i} id={zoneName}>{zoneName}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            <table>
                <thead>
                    <tr>
                        <th>Zone Number</th>
                        <th>Days of Week</th>
                        <th>Duration</th>
                        <th>Start Time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.row}
                </tbody>
            </table>
                <Button id='save-button' onClick={this.saveSchedule} style={{ margin: 15 }}>Save Schedule</Button>
                <Button id='clear-button' onClick={this.clearSchedule} style={{ margin: 15 }}>Clear Schedule</Button>
            </div>
        );
    }
}

class CellSlider extends Component{
    state = {
        duration: this.props.duration
    }
    slideChange = duration => this.setState({ duration });
    render(){
        return(
            <td>{this.state.duration} <Slider min={1} max={35} onChange={this.slideChange} value={this.state.duration}/></td>
        )
    }
}

class Settings extends Component {

   initialSate = () => {
        return {
            zones: Zone.setZones(),
            selectedDays: [],
            zoneNumber: window.localStorage.length === 0 ? 0 : window.localStorage.length,
            time: '10:00',
            duration: 1,
            disableClock: false,
            schedules: null
        }
    }

    state = this.initialSate();

    renderEditable = this.renderEditable.bind(this);

    reset = () => {
        this.setState(this.initialSate())
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
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
    };

    createSchedule = () =>{
        this.setState({schedules: <Schedule/>})
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