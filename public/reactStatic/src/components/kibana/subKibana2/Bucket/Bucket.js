import React from 'react'
import DownInputGroup from '../DownInputGroup/DownInputGroup'
import ChangeInput from '../ChangeInput/ChangeInput'
import UpDownInputGroup from '../UpDownInputGroup/UpDownInputGroup'
import {connect} from 'react-redux'
import {changeBucketType} from '../../../../actions'

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

        let bucketData = function () {
            switch (bucketType){
                case "Data Histogram":
                    return {
                        type: "Data Histogram",
                        field: "",
                        interval: "",
                        label: ""
                    };
                case "Histogram":
                    return {
                        type: "Histogram",
                        field: "",
                        interval: "",
                        showEmpty: false,
                        label: ""
                    };
                case "Range":
                    return {
                        type: "Range",
                        field: "",
                        fromTo: [[0,1000]],
                        label: ""
                    };
                default:
                    return {
                        type: "Data Histogram",
                        field: "",
                        interval: "",
                        label: ""
                    };
            }
        };
        this.props.changeBucketType(this.props.index,bucketData());
    }

    render(){
        let types = this.props.types;
        let nowType = this.state.nowType;
        let content = this.props.content[nowType];

        return (
            <div className="form-item">
                <div className="sidebar-item-title">bucket</div>
                <ChangeInput title="Aggregation" data={types} changeHandle={this.changeType.bind(this)}/>
                <DownInputGroup title="Field" data={content.field} index={this.props.index} name="field"/>
                {
                    typeof(content.interval) === "undefined"
                    ? ""
                    : (typeof(content.interval) === "object"
                        ?  <DownInputGroup title="Interval" data={content.interval} index={this.props.index} name="interval"/>
                        :  <UpDownInputGroup title="Interval" data={content.interval} index={this.props.index} name="interval"/>)
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    let bucketData = state.buckets2;
    return {
        bucketData
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeBucketType: (index, bucketDate)=>{
            dispatch(changeBucketType(index, bucketDate))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bucket)