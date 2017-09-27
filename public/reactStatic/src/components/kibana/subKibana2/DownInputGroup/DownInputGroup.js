import React from 'react'
import {connect} from 'react-redux'
import {modifyBucket2} from '../../../../actions'

class DropdownInputGroup extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {index, name} = this.props;
        return (
            <div className="form-group">
                <h5>{this.props.title}</h5>
                <select className="form-control" onChange={(e)=> this.props.modifyBucket(index,name,e.target.value)}>
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

function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(dispatch){
    return {
        modifyBucket:(index, key, value)=>{
            dispatch(modifyBucket2(index, key, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownInputGroup)