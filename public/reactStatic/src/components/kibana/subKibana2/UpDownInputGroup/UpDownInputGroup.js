import React from 'react'
import {connect} from 'react-redux'
import {modifyBucket2} from '../../../../actions'

class UpDownInputGroup extends React.Component{
    constructor(props) {
        super(props)
    }

    render(){
        const {index,name} = this.props;
        return (
            <div className="form-group">
                <h5>{this.props.title}</h5>
                <input type="number" className="form-control" min="0"
                       onChange={(e)=>{this.props.modifyBucket(index, name, e.target.value)}}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{}
}

function mapDispatchToProps(dispatch) {
    return {
        modifyBucket: (index, key, value)=>{
            dispatch(modifyBucket2(index, key, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpDownInputGroup)