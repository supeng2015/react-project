import React, {Component} from 'react'

class Aggregation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='form-group'>
                <h5>{this.props.title}</h5>
                <select className='form-control' onChange={this.props.changeHandle}>
                    {this.props.types.map((type, index) => {
                            return <option key={index} value={type}>{type}</option>
                        }
                    )}

                </select>
            </div>
        )
    }
}

export default Aggregation