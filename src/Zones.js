import React, { Component } from 'react';
import Zone from './Zone';
import sprinkler from './sprinkler.svg';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';

class Zones extends Component {

    initialState = () =>{
        return {
            zones: Zone.setZones()
        };
    };

    state = this.initialState();

    render() { 
        return (<div className="App">
            <header className="App-header">
                <Link to='/'>
                    <img src={sprinkler} className="App-logo" alt="sprinkler" />
                </Link>
                <h1>Zones</h1>
                <nav className='nav'>
                    <Link to='/settings'><Button style={{ margin: '0px 5px 0px 5px', alignContent: 'left' }}>Settings</Button></Link>
                </nav>
            </header>
            <div>{this.state.zones}</div>
        </div> );
    }
}
 
export default Zones;