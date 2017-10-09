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
                <select className='form-control'>
                    {this.props.datas.field.map((data,index)=>{
                        return <option key={index} value={data}>{data}</option>
                    })}

                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

};
const mapDispatchToProps = () => {

};
export default connect()(MetricsField)