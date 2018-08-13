import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';

class Zone extends Component {
    setInitialState = () => {
        let zones = JSON.parse(localStorage.Zones);
        if(zones[`Zone ${this.props.ZoneNumber}`]) {
            return({classColor : {backgroundColor: 'green'}, id:'zone-on'});
        }
        else{
            return({ classColor: { backgroundColor: '#d81647e8' } });
        }
    }

    state = this.setInitialState();

    static setZones = () => {
        let zonesJson = localStorage.Zones ? JSON.parse(localStorage.Zones): null,
            zones = [];
        if (zonesJson.NumberOfZones === 0){
            return zones;
        }
        else{
            for (let index = 1; index <= zonesJson.NumberOfZones; index++) {
                zones.push(<Zone key={index} ZoneNumber={index}/>);
            }
            return zones;
        }
    }

    toggleZone = (zoneNumber) => {
        let zoneJson = JSON.parse(localStorage.Zones);

        if (this.state.classColor.backgroundColor === '#d81647e8') {
            let startedZone = document.getElementById('zone-on');
            if (startedZone) {
                alert('Cannont start more than one zone at a time!');
            }
            else {
                console.log(`starting zone ${zoneNumber}`); 
                zoneJson[`Zone ${zoneNumber}`] = true;
                localStorage.setItem('Zones', JSON.stringify(zoneJson));

                this.setState({
                    classColor: { backgroundColor: 'green' },
                    id: 'zone-on'
                });
                // window.setTimeout(function (){
                //     console.log(`stopping zone ${zoneNumber}`)
                //     me.setState({ classColor: { backgroundColor: '#d81647e8' }, 
                //     id: null })
                // }, me.state.duration * 60000);
            }
        }
        else {
            console.log(`stopping zone ${zoneNumber}`);
            zoneJson[`Zone ${zoneNumber}`] = false;
            localStorage.setItem('Zones', JSON.stringify(zoneJson));
            this.setState({
                classColor: {
                    backgroundColor: '#d81647e8'
                },
                id: null
            });
        }
    };

    render() {
        let {classColor, id } = this.state;
        return (
            <Button className='zone-button' onClick={() => this.toggleZone(this.props.ZoneNumber)} style={classColor} id={id} >Zone {this.props.ZoneNumber}
            </Button>
        );
    }
};


export default Zone;