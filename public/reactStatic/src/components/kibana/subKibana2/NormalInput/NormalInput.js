import React from 'react'

const NormalInput = ({title, value, changeHandle}) => (
    <div className="form-group">
        <h5>{title}</h5>
        <input type="text" className="form-control" value={value}
               onChange={changeHandle}/>
    </div>
);

export default NormalInput
