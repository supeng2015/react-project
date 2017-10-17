import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchPosts} from '../../actions';

import SubKibana from './subKibana/SubKibana';
import SubKibana2 from './subKibana2/SubKibana2';
import Histogram from "./charts/Histogram/Histogram";
import LineChart from "./charts/LineChart/LineChart";
import PieChart from "./charts/PieChart/PieChart";
import AreaChart from "./charts/AreaChart/AreaChart";


class Kibana extends Component{
  componentDidMount() {    //组件装配前
    const { dispatch} = this.props;
    //dispatch(getpiaoGet('asd'))
    dispatch(fetchPosts('kibana'))
  }
  render(){
    let {postsByKibanaResult,match} = this.props;
    let result = [];
    if(postsByKibanaResult.kibana){
      result = postsByKibanaResult.kibana.items   
    }
    return(
      <section>
        
        <div className="main-box">
          <div className="main-box-two">
            <SubKibana2/>
          </div>
          <div className="main-box-two">
            <Histogram type="xAxis"/>
            <Histogram type="yAxis"/>
            <LineChart/>
            <AreaChart/>
            <PieChart/>
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
};
Kibana = connect(mapStateToProps)(Kibana);

export default Kibana