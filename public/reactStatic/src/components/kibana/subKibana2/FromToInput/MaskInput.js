import React from 'react'
import Close from 'react-icons/lib/fa/close'
import {connect} from 'react-redux'
import {modifyBucket2} from "../../../../actions/index";

class MaskInput extends React.Component {
    constructor(props) {
        super(props)
    }

    changeHandle(maskIndex, e){
        let {index, name}=this.props;
        let oldMask = [...this.props.buckets[index].mask];
        oldMask[maskIndex] = e.target.value;
        this.props.modifyBucket(index, name, oldMask)
    }

    removeHandle(maskIndex){
        let {index, name}=this.props;
        let newMask = this.props.buckets[index].mask.filter((item, index)=>{
            return index !== maskIndex
        });
        this.props.modifyBucket(index, name, newMask)
    }

    addHandle(){
        let {index, name}=this.props;
        let oldMask = this.props.buckets[index].mask;
        this.props.modifyBucket(index, name, [...oldMask, ""])
    }

    render() {
        let {index}=this.props;
        let data = this.props.buckets[index].mask;
        return (
            <div>
                {
                    data.map((item, index)=>{
                        return (
                            <div className="form-group" key={index}>
                                <Close className="f-fr button-icon button-warning" onClick={this.removeHandle.bind(this, index)}/>
                                <h5>Mask</h5>
                                <input type="text" title="Mask" value={data[index]}  className="form-control"
                                       onChange={this.changeHandle.bind(this, index)}/>
                            </div>
                        )
                    })
                }
                <button onClick={this.addHandle.bind(this)}>Add Mask</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        buckets: state.buckets2
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifyBucket: (index, key, value) => {
            dispatch(modifyBucket2(index, key, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MaskInput)