import React from 'react'

class DropdownInputGroup extends React.Component{
    render(){
        return (
            <div className="form-group">
                <h5>{this.props.title}</h5>
                <select className="form-control" value={this.props.field} onChange={this.props.changeHandle}>
                    {
                        this.props.data.map((value, index)=>{
                            return <option value={value} key={index}>{value}</option>
                        })
                    }
                </select>
            </div>
        )
    }
}

export default DropdownInputGroup