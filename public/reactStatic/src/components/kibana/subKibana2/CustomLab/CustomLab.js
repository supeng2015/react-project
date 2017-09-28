import React, {Component} from 'react'

class CustomLab extends Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div className='form-group'>
                <h5>{this.props.title}</h5>
                <input type="text"/>
            </div>
        )
    }
}

export default CustomLab