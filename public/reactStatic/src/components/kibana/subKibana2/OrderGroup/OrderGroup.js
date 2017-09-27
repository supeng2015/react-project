import React from 'react'
import DownInputGroup from "../DownInputGroup/DownInputGroup";
import UpDownInputGroup from "../UpDownInputGroup/UpDownInputGroup";

class OrderGroup extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {index,data} = this.props;
        return (
            <div>
                <DownInputGroup title="Order By" data={data.orderBy}
                                changeHandle={(e)=>{this.props.changeHandle(index, 'orderBy', e.target.value)}}/>
                <div className="flex-box">
                    <div className="flex-box-half">
                        <DownInputGroup title="Order" data={data.order}
                                        changeHandle={(e)=>{this.props.changeHandle(index, 'order', e.target.value)}}/>
                    </div>
                    <div className="flex-box-half">
                        <UpDownInputGroup title="Size" data={data.size}
                                          changeHandle={(e)=>{this.props.changeHandle(index, 'size', e.target.value)}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderGroup