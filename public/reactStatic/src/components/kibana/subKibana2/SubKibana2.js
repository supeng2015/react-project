import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2} from "../../../actions/index";

class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketArr: [{
                types: ["Data Histogram", "Histogram", "Range"],
                content: {
                    "Data Histogram": {
                        field: ["@timestamp", "uc_time"],
                        interval: ["-- select a valid interval --", "Daily", "Monthly", "Yearly"]
                    },
                    "Histogram": {
                        field: ["-- select a valid interval --", "Daily", "Monthly", "Yearly"],
                        interval: ""
                    },
                    "Range": {
                        field: [],
                        FromTo: [[0, 1000]]
                    }
                }
            }]
        }
    }

    addBucket(){
        const bucketInitDate = {
            types: ["Data Histogram", "Histogram", "Range"],
            content: {
                "Data Histogram": {
                    field: ["@timestamp", "uc_time"],
                    interval: ["-- select a valid interval --", "Daily", "Monthly", "Yearly"]
                },
                "Histogram": {
                    field: ["-- select a valid interval --", "Daily", "Monthly", "Yearly"],
                    interval: ""
                },
                "Range": {
                    field: [],
                    FromTo: [[0, 1000]]
                }
            }
        };
        this.setState({
            bucketArr:[...this.state.bucketArr, bucketInitDate]
        });
        this.props.addBucket(bucketInitDate)
    }

    render(){
        return (
            <div>
                {
                    this.state.bucketArr.map((item, index)=>{
                        return <Bucket types={item.types} content={item.content} key={index} index={index}/>
                    })
                }
                <button onClick={this.addBucket.bind(this)}>Add Bucket</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        addBucket: (bucketData)=> {
            dispatch(addBucket2(bucketData))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubKibana2)