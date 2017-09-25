import React, {Component, PropTypes} from 'react';

class App extends Component{
  render(){
    return(
      <div>
        这里是app
        {this.props.children}
      </div>
    );
  }
}

export default App