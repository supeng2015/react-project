import React from 'react'
import {connect} from 'react-redux';
import Table from "./Table/Table";
import './HomePage.scss'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-container">
                <Table data={this.props.content}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content
    }
}

export default connect(
    mapStateToProps
)(HomePage)