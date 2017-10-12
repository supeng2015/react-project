import React, {Component} from 'react';
import {connect} from 'react-redux'

class MetricsField extends Component {

    constructor() {
        super()
    }

    render() {
        //console.log('&&&&&&&'+JSON.stringify(this.props.content[this.props.index].field));
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

const mapStateToProps = (state) => {

};
const mapDispatchToProps = () => {

};
export default connect()(MetricsField)