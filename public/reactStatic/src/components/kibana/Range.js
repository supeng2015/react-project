import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {modefyBucket,BucketAddFromTo} from '../../actions';
class Range extends Component{
  constructor(){
    super();
    // this.state = {
    //   fromTo : []  
    // }  
  }
  addFromTo(){
    let {dispatch,buckets,Bindex,rangeFromTo} = this.props;
    dispatch(BucketAddFromTo({from:"",to:""},buckets,rangeFromTo))
    // dispatch(addFromTo({from:"",to:""}));
    // buckets[Bindex].fromTo = [...rangeFromTo];
    // dispatch(modefyBucket(buckets[Bindex],Bindex));
  }
  removeFromTo(i){
    let {dispatch,buckets,Bindex,rangeFromTo} = this.props;
    // dispatch(removeFromTo(i));
    // buckets[Bindex].fromTo = [...rangeFromTo];
    // dispatch(modefyBucket(buckets[Bindex],Bindex));
  }
  RangeModefyBucket(value,f,i){
    let {Bindex,dispatch,buckets,rangeFromTo} = this.props;

    //field
    if(typeof(i)=="undefined"){
      buckets[Bindex].aggregation[f] = value; 
    }else{
      rangeFromTo[i][f] = value; 
      buckets[Bindex].fromTo = [...rangeFromTo];  
    }
    dispatch(modefyBucket(buckets[Bindex],Bindex));   
  }
  render(){
    let {rangeFromTo} = this.props
    //console.log(rangeFromTo)
    return(
      <div>
        <section>
          <h3>field</h3>
          <select onChange={(e)=>this.RangeModefyBucket(e.target.value,'field')}>
            <option>age</option>
            <option>num</option>
          </select>
        </section>

        <section className="range-box">
          <h3>from-to</h3>
          {rangeFromTo.map((v,i)=>
            <div key={i} className="range-input-box">
              <div className="in"><input  onChange={(e)=>this.RangeModefyBucket(e.target.value,'from',i)}  type="number" /></div>
              <div className="in"><input  onChange={(e)=>this.RangeModefyBucket(e.target.value,'to',i)} type="number" /></div>
              <button onClick={()=>this.removeFromTo(i)}  className="my-btn">删除</button>
            </div>
          )}
          
          <button onClick={()=>this.addFromTo()} className="my-btn">添加排序</button>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {rangeFromTo,buckets} = state
  return{
    buckets,
    rangeFromTo
  }
}
Range = connect(mapStateToProps)(Range)
export default Range