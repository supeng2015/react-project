import React from 'react'
import {connect} from 'react-redux';
import Table from "./Table/Table";
import './HomePage.scss'
import {updateContent} from "../../actions/index";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preItem: 'default',
            preSort: 'default'
        }
    }

    sortTable(e) {
        let sortItem = e.target.innerHTML;
        let newContent = null;
        if(this.state.preItem === 'default' || this.state.preItem !== sortItem){
            this.setState({
                preItem: sortItem,
                preSort: 'asc'
            });
            newContent = this.sortASCFunction(this.props.content, sortItem);
        }else{
            if(this.state.preSort === 'asc'){
                this.setState({preSort: 'desc'});
                newContent = this.sortDESCFunction(this.props.content, sortItem);
                console.log(1111);
            }else{
                this.setState({preSort: 'asc'});
                newContent = this.sortASCFunction(this.props.content, sortItem);
                console.log(2222);
            }
        }
        // console.log(newContent);
        this.props.updateContent(newContent);
    }

    sortASCFunction(initArray, sortItem) {
        let result = [];
        result[0] = initArray[0];
        let sortArray = initArray.slice(1);
        sortArray = sortArray.sort(function (a,b) {
            if(typeof a[sortItem] !== 'number'){
                return a[sortItem].localeCompare(b[sortItem]);
            }else{
                return a[sortItem] - b[sortItem];
            }
        });
        return result.concat(sortArray);
    }

    sortDESCFunction(initArray, sortItem) {
        let result = [];
        result[0] = initArray[0];
        let sortArray = initArray.slice(1);
        sortArray = sortArray.sort(function (a,b) {
            if(typeof a[sortItem] !== 'number'){
                return b[sortItem].localeCompare(a[sortItem]);
            }else{
                return b[sortItem] - a[sortItem];
            }
        });
        return result.concat(sortArray);
    }

    render() {
        return (
            <div className="table-container">
                <Table data={this.props.content} sortHandle={this.sortTable.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateContent: (contentObj) => {
            dispatch(updateContent(contentObj));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)