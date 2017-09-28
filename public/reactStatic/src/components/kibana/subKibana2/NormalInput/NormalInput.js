import React from 'react'

class NormalInput extends React.Component{
    render(){
        return (
            <div className="form-group">
                <h5>{this.props.title}</h5>
                <input type="text" className="form-control" ref="customLabel"
                       onChange={this.props.changeHandle}/>
            </div>
        )
    }
}

export default NormalInput
