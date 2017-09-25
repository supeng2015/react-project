import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from '../components/App'; 
import Kibana from '../components/kibana/Kibana'; 
import SubKibana from '../components/kibana/SubKibana';
//const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const history =  hashHistory;
class Roots extends Component{
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}
// const App3 = (location, cb) => {
//   require.ensure([], require => {
//     cb(null, require('../components/App3').default)
//   },'App3')
// }
const RouteConfig = (
  <Router history={history}>
    <Route path="/" component={Roots}>
      <IndexRoute component={Kibana} />
      <Route path="app" component={App}/>
      <Route path="kibana" component={Kibana}>
        <Route path="subKibana/:textId" component={SubKibana}/>    
      </Route>
      <Redirect from='*' to='/'  />//预设路由，全部户转到/下
    </Route>
  </Router>
);
export default RouteConfig;