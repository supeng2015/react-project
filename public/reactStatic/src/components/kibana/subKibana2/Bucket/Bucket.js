import React from 'react'
import DownInputGroup from '../DownInputGroup/DownInputGroup'
import ChangeInput from '../ChangeInput/ChangeInput'
import UpDownInputGroup from '../UpDownInputGroup/UpDownInputGroup'
import NormalInput from '../NormalInput/NormalInput'
import {connect} from 'react-redux'
import {changeBucketType} from '../../../../actions'
import {modifyBucket2} from "../../../../actions/index";
import FromToInput from "../FromToInput/FromToInput";
import bucketData from '../bucketData'
import OrderGroup from "../OrderGroup/OrderGroup";
import FilterInput from "../FilterInput/FilterInput";

class Bucket extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nowType: "Data Histogram"
        }
    }

    changeType(e){
        let bucketType = e.target.value;
        console.log(bucketType);
        this.setState({
           nowType: bucketType
        });
        // 改变初始化结构
        this.props.changeBucketType(this.props.index,bucketData[bucketType]);
    }

    debounceChange(){
        let flag = null;
        let {index} = this.props;
        return function(name, e){
            e.persist();
            clearTimeout(flag);
            flag = setTimeout(()=>{
                this.props.modifyBucket(index, name, e.target.value)
            },500)
        }
    }

    render(){
        let {index, types} = this.props;
        let nowType = this.state.nowType;
        const content = this.props.content[nowType];

        return (
            <div>
                <div className="sidebar-item-title">bucket</div>
                <ChangeInput title="Aggregation" data={types} changeHandle={this.changeType.bind(this)}/>
                {
                    content.field
                    ? <DownInputGroup title="Field" data={content.field}
                                      changeHandle={(e)=>{this.props.modifyBucket(index, 'field', e.target.value)}}/> : ""
                }
                {
                    content.interval
                    ? (typeof(content.interval) === "object"
                        ?  <DownInputGroup title="Interval" data={content.interval}
                                           changeHandle={(e)=>{this.props.modifyBucket(index, 'interval', e.target.value)}}/>
                        :  <UpDownInputGroup title="Interval" data={content.interval}
                                             changeHandle={(e)=>{this.props.modifyBucket(index, 'interval', e.target.value)}}/>)
                    : ""
                }
                {
                    content.showEmpty
                    ? <label>
                            <input type="checkbox" name="showEmpty"
                                   onChange={(e)=>{this.props.modifyBucket(index, 'showEmpty', e.target.checked)}}/>
                            Show empty buckets
                        </label>
                    : ""
                }
                {
                    content.fromTo
                        ? <FromToInput index={index} name="fromTo"/>
                        : ""
                }
                {
                    content.orderBy
                        ? <OrderGroup index={index} data={content}
                                      changeHandle={this.props.modifyBucket}/>: ""
                }
                {
                    content.label
                    ? <NormalInput title="Filter" data={''}
                                   changeHandle={this.debounceChange().bind(this, 'label')}/>
                    : <FilterInput index={index} data={content.filter} changeHandle={()=>{console.log(111)}} />
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(dispatch){
    return {
        changeBucketType: (index, bucketDate)=>{
            dispatch(changeBucketType(index, bucketDate))
        },
        modifyBucket:(index, key, value) =>{
            dispatch(modifyBucket2(index, key, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bucket)