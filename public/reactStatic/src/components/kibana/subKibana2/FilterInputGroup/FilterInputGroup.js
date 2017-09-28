import React from 'react'
import {connect} from 'react-redux'
import {modifyBucket2} from "../../../../actions/index";
import FilterInput from './FilterInput'

class FilterInputGroup extends React.Component {
    changeValueHandle(filterIndex, e){
        const {index} = this.props;
        const newFilter = this.props.buckets[index].filter.map((item, index)=>{
            if(index === filterIndex){
                return {...item, value: e.target.value}
            }else{
                return item;
            }
        });
        this.props.modifyBucket(index, 'filter', newFilter)
    }

    changeNameHandle(filterIndex, newName){
        const {index} = this.props;
        const newFilter = this.props.buckets[index].filter.map((item, index)=>{
            if(index === filterIndex){
                return {...item, name: newName}
            }else{
                return item;
            }
        });
        this.props.modifyBucket(index, 'filter', newFilter)
    }

    addHandle(){
        const {index} = this.props;
        const oldFilter = this.props.buckets[index].filter;
        this.props.modifyBucket(index, 'filter', [...oldFilter, {name:"filter", value: ""}]);
    }

    removeHandle(filterIndex){
        const {index} = this.props;
        const newFilter = this.props.buckets[index].filter.filter((item, index)=>{
            return index !== filterIndex
        });
        this.props.modifyBucket(index, 'filter', newFilter)
    }

    render() {
        const {index} = this.props;
        const data = this.props.buckets[index].filter;
        return (
            <div>
                {
                    data.map((item, index)=>{
                        return <FilterInput key={index} data={item} index={index}
                                            changeValueHandle={this.changeValueHandle.bind(this, index)}
                                            changeNameHandle={(newName)=>(this.changeNameHandle.bind(this)(index, newName))}
                                            removeHandle={(index)=>{return this.removeHandle.bind(this, index)}}/>
                    })
                }
                <button onClick={this.addHandle.bind(this)}>Add Filter</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        buckets: state.buckets2
    }
}

function mapDispatchToProps(dispatch){
    return {
        modifyBucket: (index, key, value)=>{
            dispatch(modifyBucket2(index, key, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterInputGroup)