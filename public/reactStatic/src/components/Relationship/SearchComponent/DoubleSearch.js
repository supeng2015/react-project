import React from 'react'
import MatchSearchComponent from "./MatchSearchComponent";
import "whatwg-fetch"

class DoubleSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            company1: {},
            company2: {}
        }
    }

    search(){
        let {company1, company2} = this.state;
        this.setState({
            isSearching: true
        });
        this.props.searchHandle(company1, company2)
            .then(()=>{
                this.setState({
                    isSearching: false
                })
            })
    }

    setCompanyInfo(name){
        return (infoObj) => {
            this.setState({
                [name]: infoObj
            })
        }
    }

    render() {
        let {isSearching} = this.state;
        return (
            <div className="container" style={{display: "flex"}}>
                <div style={{width:"50%"}}>
                    <MatchSearchComponent title="Keyword1" setCompanyInfo={this.setCompanyInfo.bind(this)("company1")}/>
                </div>
                <div id="doubleRelationship"/>
                <div style={{width:"50%"}}>
                    <MatchSearchComponent title="Keyword2" setCompanyInfo={this.setCompanyInfo.bind(this)("company2")}/>
                </div>
                <button id="search" className="button-primary" disabled={isSearching} onClick={this.search.bind(this)}>Search</button>
            </div>
        )
    }
}

export default DoubleSearch