import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import NumIcon from 'react-icons/lib/fa/sort-numeric-asc';



class App extends Component{
  render(){
    return(
      <div className="app-index-box">
        <section> 
          <div className="index-icon-box"><NumIcon/></div>
          <div className="index-text-box">Metric</div>
        </section> 
        <section>
          <ul className="index-nav">
            <Link to="/kibana/subKibana/test1"><li>index</li></Link>
            <Link to="/kibana/subKibana2/"><li>index2</li></Link>
          </ul>
        </section>
        {this.props.children}
      </div>
    );
  }
}
export default App