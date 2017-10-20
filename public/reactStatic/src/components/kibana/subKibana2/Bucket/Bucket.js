import React from 'react'
import DownInputGroup from '../DownInputGroup/DownInputGroup'
import ChangeInput from '../ChangeInput/ChangeInput'
import UpDownInputGroup from '../UpDownInputGroup/UpDownInputGroup'
import NormalInput from '../NormalInput/NormalInput'
import {connect} from 'react-redux'
import {changeBucketType} from '../../../../actions'
import {modifyBucket2} from "../../../../actions/index";
import FromToInputNum from "../FromToInput/FromToInputNum";
import bucketData from '../bucketData'
import OrderGroup from "../OrderGroup/OrderGroup";
import FilterInputGroup from "../FilterInputGroup/FilterInputGroup";
import FromToInput from "../FromToInput/FromToInput";
import FromToInputNumChange from "../FromToInput/FromToInputNumChange";

class Bucket extends React.Component{
    constructor(props){
        super(props);
    }

    changeType(e){
        let bucketType = e.target.value;
        console.log(bucketType);
        // 改变初始化结构
        this.props.changeBucketType(this.props.index,bucketData(bucketType));
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

    change(name, e){
        let {index} = this.props;
        this.props.modifyBucket(index, name, e.target.value)
    }

    filterField(content){
        let type = content.fieldType;
        let field = content.field;
        console.log(field);
        let result = ["--" + content.fieldType + "--"];
        for(let key in field){
            if(field.hasOwnProperty(key)){
                switch (type){
                    case "number":
                        if(field[key] === "long" || field[key] === "int"){
                            result.push(key);
                        }
                        break;
                    default:
                        if(field[key] === type){
                            result.push(key);
                        }
                }
            }
        }
        return result;
    }

    render(){
        let {index, types} = this.props;
        let bucket = this.props.buckets2[index];
        let nowType = bucket.type;
        const content = this.props.content[nowType];

        return (
            <div>
                <div className="sidebar-item-title">bucket</div>
                <ChangeInput title="Aggregation" data={types} nowType={bucket.type} changeHandle={this.changeType.bind(this)}/>
                {
                    content.field
                    ? <DownInputGroup title="Field" data={this.filterField.bind(this)(content)} value={bucket.field}
                                      changeHandle={(e)=>{this.props.modifyBucket(index, 'field', e.target.value)}}/> : ""
                }
                {
                    content.interval
                    ? (typeof(content.interval) === "object"
                        ?  <DownInputGroup title="Interval" data={content.interval} value={bucket.interval}
                                           changeHandle={(e)=>{this.props.modifyBucket(index, 'interval', e.target.value)}}/>
                        :  <UpDownInputGroup title="Interval" data={content.interval} value={bucket.interval}
                                             changeHandle={this.change.bind(this, 'interval')}/>)
                    : ""
                }
                {
                    content.showEmpty
                    ? <label>
                            <input type="checkbox" name="showEmpty" data={""} checked={bucket.showEmpty}
                                   onChange={(e)=>{this.props.modifyBucket(index, 'showEmpty', e.target.checked)}}/>
                            Show empty buckets
                        </label>
                    : ""
                }
                {
                    nowType === "Range"
                        ? <FromToInputNum index={index} name="fromTo" data={content.fromTo} value={bucket.fromTo}/>
                        : (nowType === "Date Range"
                            ? <FromToInput index={index} name="fromTo" data={content.fromTo} value={bucket.fromTo}/>
                            : (nowType === "IPv4 Range"
                                ? <FromToInputNumChange index={index} data={content.fromTo} value={bucket.fromTo}
                                                        changeHandle={this.props.modifyBucket}/>
                                : ""
                           )
                        )
                }
                {
                    content.orderBy
                        ? <OrderGroup index={index} data={content} value={bucket}
                                      changeHandle={this.props.modifyBucket}/>: ""
                }
                {
                    content.size && !content.order
                        ? <UpDownInputGroup title="Size" data={content.size} value={bucket.size}
                                            changeHandle={this.change.bind(this, 'size')}/> : ""
                }
                {
                    content.label
                    ? <NormalInput title="Custom Label" value={bucket.label}
                                   changeHandle={this.change.bind(this, 'label')}/>
                    : <FilterInputGroup index={index} value={bucket.filter} />
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        buckets2:state.buckets2
    }
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