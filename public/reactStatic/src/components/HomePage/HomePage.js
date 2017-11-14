import React from 'react'
import {connect} from 'react-redux';
import Table from "./Table/Table";
import './HomePage.scss'
import {updateContent} from "../../actions/index";
import PageList from "./PageList/PageList";
import config from "../../config";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preItem: 'default',
            preSort: 'default'
        }
    }

    // http请求，获取content
    fetchContent(nowPage) {
        let {indexArray, typeValue} = this.props.indexType;
        return new Promise((resolve, reject) => {
            fetch('http://' + config.nodejsIp + ':3000/getAllData?indexes=' + indexArray.toString() + '&type=' + typeValue + '&page=' + nowPage)
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    if (res.status !== 'error') {
                        this.props.updateContent(res);
                        resolve();
                    } else {
                        alert("获取Content网络错误");
                        reject();
                    }
                })
        })
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
            }else{
                this.setState({preSort: 'asc'});
                newContent = this.sortASCFunction(this.props.content, sortItem);
            }
        }
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
        let {content} = this.props;
        return (
            <div className="table-container">
                <Table data={content.content} sortHandle={this.sortTable.bind(this)}/>
                <PageList totalPage={content.totalPage} clickHandle={this.fetchContent.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content,
        indexType: state.indexType
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