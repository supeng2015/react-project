import React from 'react'

class NormalInput extends React.Component {
    render() {
        let {title, changeHandle,value} = this.props;
        return (
            <div className="form-group">
                <h5>{title}</h5>
                <input type="text" className="form-control" value={value}
                       onChange={changeHandle}/>
            </div>
        )
    }
}

export default NormalInput