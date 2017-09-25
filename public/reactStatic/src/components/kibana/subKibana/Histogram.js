import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
class Histogram extends Component{

  render(){
    return(
      <div>
        <section>
          <h3>field</h3>
          <select>
          	<option>age</option>
          	<option>num</option>
          </select>
        </section>
        
        <section>
          <h3>interval</h3>
          <input type="number"/> 
        </section>
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
Histogram = connect(mapStateToProps)(Histogram)
export default Histogram