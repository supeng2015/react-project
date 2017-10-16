import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import NumIcon from 'react-icons/lib/fa/sort-numeric-asc';
import ReactLogo from '../images/tt002.png';
class App extends Component{
  render(){
    return(
      <div className="app-box">
        {/*头部*/}
        <section className="app-header">
          <div className="logo"><img src={ReactLogo}/></div>
          <div className="user-operation">
            <div>用户名</div> 
            <div>退出</div>
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
// <div className="app-index-box">

   //      <section> 
   //        <div className="index-icon-box"><NumIcon/></div>
   //        <div className="index-text-box">Metric</div>
   //      </section> 
   //      <section>
   //        <ul className="index-nav">
   //          <Link to="/kibana/subKibana"><li>index</li></Link>
   //          <Link to="/kibana/subKibana2"><li>index2</li></Link>
   //        </ul>
   //      </section>
   //    </div>