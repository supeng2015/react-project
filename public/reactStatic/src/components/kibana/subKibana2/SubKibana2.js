import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2, addMetrics2, delMetrics2, delBucket2} from "../../../actions/index";
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
            metricsArr: [metricsConstructor],
            bucketArr: [bucketConstructor()]
        }
    }

    addMetric() {
        const metrics = this.state.metricsArr;
        const metricInitData = metricsConstructor;

        this.setState({
            metricsArr: [...metrics, metricInitData]
        });
        //将此时新加的数据的index设置为当前数据长度
        this.props._addMetric(this.state.metricsArr, metricsData['Count']);
        //console.log('addMetric::'+JSON.stringify(this.state.metricsArr));
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
        console.log('this.state.metricsArr '+newArr);

        console.log('thisType: '+JSON.stringify(this.props.metricsData));

    }

    addBucket() {
        const bucketInitDate = bucketConstructor();
        this.setState({
            bucketArr: [...this.state.bucketArr, bucketInitDate]
        });
        // 添加store中的bucket
        this.props.addBucket(bucketData("Data Histogram"))
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
        this.mergeJson()
        // fetch('http://localhost:3000/test')
        //     .then((response) => {
        //         return response.json();
        //     }).then((res) => {
        //     console.log(res);
        // })
    }

    // 合并json数据
    mergeJson(){
        let metricsData = this.props.metricsData;
        let bucketsData = this.props.allBucketData;
        let metricsJson = this.createJson(metricsData);
        let bucketsJson = this.createJson(bucketsData);
        let labelName = this.props.allBucketData[0].label;

        bucketsJson.aggs[labelName].aggs=metricsJson.aggs;
        console.log(bucketsJson);
    }

    // 提取对应的数据
    createJson(dateArray){
        for(let i = 0; i < dateArray.length; i++){
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
        //console.log('Metrics的store中的值： ' + JSON.stringify(this.props.metricsData));
        //console.log('Bucket的store中的值： ' + JSON.stringify(this.props.allBucketData));
        //let metricsArr = this.state.metricsArr;
        console.log('metricsData '+this.props.metricsData);
        return (
            <div>
                <div className="form-item">
                    {
                        this.state.metricsArr.map((item, index) => {
                            //console.log(item.types);

                            return (
                                <div key={index}>
                                    <Close className="f-fr button-icon button-warning" onClick={this.delMetrics.bind(this,index)}/>
                                    <Metrics types={item.types} content={item.content} thisType={this.props.metricsData[index].type} index={index}/>
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
        metricsData: state.metrics2
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)