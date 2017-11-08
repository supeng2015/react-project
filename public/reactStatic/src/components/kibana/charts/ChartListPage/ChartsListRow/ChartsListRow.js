import React from 'react'
import ChartsListItem from "../ChartsListItem/ChartsListItem";

const ChartsListRow = ({title, chartLists})=>(
    <div className="chart-list-row-container">
        <h2>{title}</h2>
        <div className="chart-list-row">
            {
                chartLists.map((item, index) => {
                    return (
                        <ChartsListItem listName={item.name} listSrc={item.src} listHref={item.href}
                                        key={index}/>
                    )
                })
            }
        </div>
    </div>
);

export default ChartsListRow