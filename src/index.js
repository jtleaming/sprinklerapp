import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Router';
    
ReactDOM.render(<Router>
    {Routes}
</Router>, document.getElementById('root'));
registerServiceWorker();
