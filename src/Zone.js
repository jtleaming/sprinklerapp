import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';

class Zone extends Component {

    state = {
        classColor: { backgroundColor: '#d81647e8' },
        zoneNumber: arguments[0].zoneNumber,
        id: null,
        selectedDays: arguments[0].selectedDays.sort(),
        time: arguments[0].time,
        duration: arguments[0].duration
    }

    static setZones = () => {
        let numberOfZones = window.localStorage.length;
        let zones = [];
        if(numberOfZones === 0){
            return zones;
        }
        else{
            for (let index = 1; index <= numberOfZones; index++) {
                let zone = JSON.parse(window.localStorage.getItem(`zone ${index}`));
                zones.push(<Zone key={index} time={zone.time} zoneNumber={zone.zoneNumber} selectedDays={zone.selectedDays} duration={zone.duration} />);
            }
            return zones;
        }
    }

    toggleZone = (zoneNumber) => {
        var me = this;
       
        if (this.state.classColor.backgroundColor === '#d81647e8') {
            let startedZone = document.getElementById('zone-on')
            if (startedZone) {
                alert('Cannont start more than one zone at a time!')
            }
            else {
                console.log(`starting zone ${zoneNumber}`);
                this.setState({
                    classColor: { backgroundColor: 'green' },
                    id: 'zone-on'
                });
                window.setTimeout(function (){
                    console.log(`stopping zone ${zoneNumber}`)
                    me.setState({ classColor: { backgroundColor: '#d81647e8' }, 
                    id: null })
                }, me.state.duration * 60000);
            }
        }
        else {
            console.log(`stopping zone ${zoneNumber}`);
            this.setState({
                classColor: {
                    backgroundColor: '#d81647e8'
                },
                id: null
            })
        }
    };

    render() {
        const { zoneNumber, classColor, id, selectedDays, time, duration } = this.state;
        return (
            <Button className='zone-button' onClick={() => this.toggleZone(zoneNumber)} style={classColor} id={id} >Zone {zoneNumber}
                {selectedDays.map((day, i) =>
                    <div key={i}>{day}</div>
                )}
                <div>{time}, {duration + 'min'}</div>
            </Button>
        );
    }
};


export default Zone;