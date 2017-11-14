import React from 'react'
import config from "../../../config";

class MatchSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            showList: false
        }
    }

    debounceChange(){
        let timeFlag = null;
        return () => {
            clearTimeout(timeFlag);
            timeFlag = setTimeout(()=>{
                let keyword = this.refs.keyword.value;
                this.changeHandle(keyword);
            },1000)
        }
    }

    changeHandle(keyword){
        if(keyword){
            // 将公司名放入state中
            this.props.setCompanyInfo({_id: keyword});
            // 公司名模糊匹配
            fetch("http://" + config.nodejsIp + ":3000/matchCompany?id=" + keyword)
                .then((response)=>{
                    return response.json();
                })
                .then((res) => {
                    this.setState({
                        list: res
                    })
                })
        }else{
            this.setState({
                list: ""
            })
        }
    }

    // 点击提示后，将公司信息放入state
    selectItem(index, e){
        let keyword = this.refs.keyword;
        keyword.value = e.target.innerHTML;
        this.props.setCompanyInfo(this.state.list[index]);
        this.setState({
            list: ""
        })
    }

    showList(){
        setTimeout(()=>{
            this.setState({showList: true})
        },100)
    }

    hideList(){
        setTimeout(()=>{
            this.setState({showList:false})
        },100)
    }

    render() {
        let {list, showList} = this.state;
        let {title} = this.props;
        return (
            <div className="search-container">
                <div className="form-group">
                    <h5>{title}</h5>
                    <input type="text" className="form-control" ref="keyword"
                           onFocus={this.showList.bind(this)}
                           onBlur={this.hideList.bind(this)}
                           onChange={this.debounceChange.bind(this)()}/>
                </div>
                <ul className={showList ? "search-list" : "search-list f-dpnone"}>
                    {
                        list ? list.map((item, index)=>{
                            return <li key={index} onClick={this.selectItem.bind(this, index)}>{item._id}</li>
                        }): ""
                    }
                </ul>
            </div>
        )
    }
}

export default MatchSearchComponent