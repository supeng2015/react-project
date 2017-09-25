import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Kibana extends Component{
  render(){
    let {kibanaGetResult} = this.props
    return(
      <section>
        <ul className="index-nav">
          <li><Link to="/kibana/subKibana/test1">test</Link></li>
          <li><Link to="/kibana/subKibana2/">test2</Link></li>
        </ul>
        <div className="main-box">
          <div className="main-box-two">{this.props.children}</div>
          <div className="main-box-two">结果展示 : </div>
        </div> 
      </section>
    );
  }
}
const mapStateToProps = state => {
  return{
    //kibanaGetResult : state.kibanaGetResult  
  } 
}
Kibana = connect(mapStateToProps)(Kibana)

export default Kibana