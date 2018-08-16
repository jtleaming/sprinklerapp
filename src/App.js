import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators} from 'reactstrap';
import sprinkler from './sprinkler.svg';
import './App.css';
import Schedule from './Scheduling/Schedule';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentSchedule: this.getCurrentSchedule(),
            activeIndex: 0
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    getCurrentSchedule = () =>{
        var schedules = Object.keys(localStorage);
        var zonesIndex = schedules.indexOf('Zones');
        schedules.splice(zonesIndex, 1);
        var runningSchedules = [];

        schedules.forEach(schedule => {
            let sched = JSON.parse(localStorage[schedule]);
            if (sched.Run) {
                runningSchedules.push(
                    <Schedule key={schedule[9]} createRows={true} rowConfig={sched}/>
                );
            }
        });
        return runningSchedules;
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.currentSchedule.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.currentSchedule.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }


    render() {
        const { activeIndex, currentSchedule } = this.state;
        const slides = currentSchedule.map((schedule) => {
            return (
                <CarouselItem
                    className = 'car'
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={schedule.key}
                >
                    <div>{schedule}</div>
                </CarouselItem>
            );
        });
        return (
            <div className="App">
                <header className="App-header">
                    <img src={sprinkler} className="App-logo" alt="sprinkler" />
                    <h1 className="App-title">Welcome to your sprinkler system!</h1>
                    <nav className='nav'>
                        <Link to="/settings"> <Button className='nav-button'>Settings</Button> </Link>
                        <Link to="/zones"> <Button className='nav-button'>Zones</Button> </Link>
                    </nav>
                </header>
                {currentSchedule > 0 && <div> <h1>Schedule {activeIndex + 1}</h1>
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                        interval={false}
                    >
                        <CarouselIndicators items={currentSchedule} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl className='car-con' direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </div>
                }
            </div>
        );
    }
}
export default App;
