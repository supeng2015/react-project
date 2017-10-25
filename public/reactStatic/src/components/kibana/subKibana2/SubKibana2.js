import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2, addMetrics2, delMetrics2, delBucket2,addMetricsData} from "../../../actions/index";
import Metrics from './Metrics/Metrics'
import metricsConstructor from './metricsConstructor'
import metricsData from './metricsData'
import bucketConstructor from './bucketConstructor';
import bucketData from './bucketData';
import Close from 'react-icons/lib/fa/close'
import 'whatwg-fetch'

class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metricsArr: [],
            bucketArr: [],
            field: {}
        }
    }

    // 动态添加Field
    addField(constructor) {
        const content = constructor.content;
        for (let key in content) {
            if (content[key]["field"] && content.hasOwnProperty(key)) {
                content[key]["field"] = this.state.field;
            }
        }
        return constructor;
    }

    componentDidMount() {
        // 获取field数据
        fetch('http://localhost:3000/getField?index=test1&type=test1')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.setState({
                    field: res
                });
                // 动态添加field对象
                const constructorM = this.addField(metricsConstructor());
                const constructorB = this.addField(bucketConstructor());
                this.setState({
                    metricsArr: [constructorM],
                    bucketArr: [constructorB]
                })
            })
    }

    addMetric() {
        const metricInitData = this.addField(metricsConstructor());

        this.setState({
            metricsArr: [...this.state.metricsArr, metricInitData]
        });
        //将此时新加的数据的index设置为当前数据长度
        this.props._addMetric(this.state.metricsArr, metricsData['Count']);
    }

    delMetrics(metricsIndex) {
        //console.log('metricsIndex: '+metricsIndex)
        let metricsArr = this.state.metricsArr;
        const newArr = metricsArr.filter((item, index) => {
            return index !== metricsIndex
        });
        this.props.DelMetrics(metricsIndex);
        this.setState({
            metricsArr: newArr
        });
    }

    addBucket() {
        const bucketInitDate = this.addField(bucketConstructor());
        this.setState({
            bucketArr: [...this.state.bucketArr, bucketInitDate]
        });
        // 添加store中的bucket
        this.props.addBucket(bucketData("Date Histogram"))
    }

    delBucket(bucketIndex) {
        let bucketArr = this.state.bucketArr;
        const newArr = bucketArr.filter((item, index) => {
            return bucketIndex !== index;
        });

        this.setState({
            bucketArr: newArr
        });
        this.props.delBucket(bucketIndex);
    }

    submitData() {
        let submitObj = this.mergeJson();
        submitObj.index = this.props.indexType.indexValue;
        submitObj.type = this.props.indexType.typeValue;

        fetch('http://localhost:3000/sendAgg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitObj)
        })
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                let bbb=res.replace(/"/g,'');
                let temp=bbb.substring(1,bbb.length-1);
                let temp1=temp.split(',');
                let temp2=[];
                for(let i in temp1){
                    let q=temp1[i].split(':');
                    temp2.push(q);
                }
                let arr=[];
                for(let i in temp2){
                    let obj={[temp2[i][0]]:temp2[i][1]};
                    arr.push(obj);
                }
                this.props.addMetricsData(arr);
            })
    }

    // 合并json数据
    mergeJson() {
        let result = {};
        let metricsData = this.props.metricsData;
        let bucketsData = this.props.allBucketData;
        let metricsJson = this.createJson(metricsData);
        let bucketsJson = this.createJson(bucketsData);
        let labelName = this.props.allBucketData[0].label;

        bucketsJson.aggs[labelName].aggs = metricsJson.aggs;
        result.json = bucketsJson;
        result.baseAgg = labelName;
        return result;
    }

    // 提取对应的数据
    createJson(dateArray) {
        for (let i = 0; i < dateArray.length; i++) {
            let obj = {};
            for (let key in dateArray[i]) {
                if (dateArray[i].hasOwnProperty(key)) {
                    if (key !== "type" && key !== "label") {
                        obj[key] = dateArray[i][key]
                    }
                }
            }
            let result = {aggs: {[dateArray[i].label]: {[dateArray[i].type]: obj}}};
            console.log(JSON.stringify(result));
            return result;
        }
    }

    render() {
        return (
            <div>
                <div className="form-item">
                    {
                        this.state.metricsArr.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Close className="f-fr button-icon button-warning"
                                           onClick={this.delMetrics.bind(this, index)}/>
                                    <Metrics types={item.types} content={item.content} index={index}/>
                                </div>
                            )
                        })
                    }
                    <button onClick={this.addMetric.bind(this)}>Add Metrics</button>
                </div>

                <div className="form-item">
                    {
                        this.state.bucketArr.map((item, index) => {
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
                    <button className="button-primary" onClick={this.addBucket.bind(this)}>Add Bucket</button>
                </div>
                <button onClick={this.submitData.bind(this)}>Submit Data</button>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        allBucketData: state.buckets2,
        metricsData: state.metrics2,
        indexType: state.indexType,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _addMetric: (index, metricsData) => {
            dispatch(addMetrics2(index, metricsData))
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
        addMetricsData:(data)=>{
            dispatch(addMetricsData(data));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)