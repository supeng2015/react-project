import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2} from "../../../actions/index";
import bucketConstructor from './bucketConstructor';
import bucketData from './bucketData';

class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketArr: [bucketConstructor]
        }
    }

    addBucket() {
        const bucketInitDate = bucketConstructor;
        this.setState({
            bucketArr: [...this.state.bucketArr, bucketInitDate]
        });
        // 添加store中的bucket
        this.props.addBucket(bucketData["Data Histogram"])
    }

    // 测试Bucket生成JSON，暂时不考虑多个Bucket的情况
    testBucketJSON() {
        let bucketData = this.props.allBucketData[0];
        let obj={};
        for(let key in bucketData){
            if(bucketData.hasOwnProperty(key)){
                if(key !== "type" && key !== "label"){
                   obj[key] = bucketData[key]
                }
            }
        }
        let result = {aggs:{[bucketData.label]:{[bucketData.type]:obj}}};
        console.log(JSON.stringify(result))
    }

    render() {
        return (
            <div className="form-item">
                {
                    this.state.bucketArr.map((item, index) => {
                        return <Bucket types={item.types} content={item.content} key={index} index={index}/>
                    })
                }
                <button className="button-primary" onClick={this.addBucket.bind(this)}>Add Bucket</button>
                <button onClick={this.testBucketJSON.bind(this)}>Test Bucket JSON</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allBucketData: state.buckets2
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addBucket: (bucketData) => {
            dispatch(addBucket2(bucketData))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)