import React from 'react'
import DropdownInputGroup from "../../kibana/subKibana2/DownInputGroup/DownInputGroup";
import 'whatwg-fetch';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="index-container">
                <DropdownInputGroup title="Index" value={this.props.indexValue} changeHandle={this.props.changeHandle} data={this.props.data}/>
            </div>
        )
    }
}

export default Index