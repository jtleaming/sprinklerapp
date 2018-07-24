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
            let startedZone = document.getElementsByClassName('zone-button-on')
            if(startedZone.length > 0){
                alert('Cannont start more than one zone at a time!')
            }
            else{
                console.log(`starting zone ${zoneNumber}`);
                this.setState({
                    className: 'zone-button-on'
                });
            }
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
        <Button className={className} onClick={() => this.toggleZone(zoneNumber)} style={{margin: 15, height: 100, width: 100 }} >Zone {zoneNumber}</Button>
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
                <div className='col-md-4'>
                    {this.state.zones}
                </div>
            </div>
          );
    }
}
 
export default Settings;