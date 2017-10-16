import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import NumIcon from 'react-icons/lib/fa/sort-numeric-asc';
import ReactLogo from '../images/tt002.png';
import Auth from './user/Auth';
class App extends Component{
  render(){
    let {history} = this.props; 
    return(
      <div className="app-box">
        {/*头部*/}
        <section className="app-header">
          <div className="logo"><img src={ReactLogo}/></div>
          <div className="user-operation">
            <div>用户名</div> 
            <button onClick={()=>Auth.logout(function(h){
              history.push('/login');
            },history)}>退出</button>
          </div>
        </section>
        {/*主体*/}
        <section>
          {/*左边导航*/}
          <div>left</div>
          {/*右边内容*/}
          <div>right</div>      
        </section>
      </div>
    );
  }
}
export default App