import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {modefyBucket} from '../../../actions';
class Range extends Component{
  constructor(){
    super(); 
  }
  addFromTo(){
    let {dispatch,buckets,Bindex} = this.props;
    if(!buckets[Bindex].aggregation.fromTo){
      buckets[Bindex].aggregation.fromTo = [];
    }
    buckets[Bindex].aggregation.fromTo = [...buckets[Bindex].aggregation.fromTo,{from:'',to:''}]
    dispatch(modefyBucket(buckets[Bindex],Bindex));
  }
  removeFromTo(i){
    let {dispatch,buckets,Bindex} = this.props;
    buckets[Bindex].aggregation.fromTo = buckets[Bindex].aggregation.fromTo.filter((item, index) => index !== i)
    dispatch(modefyBucket(buckets[Bindex],Bindex));
  }
  RangeModefyBucket(value,f,i){
    let {Bindex,dispatch,buckets} = this.props;
    //field
    if(typeof(i)=="undefined"){
      buckets[Bindex].aggregation[f] = value; 
    }else{
      buckets[Bindex].aggregation.fromTo[i][f] = value;   
    }
    dispatch(modefyBucket(buckets[Bindex],Bindex));   
  }
  render(){
    let {buckets,Bindex} = this.props
    let fromTo = buckets[Bindex].aggregation.fromTo ? buckets[Bindex].aggregation.fromTo:[];
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
          {fromTo.map((v,i)=>
            <div key={i} className="range-input-box">
              <div className="in"><input value={v.from}   onChange={(e)=>this.RangeModefyBucket(e.target.value,'from',i)}  type="number" /></div>
              <div className="in"><input value={v.to}  onChange={(e)=>this.RangeModefyBucket(e.target.value,'to',i)} type="number" /></div>
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
  const {buckets} = state
  return{
    buckets,
  }
}
Range = connect(mapStateToProps)(Range)
export default Range