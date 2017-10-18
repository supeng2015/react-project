import React from 'react'
import ChartsListItem from "../ChartsListItem/ChartsListItem";

class ChartsListRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="chart-list-row-container">
                <h2>{this.props.title}</h2>
                <div className="chart-list-row">
                    {
                        this.props.chartLists.map((item, index) => {
                            return (
                                <ChartsListItem listName={item.name} listSrc={item.src} listHref={item.href}
                                                key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ChartsListRow