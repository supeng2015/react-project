import React from 'react'
import Close from 'react-icons/lib/fa/close'
import {connect} from 'react-redux'
import {modifyBucket2} from "../../../../actions/index";


class FromToInput extends React.Component {
    constructor(props) {
        super(props);
    }

    changeHandle(rangeIndex, key, e){
        const {index, name} = this.props;
        let fromTo = this.props.buckets[index].ranges;
        const newFromTo = fromTo.map((item, index)=>{
            if(index === rangeIndex){
                item[key] = e.target.value;
                return item
            }else{
                return item
            }
        });
        this.props.modifyBucket(index, name, newFromTo);
    }

    addFromTo(){
        const {index, name} = this.props;
        let fromTo = this.props.buckets[index].ranges;
        const newFromTo = [...fromTo,{from:0, to: 0}];
        this.props.modifyBucket(index, name, newFromTo);
    }

    deleteFromTo(rangeIndex){
        const {index, name} = this.props;
        let fromTo = this.props.buckets[index].ranges;
        const newFromTo = fromTo.filter((item,index)=>{
            return index !== rangeIndex
        });
        this.props.modifyBucket(index, name, newFromTo);
    }

    render() {
        let fromTo = this.props.buckets[this.props.index].ranges;
        return (
            <div className="form-group">
                <table className="form-group">
                    <tbody>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                    {
                        fromTo.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td><input type="text" className="form-control" min={0} value={fromTo[index].from}
                                               onChange={this.changeHandle.bind(this, index, 'from')}/></td>
                                    <td><input type="text" className="form-control" min={0} value={fromTo[index].to}
                                               onChange={this.changeHandle.bind(this, index, 'to')}/></td>
                                    <td><Close onClick={this.deleteFromTo.bind(this, index)}/></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <button onClick={this.addFromTo.bind(this)}>Add Range</button>
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
)(FromToInput)