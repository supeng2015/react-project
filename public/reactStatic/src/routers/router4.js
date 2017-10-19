import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import App from '../components/App';
import Login from '../components/user/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.isLogin!='false' ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const RouteConfig = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        {/*<Route path="/kibana" component={Kibana}/>*/}
        <PrivateRoute path="/app" component={App}/>
        <Redirect from='*' to='/app'/>
      </Switch>
    </div>
  </Router>
)
export default RouteConfig
  