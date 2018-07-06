import React from 'react';
import SearchAPI from '../components/SearchAPI/SearchAPI';

require('../../scss/style.scss');

const App = () => (
    <div className="container">
        <div className="row">           
            <SearchAPI />            
        </div>
    </div>
);

export default App;
