import React from 'react';
import SearchAPI from '../components/SearchAPI/SearchAPI';

require('../../scss/style.scss');

const App = () => (
    <div className="row">
        <div className="col-lg-8 col-sm-12 mx-auto">
            <SearchAPI/>
        </div>
    </div>
);

export default App;
