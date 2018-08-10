import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import sprinkler from './sprinkler.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={sprinkler} className="App-logo" alt="sprinkler" />
                    <h1 className="App-title">Welcome to your sprinkler system!</h1>
                </header> 
                <Link to="/settings"> <Button style={{ margin: 15 }}>Settings</Button> </Link>
                <Link to="/zones"> <Button style={{ margin: 15 }}>Zones</Button> </Link>
            </div>
        );
    }
}
export default App;
