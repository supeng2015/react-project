import React from 'react'

class TabComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    tabBtnClick(nowIndex){
        this.props.tabBtnClick(nowIndex);
    }

    render() {
        let {currentTab, tabItem} = this.props;
        return (
            <div>
                <div className="tabBtn">
                    {
                        this.props.children.map((item, index) => {
                            return <button className={index === currentTab ? "button-primary" : "button-normal"} key={index}
                                           onClick={this.tabBtnClick.bind(this, index)}>{tabItem[index]}</button>
                        })
                    }
                </div>
                <div className="tabItem">
                    {
                        this.props.children.map((item, index)=> {
                            if(index === currentTab){
                                return item;
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TabComponent