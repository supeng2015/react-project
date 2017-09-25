import React, {Component, PropTypes} from 'react';
import {addMetrics,removeMetrics,addBucket} from '../../../actions';
import { connect } from 'react-redux';
import FaCaretRight from "react-icons/lib/fa/caret-right";
import FaClose from "react-icons/lib/fa/close";
import Metrics from "./Metrics";
import Bucket from "./Bucket";
import { Link } from 'react-router';

class subKibana extends Component{
  addMetrics(){
    let {dispatch} = this.props;
    let m = {
      aggregation:{},
      customLabel :""  
    }
    dispatch(addMetrics(m))
  }
  addBucket(){
    let {dispatch} = this.props;
    let b = {
      aggregation:{},
      customLabel :""     
    }
    dispatch(addBucket(b)) 
  }
  render(){
    let {params,metrics,buckets} = this.props
    return(
      <div>
        <section className="pb10">
          <h3 className="borad-heading borad-pad">{params.textId}</h3>
          <div className="borad-control-bar">
            <nav className="borad-pad">
            	<ul>
                <li>Data</li>
                <li>Options</li>
            	</ul>
            </nav>
            <button className="go" onClick={(e)=>{this.sentFormData()}}><FaCaretRight/></button>
            <button className="stop"  onClick={(e)=>{this.deleteFormType()}}><FaClose/></button> 	
          </div>
        </section>
        
        <section className="pb10">
          <ul>
            {metrics.map((v,i)=><li key={i}><Metrics Mindex={i}/></li>)}
          </ul>
          <div>
            <button onClick={()=>this.addMetrics()} className="my-btn">add metrics</button>
          </div>
        </section>
        
        <section className="pb10">
          <ul>
            {buckets.map((v,i)=><li key={i}><Bucket Bindex={i}/></li>)}
          </ul>
          <div>
            <button onClick={()=>this.addBucket()} className="my-btn">add bucket </button>
          </div>
        </section>
      </div> 
    );
  }
}
const mapStateToProps = state => {
  const {metrics,buckets} = state
  return{
    metrics,
    buckets
  } 
}
subKibana = connect(mapStateToProps)(subKibana)
export default subKibana