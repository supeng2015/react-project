import React, {Component} from 'react'
import {connect} from 'react-redux'
import Aggregation from '../Aggregation/Aggregation'
import Percents from '../Percents/Percents'
import Values from '../Values/Values'
import {modifyMetrics2, changeMetricsType} from '../../../../actions/index'
import metricsData from '../metricsData'
import NormalInput from "../NormalInput/NormalInput";
import DownInputGroup from "../DownInputGroup/DownInputGroup";

class Metrics extends Component {

    constructor(props) {
        super(props);
    }

    changeType(e) {
        //切换选项时将该选项下的数据传入store中
        this.props.changeMetricsType(this.props.index, metricsData[e.target.value]);
    }

    change(name, e) {
        let {index} = this.props;
        this.props.modifyMetrics(index, name, e.target.value)
    }

    filterField(content){
        let type = content.fieldType;
        let field = content.field;
        let result = ["--" + content.fieldType + "--"];
        for(let key in field){
            if(field.hasOwnProperty(key)){
                switch (type){
                    case "number":
                        if(field[key] === "long" || field[key] === "int"){
                            result.push(key);
                        }
                        break;
                    default:
                        if(field[key] === type){
                            result.push(key);
                        }
                }
            }
        }
        return result;
    }

    render() {
        let {index, types} = this.props;
        let metrics = this.props.metrics[index];
        let nowType = metrics.type;
        const content = this.props.content[nowType];

        return (
            <div className='Metrics'>
                <div className='title'>
                    <span>Metrics</span>
                </div>

                <Aggregation title='Aggregation' types={types} thisType={nowType} changeHandle={this.changeType.bind(this)}/>
                {
                    content.field === undefined ? '' :
                        <DownInputGroup title="Field" data={this.filterField.bind(this)(content)} value={metrics.type} changeHandle={this.change.bind(this, 'field')}/>
                }
                {
                    content.Percents === undefined ? '' :
                        <Percents name='Percents' index={index}/>
                }
                {
                    content.Values === undefined ? '' : <Values name='Values' index={index}/>
                }
                {
                    content.label === undefined ? '' :
                        <NormalInput title='Custom Label' changeHandle={this.change.bind(this, 'label')} value={this.props.metrics.label}/>
                }
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
        changeMetricsType: (index, metricsData) => {
            dispatch(changeMetricsType(index, metricsData))
        },
        modifyMetrics: (index, key, value) => {
            dispatch(modifyMetrics2(index, key, value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Metrics)