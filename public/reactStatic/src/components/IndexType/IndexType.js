import React from 'react'
import Index from "./Index/Index";
import Type from "./Type/Type";
import "./indexType.scss"
import TypeFilter from "./Type/TypeFilter";
import {connect} from "react-redux";
import {updateIndex,updateType,updateIndexArray,updateTypeArray} from '../../actions'

class IndexType extends React.Component {
    constructor(props) {
        super(props);
    }

    // http请求，获取Type
    fetchType(indexValue){
        fetch('http://localhost:3000/getType?index=' + indexValue)
            .then((response)=>{
                return response.json();
            }).then((res)=>{
            this.props.updateTypeArray(res);
            this.props.updateTypeValue(res[0])
        })
    }

    componentDidMount() {
        fetch('http://localhost:3000/getIndex')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.props.updateIndexArray(res);
                this.props.updateIndexValue(res[0]);
                return Promise.resolve("");
            })
            .then(()=>{
                this.fetchType(this.props.indexType.indexValue);
            })
    }

    changeIndex(e) {
        this.props.updateIndexValue(e.target.value);
        setTimeout(()=>{
            this.fetchType(this.props.indexType.indexValue);
        },0)
    }

    changeType(e) {
        this.props.updateTypeValue(e.target.value);
    }

    render() {
        let {indexValue,typeValue,indexArray,typeArray} = this.props.indexType;

        return (
            <div className="index-type-container">
                <Index value={indexValue} data={indexArray}
                       changeHandle={this.changeIndex.bind(this)}/>
                <Type value={typeValue} data={typeArray} changeHandle={this.changeType.bind(this)}/>
                <div className="type-filter-container">
                    <TypeFilter/>
                    <button>Add a filter +</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        indexType: state.indexType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateIndexValue: (indexValue) => {
            dispatch(updateIndex(indexValue))
        },
        updateTypeValue: (typeValue) => {
            dispatch(updateType(typeValue))
        },
        updateIndexArray: (indexArray) => {
            dispatch(updateIndexArray(indexArray))
        },
        updateTypeArray: (typeArray) => {
            dispatch(updateTypeArray(typeArray))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexType)