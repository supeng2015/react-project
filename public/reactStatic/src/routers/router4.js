import React from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import App from '../components/App';
import Login from '../components/user/Login'; 
import ResultKibana from '../components/kibana/Kibana'; 
const RouteConfig = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/kibana" component={ResultKibana}/>
      <Route path="/app" component={App}/>

    </div>
  </Router>
)
export default RouteConfig
  