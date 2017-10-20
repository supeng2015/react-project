import React from 'react'
import {Link} from 'react-router-dom'

class ChartsListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={this.props.listHref}>
                <div className="chart-list-container">
                    <div className="chart-list-item">
                        <img src={this.props.listSrc} alt=""/>
                        <div>{this.props.listName}</div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ChartsListItem