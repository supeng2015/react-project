import React from 'react'

const UpDownInputGroup = ({title, value, changeHandle}) => (
    <div className="form-group">
        <h5>{title}</h5>
        <input type="number" className="form-control" min="0" value={value}
               onChange={changeHandle}/>
    </div>
);

export default UpDownInputGroup