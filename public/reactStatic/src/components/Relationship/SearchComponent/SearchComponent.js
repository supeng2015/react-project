import React from 'react'
import NormalInput from "../../kibana/subKibana2/NormalInput/NormalInput";

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isSearching: false,
            keyword: '',
        }
    }

    search(){
        this.props.searchHandle(this.state.keyword)
    }

    render() {
        let {isSearching} = this.state;
        return (
            <div className="container" style={{display: "flex"}}>
                <div style={{width:"50%"}}>
                    <NormalInput title="Keyword" changeHandle={(e)=>{this.setState({keyword: e.target.value})}} value={this.state.keyword}/>
                </div>
                <button id="search" className="button-primary" disabled={isSearching} onClick={this.search.bind(this)}>Search</button>
            </div>
        )
    }
}

export default SearchComponent