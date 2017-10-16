import React, {Component} from 'react'
import {connect} from 'react-redux'
import Aggregation from '../Aggregation/Aggregation'
import CustomLab from '../CustomLab/CustomLab'
import MetricsField from '../MetricsField/MetricsField'
import Percents from '../Percents/Percents'
import Values from '../Values/Values'
import {modifyMetrics2, changeMetricsType} from '../../../../actions/index'
import metricsData from '../metricsData'

class Metrics extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
            nowType: 'Count'
        }*/
    }

    changeType(e) {
        /*this.setState({
            nowType: e.target.value
        });*/
        //切换选项时将该选项下的数据传入store中
        this.props.changeMetricsType(this.props.index, metricsData[e.target.value]);
    }

    change(name, e) {
        let {index} = this.props;
        this.props.modifyMetrics(index, name, e.target.value)
    }

    render() {
        const {index} = this.props;
        let constructor = this.props.content[this.props.thisType];

        return (
            <div className='Metrics'>
                <div className='title'>
                    <span>Metrics</span>
                </div>

                <Aggregation title='Aggregation' types={this.props.types} thisType={this.props.thisType} changeHandle={this.changeType.bind(this)}/>
                {
                    constructor.field === undefined ? '' : <MetricsField name='Field' constructor={constructor}
                                                                         changeHandle={this.change.bind(this, 'field')}/>
                }
                {
                    constructor.Percents === undefined ? '' :
                        <Percents name='Percents' index={index}/>
                }
                {
                    constructor.Values === undefined ? '' : <Values name='Values' index={index}/>
                }
                {
                    constructor.CustomLabel === undefined ? '' :
                        <CustomLab title='Custom Label' changeHandle={this.change.bind(this, 'CustomLabel')}/>
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