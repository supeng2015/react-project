import React, {Component, PropTypes} from 'react';
import {modefyMetrics} from '../../../actions';
import { connect } from 'react-redux';

class TopHit extends Component{
  onChangeProperty(value,p){
    let {dispatch,Mindex,metrics} = this.props;
    if(!metrics[Mindex].topHit){
      metrics[Mindex].topHit = {};  	
    }
    metrics[Mindex].topHit[p] = value;
    dispatch(modefyMetrics(metrics[Mindex],Mindex)) 
  }  
  render(){
  	let {field} = this.props;
    let TopHitConstructor = {
      aggregateWith : field!="_score"?['Concatenate']:['Concatenate','Min','Max','Sum'],
      size : 1,
      sortOn : ['postDate','age','num','_index','_type','info.keyword','user.keyword'],
      order : ['Descending','Asecending']
    }
    return(
      <div>
        <h3>Aggregate With</h3>
        <select onChange={(e)=>this.onChangeProperty(e.target.value,'aggregateWith')}>
          {TopHitConstructor.aggregateWith.map((v,i)=><option key={v}>{v}</option>)}
        </select>
        <h3>Size</h3>
        <input type="number" onChange={(e)=>this.onChangeProperty(e.target.value,'aggregateWith')} />
        <h3>Sort On</h3>
        <select onChange={(e)=>this.onChangeProperty(e.target.value,'sortOn')}>
          {TopHitConstructor.sortOn.map((v,i)=><option key={v}>{v}</option>)}
        </select>
        <h3>Order</h3>
        <select onChange={(e)=>this.onChangeProperty(e.target.value,'order')}>
          {TopHitConstructor.order.map((v,i)=><option key={v}>{v}</option>)}
        </select>
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
TopHit = connect(mapStateToProps)(TopHit)
export default TopHit