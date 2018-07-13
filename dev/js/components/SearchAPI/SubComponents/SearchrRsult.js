
import React from 'react';
import Data from '../../../data/data';

class SearchrRsult extends React.Component {

    render() {
        const { props } = this;
        const { data = []} = props;
        {/* Data Filter */}
        const getParsedData = (data) => {
            return data.map((items, index) => (<tr key={index}>                            
                            <td>{items.list_no}</td>
                            <td>{items.exam_no}</td>
                            <td>{items.first_name} </td>
                            <td>{items.last_name}</td>                            
                            <td>{items.list_agency_desc}</td>
                            <td>{items.list_title_desc}</td>
                            <td>{items.published_date}</td>
                        </tr>));
        };
        return (
           <div className="table-responsive">
            <table id="myTable" className="table table-bordered table-striped search-result">
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