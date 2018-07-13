import React from 'react';

class ProgressBar extends React.Component {

    render() {
        const {props} = this;
        const {progress} = props;
        const styleObject = {width: `${progress.status}%`};
        return (
            <div className="progress float-left w-100 mb-3 mt-3">
                <div className="progress-bar bg-info" style={styleObject}></div>
            </div>
        )
    }
}

export default ProgressBar;