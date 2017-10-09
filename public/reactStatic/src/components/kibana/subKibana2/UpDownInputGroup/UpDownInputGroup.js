import React from 'react'

class UpDownInputGroup extends React.Component{
    render(){
        return (
            <div className="form-group">
                <h5>{this.props.title}</h5>
                <input type="number" className="form-control" min="0" value={this.props.value}
                       onChange={this.props.changeHandle}/>
            </div>
        )
    }
}

export default UpDownInputGroup