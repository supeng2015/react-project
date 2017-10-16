import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import {fetchUserInfo} from '../../actions';
import { connect } from 'react-redux';
class Login extends Component{
  doLogin(){
    let {userName,userPass} = this.refs;  
    let {dispatch} = this.props;
    let user = {
      userName : userName.value,
      userPass : userPass.value 
    }
    dispatch(fetchUserInfo(user))
  }
  componentWillReceiveProps(nextProps){
    let {user,history} = nextProps;
    if(user.status){
      localStorage.userInfo = user.data;
      localStorage.isLogin = true;
      history.push('/app');
    }else{
      alert('登录失败或网络异常')  
    } 
  }
  render(){
    return(
      <div className="login-box">
        <h2 className="login-heading">react系统</h2>
        <div className="login-box-in">
          <div className="login-form-box">
            <div className="login-form login-input">
              <input ref="userName" type="text" placeholder="用户名"/>
            </div>
            <div className="login-form login-input">
              <input ref="userPass" type="password" placeholder="密码" />  
            </div>
            <div className="login-form login-btn">
              <button onClick={()=>this.doLogin()}>登录</button>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {user} = state
  return{
    user
  }
}
Login = connect(mapStateToProps)(Login)
export default Login