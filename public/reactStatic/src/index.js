import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {Provider} from 'react-redux';
import reducers from './reducers';
import routers from './routers';
import kibana from './css/kibana.css';
import base from './css/base.css';
import metric from './css/metric.scss';
//import configs from './configs/config.js'
const middleware = [ thunk ]
//如果是开发环境打印日志
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)
ReactDOM.render(
	<Provider store={store}>
    {routers}   
  </Provider>, 
  document.getElementById('root')
);
