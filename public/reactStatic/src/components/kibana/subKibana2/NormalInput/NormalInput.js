import React from 'react'

class NormalInput extends React.Component {
    render() {
        let {title, changeHandle} = this.props;
        return (
            <div className="form-group">
                <h5>{title}</h5>
                <input type="text" className="form-control"
                       onChange={changeHandle}/>
            </div>
        )
    }
}

export default NormalInput