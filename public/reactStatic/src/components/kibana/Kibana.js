import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {fetchPosts} from '../../actions';
import Charts from "./charts/Charts";

class Kibana extends Component{
  componentDidMount() {    //组件装配前
 
    const { dispatch} = this.props
    //dispatch(getpiaoGet('asd'))
    dispatch(fetchPosts('kibana'))
  }
  render(){
    let {postsByKibanaResult} = this.props
    let result = []
    if(postsByKibanaResult.kibana){
      result = postsByKibanaResult.kibana.items   
    }
    return(
      <section>
        <div className="main-box">
          <div className="main-box-two">{this.props.children}</div>
          <div className="main-box-two">
            <Charts />
            <ul className="kibana-result-box">
              {result.map((v,i)=>
                <li key={i}>
                  <div>count</div>
                  <h1>{v._shards.total}</h1>
                </li>
              )}
            </ul>
          </div>
        </div> 
      </section>
    );
  }
}
const mapStateToProps = state => {
  return{
    postsByKibanaResult : state.postsByKibanaResult  
  } 
}
Kibana = connect(mapStateToProps)(Kibana)

export default Kibana