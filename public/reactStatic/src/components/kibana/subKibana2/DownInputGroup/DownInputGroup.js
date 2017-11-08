import React from 'react'

const DropdownInputGroup = ({value, title, data, changeHandle})=>(
    <div className="form-group">
        <h5>{title}</h5>
        <select className="form-control" value={value}
                onChange={changeHandle}>
            {
                data.map((value, index)=>{
                    return <option value={value} key={index}>{value}</option>
                })
            }
        </select>
    </div>
);

export default DropdownInputGroup