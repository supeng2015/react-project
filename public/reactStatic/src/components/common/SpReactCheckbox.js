import React, {Component, PropTypes} from 'react';

class SpReactCheakbox extends Component{
  constructor(props){
    super();
    let styleMap = props.options.map(()=>false)
    this.state = {
      styleMap : styleMap
    }	
  }
  changeStyle(i){
  	let styleMap = this.state.styleMap
  	styleMap[i] = !styleMap[i]
  	this.setState ({
      styleMap : styleMap
    })
  }
  render(){
  	let {passObj,options,fun,passProperty} = this.props	

    return (
    	<div>
    	<ul>
    	{options.map((v,i)=><li className={this.state.styleMap[i]?'sp-checkbox':''} onClick={(e)=>{
    		this.changeStyle(i);
        fun(passObj,v,passProperty);
      }}  key={v}>{v}</li>)}
    	</ul>
    	</div>
    )
  }  	
}
export default SpReactCheakbox