import React, { Component } from 'react';
import Zone from './Zone';
import sprinkler from './sprinkler.svg';
import { Link } from 'react-router-dom';



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
                <Link to='/'>
                    <img src={sprinkler} className="App-logo" alt="sprinkler" />
                </Link>
                <h1>Zones</h1>
            </header>
            <div>{this.state.zones}</div>
        </div> );
    }
}
 
export default Zones;