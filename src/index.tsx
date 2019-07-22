import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import all from './reducers/rootReducer';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

const promiseMiddleware = require('redux-promise').default;

const store = createStore(
    all,
    applyMiddleware(promiseMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
