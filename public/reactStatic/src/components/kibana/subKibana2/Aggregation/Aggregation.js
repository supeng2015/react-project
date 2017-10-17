import React, {Component} from 'react'

class Aggregation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('thisType####: '+this.props.thisType);
        return (
            <div className='form-group'>
                <h5>{this.props.title}</h5>
                <select className='form-control' value={this.props.thisType} onChange={this.props.changeHandle}>
                    {/*<option selected='selected'>{this.props.thisType}</option>*/}
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