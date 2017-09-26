import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
class App extends Component{
  render(){
    return(
      <div>
        <ul className="index-nav">
          <Link to="/kibana/subKibana/test1"><li>test</li></Link>
          <Link to="/kibana/subKibana2/"><li>test2</li></Link>
        </ul>
       
        {this.props.children}
      </div>
    );
  }
}

export default App