import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Kibana extends Component{
  render(){
    let {kibanaGetResult} = this.props
    return(
      <section>
        
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