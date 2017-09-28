import React, {Component} from 'react'
import {connect} from 'react-redux'
import Aggregation from '../Aggregation/Aggregation'
import CustomLab from '../CustomLab/CustomLab'
import MetricsField from '../MetricsField/MetricsField'

class Metrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nowType: 'Count'
        }
    }

    changeType(e) {
        this.setState({
            nowType: e.target.value
        })

    }

    render() {
        let content = this.props.content[this.state.nowType];

        return (
            <div className='Metrics'>
                <div className='title'>Metrics</div>
                <Aggregation title='Aggregation' types={this.props.types} changeHandle={this.changeType.bind(this)}/>
                {
                    content.field.length === 0 ? '' : <MetricsField name='Field' datas={content}/>
                }
                {
                    content.CustomLabel === undefined ? '' : <CustomLab title='Custom Label'/>
                }


            </div>

        )
    }
}

const mapStateToProps = (state) => {

};
const mapDispatchToProps = (dispatch) => {

};

export default connect()(Metrics)