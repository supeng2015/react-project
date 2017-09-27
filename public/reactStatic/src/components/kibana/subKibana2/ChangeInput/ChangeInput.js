import React from 'react'

class ChangeInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <h5>{this.props.title}</h5>
                <select className="form-control" onChange={this.props.changeHandle}>
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

export default ChangeInput