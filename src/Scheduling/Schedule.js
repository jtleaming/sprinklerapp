import React, { Component } from 'react';
import '../App.css';
import CellSlider from '../CellSlider';
import 'react-table/react-table.css';

class Schedule extends Component {
    constructor(props) {
        super();

        this.state = this.setInitialState(props);
    }

    setInitialState = (props) => {
        return{
            rows: props.createRows ? this.addRow(props.rowConfig) : props.rows
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            this.setState(this.setInitialState(this.props));
        }
    }

    onChange = (time) => this.setState({ time });

    addRow (props) {
        var rows = [];
        for(var prop in props){
            if(prop === 'Run');
            else{
                let row = props[prop];
                rows.push(
                    <tr key={row['Zone Number'][5]}>
                        <td>{row['Zone Number']}</td>
                        <td>{row.Days}</td>
                        <CellSlider duration={row.Duration} onChange={() => this.upDateTime(row.Duration, row.Time)} />
                        <td>{row['Start Time']}</td>
                    </tr>
                );
            }
            
        }
        return rows;
    }


    render() {
        let zonesToSelect = Object.keys(JSON.parse(localStorage.Zones));
        zonesToSelect.shift();
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Zone Number</th>
                            <th>Days of Week</th>
                            <th>Duration</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Schedule;