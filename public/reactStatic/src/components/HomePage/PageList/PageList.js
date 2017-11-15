import React from 'react'

class PageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
            listSize: 10,
            rows: 0
        }
    }

    clickHandle(nowPage){
        this.props.clickHandle(nowPage);
        this.setState({
            nowPage
        });
    }

    prePage(pageBegin){
        if(pageBegin !== 1){
            this.setState({
                rows: this.state.rows - 1,
            });
        }
    }

    nextPage(nowSize){
        let {listSize, rows} = this.state;
        let {totalPage} = this.props;
        let pageBegin = rows * listSize + 1;
        let pageEnd = pageBegin + listSize;

        if(nowSize === listSize && pageEnd < totalPage){
            this.setState({
                rows: rows + 1
            });
        }
    }

    forwardToPage(e){
        let nowPage = parseInt(e.target.value);
        let {totalPage} = this.props;
        if(e.keyCode === 13){
            if(Number.isNaN(nowPage)){
                alert("请输入数字页码！");
            }
            if(nowPage < 1){
                nowPage = 1;
                e.target.value = 1;
            }
            if(nowPage > totalPage){
                nowPage = totalPage;
                e.target.value = totalPage;
            }

            this.props.clickHandle(nowPage);
            this.setState({
                nowPage,
                rows: Math.floor((nowPage-1)/10)
            });
        }
    }

    render() {
        let {nowPage, listSize, rows} = this.state;
        let {totalPage} = this.props;
        // nowPage公式确定一下
        let pageBegin = rows * listSize + 1;
        let pageEnd = pageBegin + listSize;
        let nowSize = pageEnd <= totalPage ? listSize : totalPage - pageBegin + 1;
        return (
            totalPage ? <div className="page-list">
                <div className={pageBegin === 1 ? "page-list-pre forbidden" : "page-list-pre"} onClick={this.prePage.bind(this, pageBegin)}>←</div>
                {
                    new Array(nowSize).fill(0).map((item, index) => {
                        return <div className={pageBegin + index === nowPage ? "page-list-item active" : "page-list-item"}
                                    key={index} onClick={this.clickHandle.bind(this, pageBegin + index)}>{pageBegin + index}</div>
                    })
                }
                <div className={nowSize === listSize && pageEnd < totalPage ? "page-list-next" : "page-list-next forbidden"} onClick={this.nextPage.bind(this, nowSize)}>→</div>
                <div id="forwardInput">跳转到：<input type="text" onKeyUp={this.forwardToPage.bind(this)}/>页/共{totalPage}页</div>
            </div> : <div/>
        )
    }
}

export default PageList