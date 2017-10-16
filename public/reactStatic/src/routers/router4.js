import React from 'react'
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';
import App from '../components/App';
import Login from '../components/user/Login'; 
import Kibana from '../components/kibana/Kibana'; 

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const RouteConfig = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/kibana" component={Kibana}/>
        <PrivateRoute path="/app" component={App}/> 
        <Redirect from='*' to='/app'  /> 
      </Switch>   
    </div>
  </Router>
)
export default RouteConfig
  