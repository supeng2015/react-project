import React, {Component} from 'react'

class CustomLab extends Component {

    render() {
        return (
            <div className='form-group'>
                <h5>{this.props.title}</h5>
                <input type="text" className='form-control'/>
            </div>
        )
    }
}

export default CustomLab