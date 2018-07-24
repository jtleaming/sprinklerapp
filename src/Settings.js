import React, { Component } from 'react';
import {Button} from 'reactstrap';
import './App.css';


class Zone extends Component{

    state ={
        className: 'zone-button',
        zoneNumber: arguments[0].zoneNumber 
       }

    toggleZone = (zoneNumber) => {
        if(this.state.className === 'zone-button'){
            console.log(`starting zone ${zoneNumber}`);
            this.setState({
                className: 'zone-button-on'
            });
        }
        else{
            console.log(`stopping zone ${zoneNumber}`);
            this.setState({
                className: 'zone-button'
            })
        }
    };
    render(){
        const{zoneNumber, className} = this.state;
    return(
        <Button className={className} onClick={() => this.toggleZone(zoneNumber)}>Zone {zoneNumber}</Button>
    );
}
};

class Settings extends Component {
    static setInitialState = () => ({
        zones: []
    });
    state = {
        zones:[],
        zoneNumber: 1
    };

    startZone = (zoneNumber) => {
        console.log(`starting zone ${zoneNumber}`);
        this.className = 'zone-button-on';
    }

    addZone = () => {
        const zones = this.state.zones;
        const zoneNumber = this.state.zoneNumber;
        if(zones.length < 8){
            this.setState ({
                // zones: zones.concat(<Button className='zone-button' onClick={() => this.startZone(zoneNumber)} key={zoneNumber}>Zone {zoneNumber}</Button>)
                zones: zones.concat(<Zone key={zoneNumber} zoneNumber={zoneNumber}/>),
                zoneNumber: zoneNumber+1
            });
        }
    };

    render() { 
        return (
            <div className="App">
            <header className="App-header">
                <h1>Settings</h1>
            </header>
            <Button onClick={this.addZone}>Add Some Zones</Button>
                <div>
                    {this.state.zones}
                </div>
            </div>
          );
    }
}
 
export default Settings;