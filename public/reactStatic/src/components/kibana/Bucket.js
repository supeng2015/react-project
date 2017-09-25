import React, {Component, PropTypes} from 'react';
import {removeBucket} from '../../actions';
import DateHistogram from "./DateHistogram";
import Histogram from "./Histogram";
import Range from "./Range";
import { connect } from 'react-redux';
class Bucket extends Component{
	constructor(){
    super();
    this.state = {
      name : ''
    }
	}
	changeBucketName(v){
    this.setState({name : v})
	}
	removeBucket(i){
    let {dispatch} = this.props
    dispatch(removeBucket(i))    
  }
  render(){
  	let {Bindex} = this.props;
  	let bucketConstructor={
  		Aggregation : [
  		{name:'DateHistogram',field:[]},
  		{name:'Histogram',field:['age']},
  		{name:'Range',field:['age']},
  		{name:'DateRange',field:["age"]},
  		{name:"IPv4Range",field:["date","age"]},
  		{name:"Terms",field:["date","age"]},
  		{name:"Filters",field:["date","age","_index"]},
  		{name:"SignificantTerms",field:["_score","date","_source"],aggreateWith:["Concatenate","max","min","sum"],size:"1",sortOn:["date","age","_index"],order:["asc","desc"]} 
  		],
  		customLabel : ""
  	}
  	let bucketSubComponent = (<div></div>); 
  	switch(this.state.name){
      case 'DateHistogram' : 
        bucketSubComponent = <DateHistogram Bindex={Bindex}/>;
        break;
  	  case 'Histogram' : 
        bucketSubComponent = <Histogram Bindex={Bindex}/>;
        break;
      case 'Range' : 
        bucketSubComponent = <Range Bindex={Bindex}/>;
        break;
      case 'DateRange' : 
        bucketSubComponent = <DateRange Bindex={Bindex}/>;
        break;
      case 'IPv4Range' : 
        bucketSubComponent = <IPv4Range Bindex={Bindex}/>;
        break;
      case 'Terms' : 
        bucketSubComponent = <Terms Bindex={Bindex}/>;
        break;
      case 'Filters' : 
        bucketSubComponent = <Filters Bindex={Bindex}/>;
  	    break;
  	  case 'SignificantTerms' : 
        bucketSubComponent = <SignificantTerms Bindex={Bindex}/>;
  	    break;
  	  default :
  	    bucketSubComponent = (<div></div>);
  	}
    return(
      <div className="metric buckets">
        <section>
          <h2>bucket</h2>
          <select onChange={(e)=>this.changeBucketName(e.target.value)}>
            {bucketConstructor.Aggregation.map((v,i)=><option key={v.name}>{v.name}</option>)}
          </select>
          {bucketSubComponent}
        </section>
        
        <section>
          <h2>Custom Label</h2>
          <input type="text" onChange={(e)=>this.changeCustomLabel(e.target.value)}/>
        </section>
        <button className="my-btn" onClick={()=>this.removeBucket(Bindex)}>删除</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {buckets} = state
  return{
    buckets
  }
}
Bucket = connect(mapStateToProps)(Bucket)
export default Bucket

