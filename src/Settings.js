import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Zone from './Zone';
import './App.css';
import sprinkler from './sprinkler.svg';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import Slider from 'rc-slider';
import "react-table/react-table.css";


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
    state ={
        zones: this.props.zones
    }

    upDateTime = (duration, time) => {
        
    }

    render(){
        return(
            <table>
                <tr>
                    <th>Zone Number</th>
                    <th>Days of Week</th>
                    <th>Duration</th>
                    <th>Start Time</th>
                </tr>
                {this.state.zones.map(props => 
                    <tr>
                        <td>{props.zoneNumber}</td>
                        <td contentEditable='true'>{props.selectedDays.join(', ')}</td>
                        <CellSlider duration={props.duration} onChange={()=>this.upDateTime(props.duration, props.time)}/>
                        <td>{props.time}</td>
                    </tr>
                )}
            </table>
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
            zones: Zone.getZones(),
            selectedDays: [],
            zoneNumber: window.localStorage.length === 0 ? 0 : window.localStorage.length,
            time: '10:00',
            duration: 1,
            disableClock: false
        }
    }

    state = this.initialSate();

    renderEditable = this.renderEditable.bind(this);

    reset = () => {
        this.setState(this.initialSate())
    }

    selectDay = (clickedDay) => {
        if (this.state.selectedDays.indexOf(clickedDay) >= 0) { 
            document.getElementById(clickedDay).className = null;
            var selectedDays = this.state.selectedDays;
            selectedDays.splice(this.state.selectedDays.indexOf(clickedDay),1);
            this.setState({
                selectedDays: selectedDays
            })
        }
        else{
            this.setState(prevState => ({
                selectedDays: prevState.selectedDays.concat(clickedDay)
            }));
        }
    };

    addZone = () => {
        const { zones, selectedDays, time, duration, disableClock} = this.state;

        var zoneNumber = this.state.zoneNumber;
        zoneNumber = zoneNumber + 1;

        if(zones.length < 8){
            this.setState ({
                zones: zones.concat(<Zone key={zoneNumber} time={time} zoneNumber={zoneNumber} selectedDays={selectedDays} duration={duration}/>),
                zoneNumber: zoneNumber,
                time: this.changeTime(time, duration, '+')
            });
        }
        if(!disableClock){
            this.setState({ disableClock: true})
        }
    };
    
    deleteZone  = (e) => {
        const zones = this.state.zones;
        const zoneNumber = this.state.zoneNumber;
        const time = this.state.time;
        const duration = this.state.duration;
        const index = zones.indexOf(e.target.value);
        
        
        const zoneButtons = document.getElementsByClassName('zone-button');

        localStorage.removeItem('zone ' + (zoneNumber - 1).toString());
        
        if(zoneButtons.length > 0){
            zones.splice(index,1);
            this.setState({
                time: this.changeTime(time, duration,'-'),
                zones: zones,
                zoneNumber: zoneNumber - 1
            });
        }
    };

    saveZones = (zones) => {
        var zoneJson = ''
        zones.forEach(zone => {
            zoneJson = zoneJson.concat(
            JSON.stringify(zone.props));
            localStorage.setItem('zone ' + zone.key, JSON.stringify(zone.props));
        });

        console.log(`zones saved ${zoneJson}`);
    };

    clearData = () => {
        localStorage.clear();
    };

    onChange = (time) => this.setState({ time });

    slideChange = duration => this.setState({duration});

    static changeTime = (time, duration, operator) => {
        var operation = {
            '+': function (a, b) { return a + b },
            '-': function (a, b) { return a - b },
        };

        var splitTime = time.split(':');
        if(splitTime[1] === '00' && operator === '-')
        {
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

    render() { 
        const {duration, zones, disableClock, time} = this.state;
        return (
            <div className="App">
            <header className="App-header">
            <Link to='/'>
                <img src={sprinkler} className="App-logo" alt="sprinkler" />
            </Link>
                <h1>Settings</h1>
            </header>
            <div>
                <Button onClick={this.addZone} style={{margin: 15}}>Add Zone</Button>
                <Button onClick={this.deleteZone} style={{margin: 15}}>Delete Zone</Button>
                <Button onClick={this.clearData} style={{ margin: 15 }}>Clear Zones Data</Button>
                </div>
                <div>
                    <DaysOfTheWeek selectDay = {this.selectDay} selectedDays ={this.state.selectedDays} time ={this.state.time}/>
                </div>
                    <TimePicker onChange={this.onChange} value={time} disabled={disableClock} className='react-time-picker'/>
                    <Slider marks={{5:'5', 10:'10', 15:'15', 20:'20', 25:'25', 30:'30'}} min={1} max={35} onChange={this.slideChange} value={duration}/>
                    <br/>
                    <p>{duration}</p>
                <Schedule zones={zones} />
                <br />
                <Button id='save-button' onClick={()=> this.saveZones(zones)}>Save</Button>
                <Button id='clear-button' onClick={this.reset}>Clear</Button>
            </div>
          );
    }
}
 
export default Settings;