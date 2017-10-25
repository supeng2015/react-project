import React from 'react'
import 'whatwg-fetch';
import {connect} from 'react-redux'

class Metric extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let newData = this.props.newData;
        let keys = [], datas = [];
        for(let i in newData){
            for (let key in newData[i]) {
                keys.push(key);
                datas.push(newData[i][key]);
            }

        }
        return (
            <div className='metricsBox'>
                {
                    keys.map((key, index) => {
                        return (
                            <div key={index} className='box'>
                                <h3>{key}</h3>
                                <p>{datas[index]}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newData: state.addMetricsData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Metric)
