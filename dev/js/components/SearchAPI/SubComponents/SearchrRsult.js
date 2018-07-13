
import React from 'react';
import Data from '../../../data/data';

class SearchrRsult extends React.Component {

    render() {
        const { props } = this;
        const {value, currentFilter, data = []} = props;
        {/* Data Filter */}
        const getParsedData = (data) => {
            return data.filter(item => {
                if ((!value || value === '')) {
                    return true;
                } else {
                    if (currentFilter) {
                        const itemValue = item[currentFilter];
                        const lowerValue = value.toLowerCase();
                        if (itemValue && itemValue.toLowerCase().indexOf(lowerValue) !== -1) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } 
            }).map((items, index) => (<tr key={index}>                            
                            <th className="">{items.list_no}</th>
                            <th className="">{items.exam_no}</th>
                            <th className="">{items.first_name} </th>
                            <th className="">{items.last_name}</th>                            
                            <th className="">{items.list_agency_desc}</th>
                            <th className="">{items.list_title_desc}</th>
                            <th className="">{items.published_date}</th>
                        </tr>));
        };
        return (
           <div className="table-responsive">
            <table id="myTable" className="table table-bordered table-striped search-rsult">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">List No</th>
                        <th scope="col">Exam No</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">List Agency </th>
                        <th scope="col">List Title</th>
                        <th scope="col">Published Date</th>                        
                    </tr>
                </thead>
                <tbody>
                    {getParsedData(data)}                   
                </tbody>
            </table>
            </div>

        );
    }
}

export default SearchrRsult;