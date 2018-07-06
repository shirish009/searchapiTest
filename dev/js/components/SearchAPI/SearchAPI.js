
import React from 'react';
import SearchInput from './SubComponents/SearchInput';
import SearchrRsult from './SubComponents/SearchrRsult';
import ProgressBar from './SubComponents/ProgressBar';
const DefaultResult = 'https://data.cityofnewyork.us/resource/5scm-b38n.json';
const FirstNameResult  = 'https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name=KIM&last_name=WONG';
const LastNameResult   = 'https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name=WONG';

import Utils from './utils/Utils';

class SearchAPI extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            progress: {
                isRunning: false,
                status: -1
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.handleBeforeStart = this.handleBeforeStart.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    handleInputChange(e) {
        const value = e.target.value;
        this.setState({searchText: value});
    }

    handleBeforeStart(e) {
        const {state} = this;
        const {progress} = state;
        progress.isRunning = true;
        progress.status = 20;
        this.setState({ progress });
        console.log('The loading has been started', e, progress);
    }

    handleEnded(e) {
        const {state} = this;
        const {progress} = state;        
        progress.status = 100;        
        this.setState({ progress });        
        console.log('The Process has been ended', e, progress);
        const hideProgressBar = () => {
            const changedProgress = {
                isRunning: false,
                status: -1
            };
            this.setState({progress: changedProgress});
        }
        setTimeout(hideProgressBar, 1000);
    }

    handleProgress(e) {
        const {state} = this;
        const {progress} = state;
        console.log('Its in progress.', e);
        progress.status += 20;
        console.log(progress);
        this.setState({ progress });
    }

    onChangeHandle(e) {
        const value = e.target.value;
        if (value === 'first_name') {
            const callBack = (data) => {
                this.setState({data, currentFilter: 'first_name'});
            }
            Utils.getResponseFromApi(FirstNameResult, 'GET', this.handleBeforeStart, this.handleProgress, this.handleEnded, callBack
            );
        } else if (value === 'last_name') {
            const callBack = (data) => {
                this.setState({data, currentFilter: 'last_name'});
            }
            Utils.getResponseFromApi(LastNameResult, 'GET', this.handleBeforeStart, this.handleProgress, this.handleEnded, callBack
            );
        }
    }

    saveData(data) {
        this.setState({data});
    }

    handleClick(e) {
        Utils.getResponseFromApi(DefaultResult, 'GET', this.handleBeforeStart, this.handleProgress, this.handleEnded, this.saveData);
    };

    render() {
        const { state } = this;
        const { progress, searchText, FirstName, LastName, currentFilter} = state;
        const { isRunning, status } = progress;
        const statusText = status ? `${status}%` : '0px';
        return (
            <div className="serch-api col-12">
                <SearchInput 
                value={searchText}
                onChangeHandle={this.onChangeHandle} 
                handleInputChange={this.handleInputChange}
                handleClick={this.handleClick} 
                />
                {isRunning ? (
                   <ProgressBar statusText={statusText}/>
                ) : null}
                <SearchrRsult 
                value={searchText}
                currentFilter={currentFilter}
                data={this.state.data} />
            </div>
        );
    }
}

export default SearchAPI;