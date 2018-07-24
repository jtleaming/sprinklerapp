import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Router';

ReactDOM.render(<Router>{Routes}</Router>, document.getElementById('root'));
registerServiceWorker();
