import React from 'react'
import DropdownInputGroup from "../../kibana/subKibana2/DownInputGroup/DownInputGroup";

const Index = ({indexValue, changeHandle, data}) => (
    <div className="index-container">
        <DropdownInputGroup title="Index" value={indexValue} changeHandle={changeHandle} data={data}/>
    </div>
);

export default Index