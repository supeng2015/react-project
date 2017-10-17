import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import NumIcon from 'react-icons/lib/fa/sort-numeric-asc';
import ReactLogo from '../images/react.png';
import Kibana from '../components/kibana/Kibana'; 
import Auth from './user/Auth';
class App extends Component{
  render(){
    let {history} = this.props; 
    return(
      <div className="app-index">
        {/*左边导航*/}
        <div className="app-index-left">
          <div className="user-operation">
            <div className="logo"><img src={ReactLogo}/></div>
            <div className="user-name">一清</div> 
            <div className="exit-button" onClick={()=>Auth.logout(function(h){history.push('/login');},history)}>退出</div>
          </div>
          <nav>
            <ul>
              <li>功能</li>
            </ul>
          </nav>
          <div className="function-list">
            <ul>
              <li>echarts</li>
              <li>getIpConfig</li>
              <li>upfile</li>
              <li>changeData</li>
              <li>about</li>
            </ul>
          </div>
        </div>
        {/*右边内容*/}
        <div className="app-index-right">
          <Kibana/>
        </div>      
      </div>
    );
  }
}
export default App