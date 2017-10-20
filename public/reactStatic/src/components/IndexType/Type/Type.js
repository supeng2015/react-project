import React from 'react'
import DropdownInputGroup from "../../kibana/subKibana2/DownInputGroup/DownInputGroup";

class Type extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="type-container">
                <DropdownInputGroup title="Type" value={this.props.value} changeHandle={this.props.changeHandle}
                                    data={this.props.data}/>
            </div>
        )
    }
}

export default Type