import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/fullcalendar/dist/fullcalendar.min.js';
import { createStore ,combineReducers } from 'redux';
import  UIreducer from './store/reducers/reducer';
import  Tinyreducer from './store/reducers/TinychartReducer';
import  appreducers from './store/reducers/appreducers';
import  reportreducers from './store/reducers/reportreducers';
import  salesReducers from './store/reducers/salesReducers';
import  warehouseReducer from './store/reducers/warehouseReducer';
import { Provider } from 'react-redux';
import Config from './config/Config';

const rootReducer = combineReducers({
    ui_red:UIreducer,
    tiny_red:Tinyreducer,
    appreducers:appreducers,
    reportreducers : reportreducers,
    salesReducers : salesReducers,
    warehouseReducer: warehouseReducer
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <BrowserRouter basename={Config.isProduction ? '/' : ''}>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
