
import React from 'react';
import SearchInput from './SubComponents/SearchInput';
import SearchrRsult from './SubComponents/SearchrRsult';
import ProgressBar from './SubComponents/ProgressBar';
// import data  from '../../data/data';
const DefaultResult = 'https://data.cityofnewyork.us/resource/5scm-b38n.json';
// const FirstNameResult  = 'https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name=KIM&last_name=WONG';
const LastNameResult = 'https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name=WONG';

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
        this.handleProgress = this.handleProgress.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAbortAction = this.handleAbortAction.bind(this);
        this.handleTimeOut = this.handleTimeOut.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    };

    handleCheckBoxClick(event, fieldName) {
        const value = event.target.checked;
        if (fieldName === 'firstName') {
            this.setState({ firstNameChecked: value });
        } else {
            this.setState({ lastNameChecked: value });
        }
    }

    handleTimeOut() {
        const { state } = this;
        const { progress } = state;
        progress.isRunning = false;
        this.setState({ progress });
    }

    handleAbortAction(e) {
        console.log('The XHR call has been aborted.');
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
        this.startTimer(40, 50);
        this.setState({ progress });
        console.log('The loading has been started', e, progress);
    }

    startTimer(timeInterval, offset) {
        const interval = setInterval(() => {
            const { state } = this;
            const { progress } = state;
            progress.status = progress.status + 2;
            this.setState({ progress });
            console.log(progress.status);
            if (progress.status >= offset) {
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

    handleEnded(e) {
        const { state } = this;
    }

    handleProgress(e) {
        const { state } = this;
        const { progress } = state;
    }

    // /** The Method to call on the Search Button Click. */
    onChangeHandle(e) {
        const value = e.target.value;
        if (value === 'first_name') {
            const callBack = (data) => {
                this.setState({ data, currentFilter: 'first_name' });
            }
            Utils.getResponseFromApi(FirstNameResult, 'GET', this.handleBeforeStart, this.handleProgress, this.handleEnded,
                callBack, this.handleAbortAction);
        } else if (value === 'last_name') {
            const callBack = (data) => {
                this.setState({ data, currentFilter: 'last_name' });
            }
            Utils.getResponseFromApi(LastNameResult, 'GET', this.handleBeforeStart,
                this.handleProgress, this.handleEnded, callBack, handleAbortAction);
        }
    }

    saveData(data) {
        this.setState({ data });
    }

    handleClick(e) {
        Utils.getResponseFromApi(DefaultResult, 'GET', this.handleBeforeStart, this.handleProgress, this.handleEnded, this.saveData);
        const { state } = this;
        const { firstNameChecked = false, lastNameChecked = false, firstName, lastName } = state;
        let queryParameter = '';
        let validSearch = false;
        // Check if the checkbox has been clicked and first name is not empty.
        if (firstNameChecked && (firstName && firstName !== '')) {
            queryParameter = 'first_name=' + encodeURI(firstName);
            validSearch = true;
        }
        if (lastNameChecked && (lastName && lastName !== '')) {
            const lastNameValue = 'last_name=' + encodeURI(lastName);
            queryParameter = queryParameter !== '' ? queryParameter + '&' : queryParameter;
            queryParameter = queryParameter + lastNameValue;
            validSearch = true;
        }
        if (!validSearch) {
            alert('Please enter Last Name or First Name to filter from the results.');
        } else {
            const url = DefaultResult + '?' + queryParameter;
            Utils.getResponseFromApi(url, 'GET', this.handleBeforeStart, this.handleProgress, this.handleEnded, this.saveData);
        }
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
                    handleCheckBoxClick={this.handleCheckBoxClick}
                    onChangeHandle={this.onChangeHandle}
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