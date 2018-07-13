import React from 'react';

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleTimerEvent = this.handleTimerEvent.bind(this);       
        this.state = {
            timer: 0,
            interval: 2
        }
    }

    handleTimerEvent() {
        const {state} = this;
        let {timer} = state;
        if (timer > 100) {
            const {props} = this;
            clearInterval(state.interval);
        } else {
            ++timer;
            this.setState({timer});
        }
    }

    render() {
        const {props, state} = this;
        const {timer} = state;
        const {progress} = props;
        const styleObject = {width: `${progress.status}%`};
        return (
            <div className="progress">
                <div className="progress-bar bg-info" style={styleObject}></div>
            </div>
        )
    }
}

export default ProgressBar;