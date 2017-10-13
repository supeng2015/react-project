import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2, addMetrics2,delMetrics2} from "../../../actions/index";
import Metrics from './Metrics/Metrics'
import metricsConstructor from './metricsConstructor'
import metricsData from './metricsData'
import bucketConstructor from './bucketConstructor';
import bucketData from './bucketData';
import Close from 'react-icons/lib/fa/close'


class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metricsArr: [metricsConstructor],
            bucketArr: [bucketConstructor]
        }
    }

    addMetric() {
        const metrics = this.state.metricsArr;
        const metricInitData = metricsConstructor;

        this.setState({
            metricsArr: [...metrics, metricInitData]
        });
        //将此时新加的数据的index设置为当前数据长度
        this.props._addMetric(this.state.metricsArr,metricsData['Count']);
        //console.log('addMetric::'+JSON.stringify(this.state.metricsArr));
    }

    delMetrics(metricsIndex){
        //console.log('metricsIndex: '+metricsIndex)
        let metricsArr = this.state.metricsArr;
        const newArr = metricsArr.filter((item, index) => {
            return index !== metricsIndex
        });
        this.setState({
            metricsArr: newArr
        });
        this.props.modifyMetrics(metricsIndex);
        //console.log('newArr:'+JSON.stringify(newArr));

    }

    addBucket() {
        const bucketInitDate = bucketConstructor;
        this.setState({
            bucketArr: [...this.state.bucketArr, bucketInitDate]
        });
        // 添加store中的bucket
        this.props.addBucket(bucketData("Data Histogram"))
    }

    // 测试Bucket生成JSON，暂时不考虑多个Bucket的情况
    testBucketJSON() {
        let bucketData = this.props.allBucketData[0];
        let obj = {};
        for (let key in bucketData) {
            if (bucketData.hasOwnProperty(key)) {
                if (key !== "type" && key !== "label") {
                    obj[key] = bucketData[key]
                }
            }
        }
        let result = {aggs: {[bucketData.label]: {[bucketData.type]: obj}}};
        console.log(JSON.stringify(result))
    }

    render() {
        console.log('Subkibana此时store中的值： ' + JSON.stringify(this.props.metricsData));
        return (
            <div>
                <div className="form-item">
                    {
                        this.state.metricsArr.map((item, index) => {
                            //console.log(item.types);
                            return (
                                <div>
                                    <Close onClick={this.delMetrics.bind(this,index)}/>
                                    <Metrics types={item.types} content={item.content} key={index} index={index}/>
                                </div>
                            )
                        })
                    }
                    <button onClick={this.addMetric.bind(this)}>Add Metrics</button>
                </div>

                <div className="form-item">
                    {
                        this.state.bucketArr.map((item, index) => {
                            return <Bucket types={item.types} content={item.content} key={index} index={index}/>
                        })
                    }
                    <button className="button-primary" onClick={this.addBucket.bind(this)}>Add Bucket</button>
                    <button onClick={this.testBucketJSON.bind(this)}>Test Bucket JSON</button>
                </div>
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
        _addMetric: (index,metricsData) => {
            dispatch(addMetrics2(index,metricsData))
        },
        addBucket: (bucketData) => {
            dispatch(addBucket2(bucketData))
        },
        modifyMetrics: (index) => {
            dispatch(delMetrics2(index))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)