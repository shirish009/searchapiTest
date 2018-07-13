import React from 'react';

class SearchInput extends React.Component {

    render() {
        const { props } = this;
        const { firstName, lastName } = props;
        return (
            <div className="search-input-compoent">
                <div className="mx-auto my-0">
                    <form className="form-inline">
                        {/* First Name Input*/}
                        <div className="col-5">
                            <input id="first_name" value={props.firstName} type="text" className="form-control" name="x" placeholder="First Name..." onChange={(e) => props.handleInputChange(e, 'firstName')} />
                        </div>
                        {/* Last Name Input*/}
                        <div className="col-5">
                            <input id="last_name" value={props.lastName} type="text" className="form-control" name="x" placeholder="Last Name..." onChange={(e) => props.handleInputChange(e, 'lastName')} />
                        </div>
                        {/* Search Button */}
                        <div className="col-2">
                            <button className="btn btn-outline-secondary" onClick={props.handleClick} type="button">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchInput;