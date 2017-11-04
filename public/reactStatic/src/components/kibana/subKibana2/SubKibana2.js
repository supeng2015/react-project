import React, {Component} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {
    addBucket2,
    addBucketConstructor,
    addMetricConstructor,
    addMetrics2,
    addMetricsData,
    delBucket2,
    delBucketConstructor,
    delMetricConstructor,
    delMetrics2,
    resetBucket2,
    resetMetrics2,
    updateBucketField,
    updateMetricField
} from "../../../actions/index";
import Metrics from './Metrics/Metrics'
import metricsData from './metricsData'
import bucketData from './bucketData';
import Close from 'react-icons/lib/fa/close'
import 'whatwg-fetch'
import config from "../../../config";

class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: ""
        }
    }

    componentDidMount() {
        let {field} = this.props;
        if (Object.keys(field).length) {
            this.props.updateMetricField(field);
            this.props.updateBucketField(field);
        } else {
            alert("获取Field网络错误");
        }
    }

    addMetric() {
        this.props.addMetricConstructor(this.props.field);
        //将此时新加的数据的index设置为当前数据长度
        this.props._addMetric(metricsData('Count'));
    }

    delMetrics(metricsIndex) {
        this.props.DelMetrics(metricsIndex);
        this.props.delMetricConstructor(metricsIndex);
    }

    addBucket() {
        this.props.addBucketConstructor(this.props.field);
        // 添加store中的bucket
        this.props.addBucket(bucketData("Date Histogram"))
    }

    delBucket(bucketIndex) {
        this.props.delBucketConstructor(bucketIndex);
        this.props.delBucket(bucketIndex);
    }

    resetData(){
        this.props.resetMetric();
        this.props.resetBucket();
    }

    submitData() {
        this.setState({
            isSubmit: "disabled"
        });
        let submitObj = this.mergeJson();
        submitObj.index = this.props.indexType.indexValue;
        submitObj.type = this.props.indexType.typeValue;
        console.log("提交的数据为：" + JSON.stringify(submitObj));
        fetch('http://'+ config.nodejsIp +':3000/sendAgg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitObj)
        })
            .then((response) => {
                this.setState({
                    isSubmit: ""
                });
                return response.json();
            })
            .then((res) => {
                console.log(res);
                // let bbb=res.replace(/"/g,'');
                // let temp=bbb.substring(1,bbb.length-1);
                // let temp1=temp.split(',');
                // let temp2=[];
                // for(let i in temp1){
                //     let q=temp1[i].split(':');
                //     temp2.push(q);
                // }
                // let arr=[];
                // for(let i in temp2){
                //     let obj={[temp2[i][0]]:temp2[i][1]};
                //     arr.push(obj);
                // }
                // this.props.addMetricsData(arr);
            })
    }

    // 合并json数据
    mergeJson() {
        let result = {};
        let metricsData = this.props.metricsData;
        let bucketsData = this.props.allBucketData;
        let metricsJson = this.createJson(metricsData);
        let bucketsJson = this.createJson(bucketsData);

        console.log("metricsJson:" + JSON.stringify(metricsJson));
        console.log("bucketsJson:" + JSON.stringify(bucketsJson));

        if (!metricsJson && bucketsJson) {
            result.json = bucketsJson;
            result.label = this.props.allBucketData[0].label;
        } else if (metricsJson && !bucketsJson) {
            result.json = metricsJson;
            result.label = this.props.metricsData[0].label;
        } else {
            let bucketLabelName = this.props.allBucketData[0].label;
            let metricLabelName = this.props.metricsData[0].label;
            bucketsJson.aggs[bucketLabelName].aggs = metricsJson.aggs;
            result.json = bucketsJson;
            result.label = metricLabelName;
        }
        return result;
    }

    // 提取对应的数据
    createJson(dateArray) {
        for (let i = 0; i < dateArray.length; i++) {
            // 如果数组长度为0或没有填写label标签
            if (!dateArray[i] || !dateArray[i].label) {
                return '';
            } else {
                let obj = {};
                for (let key in dateArray[i]) {
                    if (dateArray[i].hasOwnProperty(key)) {
                        if (key !== "type" && key !== "label" && key !== "typeName") {
                            obj[key] = dateArray[i][key]
                        }
                    }
                }
                // Median类型固定属性
                if (dateArray[i].type === "Median") {
                    obj.percents = [50];
                }
                // Date Histogram类型固定属性
                if (dateArray[i].type === "Date Histogram") {
                    let intervalMapping = {
                        Millisecondly: "1ms",
                        Secnodly: "1s",
                        Minutely: "1m",
                        Hourly: "1h",
                        Daily: "1d",
                        Weekly: "1w",
                        Monthly: "1M",
                        Yearly: "1y",
                    };
                    obj.interval = intervalMapping[obj.interval];
                    obj.min_doc_count = 1;
                }
                if (dateArray[i].type === "Histogram") {
                    // obj.interval = Number.parseInt(obj.interval);
                    obj.min_doc_count = obj.min_doc_count ? 0 : 1;
                }
                // 删除ranges或者mask
                if(dateArray[i].type === "IPv4 Range"){
                    if(obj.mask[0] === ""){
                        delete obj.mask;
                    }
                }
                // 去除orderby，添加_count或者_term
                if(dateArray[i].type === "Terms"){
                    let orderMapping = {Descending: "desc", Ascending: "asc"};
                    let orderItemMapping = {"metric:Count":"_count","Term":"_term"};
                    let order = orderMapping[obj.order];
                    let item = orderItemMapping[obj.orderBy];

                    obj["order"] = {};
                    obj["order"][item] = order;
                    delete obj.orderBy;
                }
                let result = {aggs: {[dateArray[i].label]: {[dateArray[i].typeName]: obj}}};
                console.log("提取到的数据为:" + JSON.stringify(result));
                return result;
            }
        }
    }

    render() {
        let {isSubmit} = this.state;
        return (
            Object.keys(this.props.field).length
                ? <div>
                    <div className="form-item">
                        {
                            this.props.constructorM.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Close className="f-fr button-icon button-warning"
                                               onClick={this.delMetrics.bind(this, index)}/>
                                        <Metrics types={item.types} content={item.content} key={index} index={index}/>
                                    </div>
                                )
                            })
                        }
                        <button onClick={this.addMetric.bind(this)}>Add Metrics</button>
                    </div>

                    <div className="form-item">
                        {
                            this.props.constructorB.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Close className="f-fr button-icon button-warning"
                                               onClick={this.delBucket.bind(this, index)}/>
                                        <Bucket types={item.types} content={item.content} key={index} index={index}
                                                delBucket={this.delBucket.bind(this)}/>
                                    </div>
                                )
                            })
                        }
                        <button onClick={this.addBucket.bind(this)}>Add Bucket</button>
                    </div>
                    <button id="submit" className="button-primary" onClick={this.submitData.bind(this)} disabled={isSubmit}>Submit Data</button>
                    <button className="button-primary" onClick={this.resetData.bind(this)}>Reset Data</button>
                </div>
                : <div>
                    <div className="form-item">Field加载中</div>
                </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        allBucketData: state.buckets2,
        metricsData: state.metrics2,
        indexType: state.indexType,
        field: state.field,
        constructorM: state.constructorM,
        constructorB: state.constructorB
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _addMetric: (metricsData) => {
            dispatch(addMetrics2(metricsData))
        },
        addBucket: (bucketData) => {
            dispatch(addBucket2(bucketData))
        },
        DelMetrics: (index) => {
            dispatch(delMetrics2(index))
        },
        delBucket: (index) => {
            dispatch(delBucket2(index))
        },
        resetMetric: () => {
            dispatch(resetBucket2())
        },
        resetBucket: () => {
            dispatch(resetMetrics2())
        },
        addMetricsData: (data) => {
            dispatch(addMetricsData(data));
        },
        updateMetricField: (fieldObj) => {
            dispatch(updateMetricField(fieldObj))
        },
        addMetricConstructor: (fieldObj) => {
            dispatch(addMetricConstructor(fieldObj));
        },
        delMetricConstructor: (index) => {
            dispatch(delMetricConstructor(index));
        },
        updateBucketField: (fieldObj => {
            dispatch(updateBucketField(fieldObj))
        }),
        addBucketConstructor: (fieldObj) => {
            dispatch(addBucketConstructor(fieldObj));
        },
        delBucketConstructor: (index) => {
            dispatch(delBucketConstructor(index));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)