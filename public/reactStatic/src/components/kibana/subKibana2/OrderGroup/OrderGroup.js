import React from 'react'
import DownInputGroup from "../DownInputGroup/DownInputGroup";
import UpDownInputGroup from "../UpDownInputGroup/UpDownInputGroup";

const OrderGroup = ({index, data, value, changeHandle}) => (
    <div>
        <DownInputGroup title="Order By" data={data.orderBy} value={value.orderBy}
                        changeHandle={(e)=>{changeHandle(index, 'orderBy', e.target.value)}}/>
        <div className="flex-box">
            <div className="flex-box-half">
                <DownInputGroup title="Order" data={data.order} value={value.order}
                                changeHandle={(e)=>{changeHandle(index, 'order', e.target.value)}}/>
            </div>
            <div className="flex-box-half">
                <UpDownInputGroup title="Size" data={data.size} value={value.size}
                                  changeHandle={(e)=>{changeHandle(index, 'size', e.target.value)}}/>
            </div>
        </div>
    </div>
) ;

export default OrderGroup