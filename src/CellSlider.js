import React, { Component } from 'react';
import Slider from 'rc-slider';

class CellSlider extends Component {
    state = {
        duration: this.props.duration
    }
    slideChange = duration => this.setState({ duration });
    render() {
        return (
            <td>{this.state.duration} <Slider min={1} max={35} onChange={this.slideChange} value={this.state.duration} /></td>
        );
    }
}

export default CellSlider;