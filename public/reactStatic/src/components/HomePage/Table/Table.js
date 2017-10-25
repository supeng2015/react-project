import React from 'react'

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        let keys = data ? data[0] : "";

        function generateTD(row) {
            let result = [];
            for (let i = 0; i < keys.length; i++) {
                result.push(<td key={i}>{row[keys[i]]}</td>);
            }
            return result;
        }

        return (
            <table>
                <thead>
                <tr onClick={this.props.sortHandle}>
                    {
                        data && data[0] ? data[0].map((item, index) => {
                            return <th key={index}>{item}</th>
                        }) : ""
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data && data[0] ? data.map((rows, index) => {
                        if (index !== 0) {
                            return (
                                <tr key={index}>
                                    {generateTD(rows)}
                                </tr>
                            )
                        }
                    }) : ""
                }
                </tbody>
            </table>
        )
    }
}

export default Table