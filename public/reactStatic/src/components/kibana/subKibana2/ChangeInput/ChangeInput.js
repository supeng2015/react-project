import React from 'react'

const ChangeInput = ({title, nowType, changeHandle, data}) => (
    <div className="form-group">
        <h5>{title}</h5>
        <select className="form-control" value={nowType} onChange={changeHandle}>
            {
                data.map((value, index)=>{
                    return <option value={value} key={index}>{value}</option>
                })
            }
        </select>
    </div>
);

export default ChangeInput