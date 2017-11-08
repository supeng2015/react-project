import React from 'react'
import DropdownInputGroup from "../../kibana/subKibana2/DownInputGroup/DownInputGroup";

const Type = ({value, changeHandle, data})=>(
    <div className="type-container">
        <DropdownInputGroup title="Type" value={value} changeHandle={changeHandle} data={data}/>
    </div>
)

export default Type