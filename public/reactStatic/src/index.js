import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import reducers from './reducers';
//import routers from './routers/index';
import R4 from './routers/router4';
import './css/base.css';
import './css/user.scss';
import './css/common.scss';
import './css/subKibana.scss';
import './css/subKibana2.scss';
import './configs/environment.js'
//import configs from './configs/config.js'
const middleware = [ thunk ];
//如果是开发环境打印日志
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);
ReactDOM.render(
	<Provider store={store}>
    <R4/>
  </Provider>, 
  document.getElementById('root')
);
