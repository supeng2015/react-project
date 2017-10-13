import React, {Component} from 'react'
import {connect} from 'react-redux'
import Close from 'react-icons/lib/fa/close'
import {modifyMetrics2} from '../../../../actions/index'

class Values extends Component {
    constructor() {
        super()
    }

    delPercent(percentIndex) {
        //console.log('called del');
        const {index, name} = this.props;
        let Values = this.props.metrics[index].Values;
        //console.log('metrics:: ' + newPercent);
        const newValues = Values.filter((item, index) => {
            return index !== percentIndex
        });
        this.props.modifyMetrics(index, name, newValues)
    }

    addValue() {
        const {index, name} = this.props;
        let Values = this.props.metrics[index].Values;
        let newValue = [...Values, ''];
        this.props.modifyMetrics(index, name, newValue);
    }

    changeHandle(changeIndex, e) {
        const {index, name} = this.props;
        let Values = this.props.metrics[index].Values;
        let newValues = Values.map((item, index) => {
            if (index === changeIndex) {
                item = e.target.value;
                //删除完某一input框的内容时删除该框###
                if (item === '') {
                    this.delPercent.bind(this, changeIndex)
                }
                return item
            } else {
                return item
            }
        });
        this.props.modifyMetrics(index, name, newValues);
    };

    render() {
        let len = this.props.metrics[this.props.index].Values.length;
        return (
            <div className='form-group'>
                <h5>{this.props.name}</h5>
                <div>Please specify at least one</div>
                <br/>
                <table>
                    <tbody>
                    {
                        //根据metricsData的数据来确认value输入框的个数
                        this.props.metrics[this.props.index].Values.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td><input className='form-control' type="text" value={data}
                                               onChange={this.changeHandle.bind(this, index)}/></td>
                                    <td><Close onClick={this.delPercent.bind(this, index)}/></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <button onClick={this.addValue.bind(this, len)}>Add</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        metrics: state.metrics2
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyMetrics: (index, key, value) => {
            dispatch(modifyMetrics2(index, key, value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Values);