import React from 'react'

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    defaultSort(){
        return;
    }

    defaultClick(){
        return ()=>{
            return;
        };
    }

    render() {
        let {data} = this.props;
        let sortHandle = this.props.sortHandle || this.defaultSort;
        let clickHandle = this.props.clickHandle || this.defaultClick;
        let hasTHeader = this.props.hasTHeader !== false;

        let keys = data ? data[0] : "";

        function generateTD(row) {
            let result = [];
            for (let i = 0; i < keys.length; i++) {
                result.push(<td key={i} onClick={clickHandle(i)}>{row[keys[i]]}</td>);
            }
            return result;
        }

        function generateTDNoHead(row) {
            let result = [];
            for (let key in row) {
                if(row.hasOwnProperty(key)){
                    result.push(<td key={key}>{row[key]}</td>);
                }
            }
            return result;
        }

        return (
            <table>
                {
                    hasTHeader ?
                    <thead>
                        <tr onClick={sortHandle}>
                            {
                                data && data[0] ? data[0].map((item, index) => {
                                    return <th key={index}>{item}</th>
                                }) : ""
                            }
                        </tr>
                    </thead> : <thead/>
                }
                <tbody>
                {
                    data && data[0] ?
                        hasTHeader ?
                            data.map((row, index) => {
                                if (index !== 0) {
                                    return (
                                        <tr key={index} onClick={clickHandle}>
                                            {generateTD(row)}
                                        </tr>
                                    )
                                }
                            }) : data.map((row, index) => {
                                return (
                                    <tr key={index} onClick={clickHandle(index)}>
                                        {generateTDNoHead(row)}
                                    </tr>
                                )
                            })
                        : ""
                }
                </tbody>
            </table>
        )
    }
}

export default Table