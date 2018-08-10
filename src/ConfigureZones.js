import React, { Component } from 'react';
import { Button } from 'reactstrap';
import sprinkler from './sprinkler.svg';
import { Link } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';



class ConfigureZones extends Component {

    initialState() {
        var zones = [];

        if (!localStorage.Zones){
            localStorage.setItem('Zones', '{"NumberOfZones":0}');
        }

        let zoneData = JSON.parse(localStorage.Zones);
        for(var i=1; i<= zoneData.NumberOfZones;i++)
        {
            let state = 'off';
            if(zoneData[`Zone ${i}`]){
                state = 'on';
            }
            zones.push(
                <div key={i} style={{display: 'inline-block', margin:20}}>Zone Number {i}
                    <div>{state}</div>
                </div>);
        }
        return {
            zones: zones
        };
    }

    state = this.initialState();

    addZone = () => {
        let zones = JSON.parse(localStorage.Zones);

        if (zones.NumberOfZones < 8) {
            zones['NumberOfZones'] = zones.NumberOfZones + 1;
            zones['Zone ' + zones.NumberOfZones] = false;
            localStorage.setItem('Zones', JSON.stringify(zones));

            let myColor = { background: '#16d816e8', text: '#000000'};
            notify.show(`Zone ${zones.NumberOfZones} created succesfully!`, 'custom', 1500, myColor);

            this.setState(this.initialState());
        }
        else{
            let myColor = { background: '#D81647E8', text: '#FFFFFF' };
            notify.show('Cannot create more than 8 zones.', 'custom', 1000, myColor);
        }
    };

    deleteZone = () => {
        let zones = JSON.parse(localStorage.Zones);
        delete zones[`Zone ${zones.NumberOfZones}`];
        let myColor = { background: '#16d816e8', text: '#000000' };
        notify.show(`Zone ${zones.NumberOfZones} deleted!`, 'custom', 1500, myColor);

        zones['NumberOfZones'] = zones.NumberOfZones - 1;
        localStorage.setItem('Zones', JSON.stringify(zones));

        this.setState(this.initialState());
    };

    render() {
        return (
            <div className="App">
                <Notifications />
                <header className="App-header">
                    <Link to='/'>
                        <img src={sprinkler} className="App-logo" alt="sprinkler" />
                    </Link>
                    <h1>Configure Zones</h1>
                    <nav className='nav'>
                        <Link to='/settings'><Button style={{ alignContent: 'left' }}>Settings</Button></Link>
                    </nav>
                </header>
                <Button id='save-button' onClick={this.addZone} style={{ margin: 15 }}>Add Zone</Button>
                <Button id='clear-button' onClick={this.deleteZone} style={{ margin: 15 }}>Delete Zone</Button>
                <div>
                    {
                        this.state.zones
                    }
                </div>
            </div>);
    }
}

export default ConfigureZones;