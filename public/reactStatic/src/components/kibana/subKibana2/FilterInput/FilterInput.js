import React from 'react'
import NormalInput from "../NormalInput/NormalInput";
import Close from 'react-icons/lib/fa/close'
import FaPencil from 'react-icons/lib/fa/pencil'

class FilterInput extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {index, data} = this.props;
        return (
            <div>
                <div>
                    <FaPencil/>
                    <Close/>
                </div>
                <NormalInput title="Custom Label" data={data}
                              changeHandle={this.props.changeHandle(index, data)}/>
            </div>
        )
    }
}

export default FilterInput