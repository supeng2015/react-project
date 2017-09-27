import React, {Component, PropTypes} from 'react';
import Bucket from './Bucket/Bucket'
import {connect} from 'react-redux'
import {addBucket2} from "../../../actions/index";
import bucketConstructor from './bucketConstructor';

class SubKibana2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketArr: [bucketConstructor]
        }
    }

    addBucket(){
        const bucketInitDate = bucketConstructor;
        this.setState({
            bucketArr:[...this.state.bucketArr, bucketInitDate]
        });
        // 添加store中的bucket
        this.props.addBucket(bucketInitDate)
    }

    render(){
        return (
            <div className="form-item">
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