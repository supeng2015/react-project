import React, {Component} from 'react'
import Close from 'react-icons/lib/fa/close'
import {modifyMetrics2} from "../../../../actions/index";
import {connect} from 'react-redux'

class Percents extends Component {
    constructor() {
        super()
    }

    delPercent(percentIndex) {
        //console.log('called del');
        const {index, name} = this.props;
        let Percent = this.props.metrics[index].percents;
        //console.log('metrics:: ' + newPercent);
        const newPercent = Percent.filter((item, index) => {
            return index !== percentIndex
        });
        this.props.modifyMetrics(index, name, newPercent)
    }

    addPercent() {
        const {index, name} = this.props;
        let Percent = this.props.metrics[index].percents;
        let len = Percent.length;
        //Percent.push(Percent[len-1]+1);
        let newPercent = [...Percent, Percent[len - 1] + 1];
        this.props.modifyMetrics(index, name, newPercent);
    }

    changeHandle(changeIndex, e) {
        const {index, name} = this.props;
        let Percent = this.props.metrics[index].percents;
        let newPercent = Percent.map((item, index) => {
            if(index===changeIndex){
                item=e.target.value;
                //删除完某一input框的内容时删除该框
                if(item===''){
                    this.delPercent.bind(this, changeIndex)
                }
                return item
            }else{
                return item
            }
        });
        this.props.modifyMetrics(index, name, newPercent);
    };

    render() {
        return (
            <div className='form-group'>
                <h5>{this.props.name}</h5>
                <table>
                    <tbody>
                    {this.props.metrics[this.props.index].percents.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td><input type="text" value={data} className='form-control'
                                           onChange={this.changeHandle.bind(this, index)}/></td>
                                <td><Close onClick={this.delPercent.bind(this, index)}/></td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
                <button onClick={this.addPercent.bind(this)}>Add</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Percents);