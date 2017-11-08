import React from 'react'
import Index from "./Index/Index";
import Type from "./Type/Type";
import "./indexType.scss"
import TypeFilter from "./Type/TypeFilter";
import {connect} from "react-redux";
import {updateIndex, updateType, updateIndexArray, updateTypeArray, updateContent, updateField} from '../../actions'
import {withRouter} from 'react-router-dom';
import {resetBucket2, resetMetrics2, updateBucketField, updateMetricField} from "../../actions/index";
import config from "../../config";

class IndexType extends React.Component {
    constructor(props) {
        super(props);
    }

    // http请求，field
    fetchField() {
        let {indexValue, typeValue} = this.props.indexType;
        fetch('http://'+ config.nodejsIp +':3000/getField?index=' + indexValue + '&type=' + typeValue)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.status !== 'error') {
                    this.props.updateField(res);
                } else {
                    alert("获取Field网络错误");
                }
            });
    }

    // http请求，获取content
    fetchContent() {
        let {indexArray, typeValue} = this.props.indexType;
        fetch('http://'+ config.nodejsIp +':3000/getAllData?indexes=' + indexArray.toString() + '&type=' + typeValue)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.status !== 'error') {
                    this.props.updateContent(res);
                } else {
                    alert("获取Content网络错误")
                }
            })
    }

    // http请求，获取Type
    fetchType(indexValue) {
        fetch('http://'+ config.nodejsIp +':3000/getType?index=' + indexValue)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.status !== 'error') {
                    this.props.updateTypeArray(res);
                    this.props.updateTypeValue(res[0]);
                    return Promise.resolve("");
                } else {
                    alert("获取Type网络错误");
                }
            })
            .then(() => {
                this.fetchContent();
            })
    }

    componentDidMount() {
        // 获取Index
        fetch('http://'+ config.nodejsIp +':3000/getIndex')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.status !== 'error') {
                    this.props.updateIndexArray(res);
                    this.props.updateIndexValue(res[0]);
                    return Promise.resolve("");
                } else {
                    alert("获取Index网络错误");
                    return Promise.reject("");
                }
            })
            .then(() => {
                // 获取Type
                fetch('http://'+ config.nodejsIp +':3000/getType?index=' + this.props.indexType.indexValue)
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        if (res.status !== 'error') {
                            this.props.updateTypeArray(res);
                            this.props.updateTypeValue(res[0]);
                            return Promise.resolve("");
                        } else {
                            alert("获取Type网络错误");
                            return Promise.reject("");
                        }
                    })
                    .then(() => {
                        // 获取Content
                        let {indexArray, typeValue} = this.props.indexType;
                        fetch('http://'+ config.nodejsIp +':3000/getAllData?indexes=' + indexArray.toString() + '&type=' + typeValue)
                            .then((response) => {
                                return response.json();
                            })
                            .then((res) => {
                                if (res.status !== 'error') {
                                    this.props.updateContent(res);
                                    return Promise.resolve("");
                                } else {
                                    alert("获取Content网络错误");
                                    return Promise.reject("");
                                }
                            })
                            .then(()=>{
                                // 获取Field
                                this.fetchField();
                            })
                    })
            })
    }

    changeIndex(e) {
        const {location} = this.props;
        this.props.updateIndexValue(e.target.value);
        setTimeout(() => {
            // 获取Type
            fetch('http://'+ config.nodejsIp +':3000/getType?index=' + this.props.indexType.indexValue)
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    if (res.status !== 'error') {
                        // 更新Type
                        this.props.updateTypeArray(res);
                        this.props.updateTypeValue(res[0]);
                        return Promise.resolve("");
                    } else {
                        alert("获取Type网络错误");
                    }
                })
                .then(() => {
                    if (location.pathname === "/app") {
                        this.fetchContent();
                        this.fetchField();
                    } else {
                        // 获取Content
                        this.fetchContent();
                        // 获取Field
                        let {indexValue, typeValue} = this.props.indexType;
                        fetch('http://'+ config.nodejsIp +':3000/getField?index=' + indexValue + '&type=' + typeValue)
                            .then((response) => {
                                return response.json();
                            })
                            .then((res) => {
                                // 更新Field
                                if (res.status !== 'error') {
                                    this.props.updateField(res);
                                    setTimeout(()=>{
                                        this.props.updateMetricField(this.props.field);
                                        this.props.updateBucketField(this.props.field);
                                        this.props.resetMetric();
                                        this.props.resetBucket();
                                    },0)
                                } else {
                                    alert("获取Field网络错误");
                                }
                            })
                    }
                })
        }, 0)
    }

    changeType(e) {
        const {location} = this.props;
        this.props.updateTypeValue(e.target.value);
        setTimeout(() => {
            if (location.pathname === "/app") {
                this.fetchContent();
                this.fetchField();
            } else {
                let {indexValue, typeValue} = this.props.indexType;
                fetch('http://'+ config.nodejsIp +':3000/getField?index=' + indexValue + '&type=' + typeValue)
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        if (res.status !== 'error') {
                            this.props.updateField(res);
                            setTimeout(()=>{
                                this.props.updateMetricField(this.props.field);
                                this.props.updateBucketField(this.props.field);
                                this.props.resetMetric();
                                this.props.resetBucket();
                            },0)
                        } else {
                            alert("获取Field网络错误");
                        }
                    })
            }
        }, 0)
    }

    render() {
        let {indexValue, typeValue, indexArray, typeArray} = this.props.indexType;

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

function mapStateToProps(state) {
    return {
        indexType: state.indexType,
        field: state.field
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
        },
        updateContent: (contentObj) => {
            dispatch(updateContent(contentObj))
        },
        updateField: (fieldObj) => {
            dispatch(updateField((fieldObj)))
        },
        updateMetricField: (fieldObj) => {
            dispatch(updateMetricField(fieldObj))
        },
        updateBucketField: (fieldObj => {
            dispatch(updateBucketField(fieldObj))
        }),
        resetMetric: () => {
            dispatch(resetBucket2())
        },
        resetBucket: () => {
            dispatch(resetMetrics2())
        }

    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexType));