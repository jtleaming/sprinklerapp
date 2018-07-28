import React, { Component } from 'react';
import Zone from './Zone';

class Zones extends Component {

    initialState = () =>{
        return {
            zones: Zone.setZones()
        }
    };

    state = this.initialState();

    render() { 
        return (<div className="App">
            <header className="App-header">
                <h1>Zones</h1>
            </header>
            <div>{this.state.zones}</div>
        </div> );
    }
}
 
export default Zones;