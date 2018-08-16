import React, { Component } from 'react';
import Schedule from './Schedule';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../App.css';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import '../index.css';
import Slider from 'rc-slider';
import CellSlider from '../CellSlider';
import { notify } from 'react-notify-toast';

const DaysOfTheWeek = (props) => {
    let days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
    const className = (day) => {
        if (props.selectedDays.indexOf(day) >= 0) { return 'selected'; }
    };
    return (
        <div>
            {days.map((day, i) =>
                <day id={day} key={i} className={className(day)} onClick={() => props.selectDay(day)}>{day}</day>
            )}
        </div>
    );
};

class Scheduler extends Component {
    constructor(props){
        super();
        this.saveSchedule = this.saveSchedule.bind(this);

        this.state = this.setInitialState();
    }
    
    setInitialState = () =>{
        var i = 1;
        Object.keys(localStorage).forEach(key => key.includes('Schedule') ? i++ : i); 
        return {
            startTime: null,
            daysOfTheWeek: null,
            time: '10:00',
            duration: 1,
            disableClock: false,
            selectedDays: [],
            dropdownOpen: false,
            dropdownTitle: 'Zones',
            rows: [],
            selectedZones: [],
            numberOfSchedules: i
        };
    }

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
    }

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
        }

        return hours.toString() + ':' + minutes.toString();
    }

    onChange = (time) => this.setState({ time });

    slideChange = duration => this.setState({ duration });

    select = (zoneName) => {
        this.setState({
            dropdownTitle: zoneName
        });
    }


    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    saveSchedule = () => {

        if(this.state.rows.length === 0){
            notify.show('Must add rows before saving schedule');

        }
        else{
            let s = this.state.numberOfSchedules;
            let i = 0;
            let sections = [];
            this.state.rows.forEach(row => {
                let rowProps = row.props.children;
                sections.push(
                    `"Section ${i}": {"Start Time": "${rowProps[3].props.children}", "Duration": ${rowProps[2].props.duration}, "Days": "${rowProps[1].props.children}" , "Zone Number": "${rowProps[0].props.children}"}`);
                i++;
            });
            localStorage.setItem(`Schedule ${s}`, `{${sections}, "Run": false}`);
            notify.show('Schedule saved successfully!');
            this.setState(this.setInitialState());
        }
    };

    clearSchedule = () => {
        this.setState(this.setInitialState());
    }

    addRow = () => {
        const { duration, time, rows, selectedZones, dropdownTitle, selectedDays } = this.state;
        if (dropdownTitle === 'Zones') {
            notify.show('You must select a Zone motherfucker!');
            return;
        }
        if (selectedDays.length === 0) {
            notify.show('Goddamnit motherfucker, you can\'t not select a fucking day.');
            return;
        }
        selectedZones.push(dropdownTitle);

        rows.push(
            <tr key={dropdownTitle[5]}>
                <td>{dropdownTitle}</td>
                <td>{selectedDays.join(', ')}</td>
                <CellSlider duration={duration} onChange={() => this.upDateTime(duration, time)} />
                <td>{time}</td>
            </tr>
        );
        this.setState({
            rows,
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
                <div>
                    <DaysOfTheWeek selectDay={this.selectDay} selectedDays={this.state.selectedDays} time={this.state.time} />
                </div>
                <TimePicker onChange={this.onChange} value={this.state.time} disabled={this.state.disableClock} className='react-time-picker' />
                <Slider marks={{ 5: '5', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30' }} min={1} max={35} onChange={this.slideChange} value={this.state.duration} />
                <br />
                <p>{this.state.duration}</p>
                <div>
                    <Button onClick={this.addRow}>Create rows</Button>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>{this.state.dropdownTitle}</DropdownToggle>
                        <DropdownMenu>
                            {zonesToSelect.map((zoneName, i) => {
                                return <DropdownItem onClick={() => this.select(zoneName)} disabled={this.state.selectedZones.includes(zoneName)} key={i} id={zoneName}>{zoneName}</DropdownItem>;
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Schedule rows={this.state.rows}/>
                <Button id='save-button' onClick={this.saveSchedule} style={{ margin: 15 }}>Save Schedule</Button>
                <Button id='clear-button' onClick={this.clearSchedule} style={{ margin: 15 }}>Clear Schedule</Button>
            </div>
        );
    }
}

export default Scheduler;