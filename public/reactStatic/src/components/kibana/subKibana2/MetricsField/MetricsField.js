import React, {Component} from 'react';
import {connect} from 'react-redux'

class MetricsField extends Component {

    constructor() {
        super()
    }
    render() {
        return (
            <div className='form-group'>
                <h5>{this.props.name}</h5>
                <select className='form-control' onChange={this.props.changeHandle}>
                    {this.props.constructor.field.map((data,index)=>{
                        return <option key={index} value={data}>{data}</option>
                    })}
                </select>
            </div>
        )
    }
}

export default connect()(MetricsField)