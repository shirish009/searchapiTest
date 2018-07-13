
import React from 'react';
import SearchInput from './SubComponents/SearchInput';
import SearchrRsult from './SubComponents/SearchrRsult';
import ProgressBar from './SubComponents/ProgressBar';
const URL = 'https://data.cityofnewyork.us/resource/5scm-b38n.json';

import Utils from './utils/Utils';

class SearchAPI extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            showTable: false,
            progress: {
                isRunning: false,
                status: -1
            }
        };
        this.handleClick = this.handleClick.bind(this);
        // this.onChangeHandle = this.onChangeHandle.bind(this);
        this.handleBeforeStart = this.handleBeforeStart.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTimeOut = this.handleTimeOut.bind(this);
        this.startTimer = this.startTimer.bind(this);
    };

    handleTimeOut() {
        const { state } = this;
        const { progress } = state;
        progress.isRunning = false;
        progress.status = -1;
        this.setState({ progress });
    }

    handleAbortAction(e) {
        console.log('The XHR call has been aborted.');
        const { state } = this;
        const { progress } = state;
        progress.isRunning = false;
        progress.status = -1;
        this.setState({ progress });
    }

    handleInputChange(e, fieldName) {
        const value = e.target.value;
        const { state } = this;
        if (fieldName === 'firstName') {
            this.setState({ 'firstName': value });
        } else {
            this.setState({ 'lastName': value });
        }
    }

    handleBeforeStart(e) {
        const { state } = this;
        const { progress } = state;
        progress.isRunning = true;
        progress.status = 1;
        this.startTimer(60, 50);
        this.setState({ progress });
        console.log('The loading has been started', e, progress);
    }

    startTimer(timeInterval, offset) {
        // Setting an interval upto 100 seconds.
        const interval = setInterval(() => {
            const { state } = this;
            const { progress } = state;
            progress.status = progress.status + 1;
            this.setState({ progress });
            // As this method is getting called 2 times, check it has been reached at the 1st level.
            if (progress.status >= offset) {
                // Clear the Interval which is currently stored in the state.
                clearInterval(state.interval);
                if (progress.status < 100) {
                    this.startTimer(80, 100);
                } else {
                    this.handleTimeOut();
                }
            }
        }, timeInterval);
        this.setState({ interval });
    }

    saveData(data) {
        this.setState({ data });
    }

    handleClick(e) {
        const { state } = this;
        const { firstNameChecked = false, lastNameChecked = false, firstName, lastName } = state;
        let queryParameter = '';
        let validSearch = false;
        // Check if the checkbox has been clicked and first name is not empty.
        if (firstName && firstName !== '') {
            queryParameter = 'first_name=' + encodeURI(firstName);
            validSearch = true;
        }
        if (lastName && lastName !== '') {
            const lastNameValue = 'last_name=' + encodeURI(lastName);
            queryParameter = queryParameter !== '' ? queryParameter + '&' : queryParameter;
            queryParameter = queryParameter + lastNameValue;
            validSearch = true;
        }
        const url = queryParameter !== '' ? (URL + '?' + queryParameter) : URL;
        Utils.getResponseFromApi(url, 'GET', this.handleBeforeStart, this.saveData);
    };

    render() {
        const { state } = this;
        const { progress, firstName, lastName } = state;
        const { isRunning, status } = progress;
        const statusText = status ? `${status}%` : '0px';
        return (
            <div className="serch-api col-12">
                <SearchInput
                    firstName={firstName}
                    lastName={lastName}
                    handleInputChange={this.handleInputChange}
                    handleClick={this.handleClick} />
                {isRunning ? (
                    <ProgressBar progress={progress} />
                ) : null}
                {!isRunning ? (
                    <SearchrRsult
                        data={this.state.data} />
                ) : null}
            </div>
        );
    }
}

export default SearchAPI;