import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2, addMetrics2} from "../../../actions/index";
import Metrics from './Metrics/Metrics'
import {addBucket2} from "../../../actions/index";
import bucketConstructor from './bucketConstructor';

class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metricsArr: [{
                types: ['Count', 'Average', 'Sum'],
                content: {
                    'Count': {
                        field: [],
                        CustomLabel: ''
                    },
                    'Average': {
                        field: ['age', 'number'],
                        CustomLabel: ''
                    },
                    'Sum': {
                        field: ['age', 'number'],
                        CustomLabel: ''
                    }
                }
            }]
        }
    }

    addMetric() {
        const metricInitData = {
            types: ['Count', 'Average', 'Sum'],
            content: {
                'Count': {
                    field: [],
                    CustomLabel: ''
                },
                'Average': {
                    filed: ['age', 'number'],
                    CustomLabel: ''
                },
                'Sum': {
                    filed: ['age', 'number'],
                    CustomLabel: ''
                }
            }
        };

        this.setState({
            metricsArr: [...this.state.metricsArr, metricInitData]
        });
        this.props.addMetric(metricInitData);
    }

    addBucket(){
        const bucketInitDate = bucketConstructor;
        this.setState({
            bucketArr: [...this.state.bucketArr, bucketInitDate]
        });
        // 添加store中的bucket
        this.props.addBucket(bucketInitDate)
    }

    render() {

        return (
            <div className="form-item">
                {
                    this.state.metricsArr.map((item, index) => {
                        return <Metrics types={item.types} content={item.content} key={index} index={index}/>
                    })

                }
                <button onClick={this.addMetric.bind(this)}>Add Metrics</button>
                {
                    this.state.bucketArr.map((item, index) => {
                        return <Bucket types={item.types} content={item.content} key={index} index={index}/>
                    })
                }
                <button onClick={this.addBucket.bind(this)}>Add Bucket</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bucket: state.buckets2
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMetric: (metricsData) => {
            dispatch(addMetrics2(metricsData))
        },
        addBucket: (bucketData) => {
            dispatch(addBucket2(bucketData))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)