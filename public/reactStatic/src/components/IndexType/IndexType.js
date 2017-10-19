import React from 'react'
import Index from "./Index/Index";
import Type from "./Type/Type";
import "./indexType.scss"
import TypeFilter from "./Type/TypeFilter";

class IndexType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indexValue: '',
            index: [],
            typeValue: '',
            type: []
        }
    }

    fetchType(indexValue){
        fetch('http://localhost:3000/getType?index=' + indexValue)
            .then((response)=>{
                return response.json();
            }).then((res)=>{
            this.setState({
                typeValue: res[0],
                type: res
            })
        })
    }

    componentDidMount() {
        fetch('http://localhost:3000/getIndex')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.setState({
                    indexValue: res[0],
                    index: res
                });
                return Promise.resolve("");
            })
            .then(()=>{
                this.fetchType(this.state.indexValue);
            })
    }

    changeIndex(e) {
        this.setState({
            indexValue: e.target.value
        });
        setTimeout(()=>{
            this.fetchType(this.state.indexValue);
        },0)
    }

    changeType(e) {
        this.setState({
            typeValue: e.target.value
        })
    }

    render() {
        return (
            <div className="index-type-container">
                <Index value={this.state.indexValue} data={this.state.index}
                       changeHandle={this.changeIndex.bind(this)}/>
                <Type value={this.state.typeValue} data={this.state.type} changeHandle={this.changeType.bind(this)}/>
                <div className="type-filter-container">
                    <TypeFilter/>
                    <button>Add a filter +</button>
                </div>
            </div>
        )
    }
}

export default IndexType