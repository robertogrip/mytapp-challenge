import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

//import Redux and Provider
import { Provider } from 'react-redux';
import { Store } from './store';

//import application styles
import './assets/css/styles.css';
import './assets/css/bootstrap.css';

ReactDOM.render(
    <Provider store={Store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
