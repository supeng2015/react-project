import React from 'react'
import ChartsListRow from "./ChartsListRow/ChartsListRow";
import './chartListPage.scss';

class ChartListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            "list1":[
                {name:"Area",src: require("../../../../images/chartsIcon/Area.svg"),href: "/app/visualize/Area"},
                {name:"Horizontal Bar",src: require("../../../../images/chartsIcon/HorizontalBar.svg"),href: "/app/visualize/HorizontalBar"},
                {name:"Line",src: require("../../../../images/chartsIcon/Line.svg"),href: "/app/visualize/Line"},
                {name:"Pie",src: require("../../../../images/chartsIcon/Pie.svg"),href: "/app/visualize/Pie"},
                {name:"Vertical Bar",src: require("../../../../images/chartsIcon/VerticalBar.svg"),href: "/app/visualize/VerticalBar"}
            ],
            "list2":[
                {name:"Metric",src: require("../../../../images/chartsIcon/Metric.svg"),href: "/app/visualize/Metric"}
            ]
        }
    }

    render() {
        return (
            <div className="char-list">
                <ChartsListRow title="Basic Charts" chartLists={this.state.list1}/>
                <ChartsListRow title="Data" chartLists={this.state.list2}/>
            </div>
        )
    }
}

export default ChartListPage