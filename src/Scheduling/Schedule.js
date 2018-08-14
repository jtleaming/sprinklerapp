import React, { Component } from 'react';
import '../App.css';
import CellSlider from '../CellSlider';
import 'react-table/react-table.css';
import { notify } from 'react-notify-toast';

class Schedule extends Component {
    constructor(props) {
        super();

        this.state = {
            startTime: props.startTime,
            daysOfTheWeek: props.daysOfTheWeek,
            time: props.time,
            duration: props.duration,
            selectedDays: props.selectedDays,
            dropdownTitle: props.dropdownTitle,
            rows: props.rows
        };
    }

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

    addRow () {
        const { duration, time, rows, selectedZones, dropdownTitle, selectedDays } = this.state;

        rows.push(
            <tr key={dropdownTitle[5]}>
                <td>{dropdownTitle}</td>
                <td>{selectedDays.join(', ')}</td>
                <CellSlider duration={duration} onChange={() => this.upDateTime(duration, time)} />
                <td>{time}</td>
            </tr>
        );
        return rows;
    }


    render() {
        let zonesToSelect = Object.keys(JSON.parse(localStorage.Zones));
        zonesToSelect.shift();
        return (
            <div>
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
                        {this.state.rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Schedule;