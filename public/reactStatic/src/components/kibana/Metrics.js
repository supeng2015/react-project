import React, {Component, PropTypes} from 'react';
import {modefyMetrics,removeMetrics} from '../../actions';
import { connect } from 'react-redux';
import TopHit from './TopHit';
class Metric extends Component{
  constructor(){
  	super();
    this.state = {
      name : 'count', 	
      field : ''
    }
  }
  changeMetricType(value){
  	let {dispatch,Mindex,metrics} = this.props;
  	metrics[Mindex].aggregation.name = value;
  	metrics[Mindex].aggregation.field = "";
    this.setState({name : value})
    //dispatch(modefyMetrics(metrics[Mindex],Mindex))
  }
  changeMetricSubType(value){
  	let {dispatch,Mindex,metrics} = this.props;
  	metrics[Mindex].aggregation.field = value;
    this.setState({field : value})
    dispatch(modefyMetrics(metrics[Mindex],Mindex))
  }
  changeCustomLabel(value){
    let {dispatch,Mindex,metrics} = this.props;
    metrics[Mindex].customLabel = value;
    dispatch(modefyMetrics(metrics[Mindex],Mindex))  
  }
  removeMetrics(i){
    let {dispatch} = this.props
    dispatch(removeMetrics(i))    
  }
  render(){
  	//metric 的结构
    let metricConstructor={
  		aggregation : [
  		{name:'count',field:[]},
  		{name:'average',field:['age']},
  		{name:'sum',field:['age']},
  		{name:'median',field:["age"]},
  		{name:"min",field:["date","age"]},
  		{name:"max",field:["date","age"]},
  		{name:"uniqueCount",field:["date","age","_index"]},
  		{name:"topHit",field:["_score","date","_source"],aggreateWith:["Concatenate","max","min","sum"],size:"1",sortOn:["date","age","_index"],order:["asc","desc"]} 
  		],
  		customLabel : ""
  	} 
    let {metrics,Mindex} = this.props;
    return(
      <div className="metric">
        <section>
        	<h2>Aggregation</h2>
        	<select onChange={(e)=>this.changeMetricType(e.target.value)}>
        	  {metricConstructor.aggregation.map((v)=><option key={v.name}>{v.name}</option>)}
        	</select>
        	{metricConstructor.aggregation.map((v)=>{
            if(v.name==this.state.name&&v.field.length){
              return (
                <div>
                  <h2>field</h2>
              	  <select onChange={(e)=>this.changeMetricSubType(e.target.value)}  key={v.name}>
              	    <option></option>
                    {v.field.map((subV)=><option key={subV}>{subV}</option>)}
                  </select>
                </div>  
              )
            }
        	})}
          <div style={{display:this.state.name=="topHit"&&this.state.field?"block":"none"}}>
            <TopHit Mindex={Mindex} field={this.state.field} />
          </div>
        </section>
        <section>
          <h2>Custom Label</h2>
          <input type="text" onChange={(e)=>this.changeCustomLabel(e.target.value)}/>
        </section>
        <button className="my-btn" onClick={()=>this.removeMetrics(Mindex)}>删除</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {metrics} = state
  return{
    metrics
  }
}
Metric = connect(mapStateToProps)(Metric)

export default Metric