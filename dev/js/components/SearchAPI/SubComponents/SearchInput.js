

import React from 'react';

class SearchInput extends React.Component {

    render() {
        const { props } = this;
        return (
            <div className="search-input-compoent">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="input-group">
                        <div className="form-group">                            
                            <select className="form-control" id="exampleSelect1" onChange={props.onChangeHandle}>
                                <option value=''>Filter by</option>
                                <option value='first_name'>First Name</option>
                                <option value='last_name'>Last Name</option>                                
                            </select>
                        </div>
                        <input id="myInput" value={props.value} type="text" className="form-control" name="x" placeholder="Search term..." onChange={props.handleInputChange} />
                        <span className="input-group-prepend">
                            <button className="btn btn-outline-secondary" onClick={props.handleClick} type="button"><i className="fas fa-search"></i></button>
                        </span>
                    </div>
                </div>
            </div>

        );
    }
}

export default SearchInput;