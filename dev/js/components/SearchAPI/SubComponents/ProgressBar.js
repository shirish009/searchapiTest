import React from 'react';

class ProgressBar extends React.Component {

    render() {
        const { props } = this;
        return (
            <div className="progress">
                <div className="progress-bar bg-info" style={{ width: props.statusText }}></div>
            </div>
        )
    }
}

export default ProgressBar;