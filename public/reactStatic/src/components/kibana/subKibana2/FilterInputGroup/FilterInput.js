import React from 'react'
import NormalInput from "../NormalInput/NormalInput";
import Close from 'react-icons/lib/fa/close'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaCheck from 'react-icons/lib/fa/check'

class FilterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            newName: ''
        }
    }

    submitName(){
        this.props.changeNameHandle(this.state.newName);
        this.setState({
            hidden: true,
            newName: ''
        })
    }

    closeInput(){
        this.setState({
            hidden: true,
            newName: ''
        })
    }

    render() {
        const {index} = this.props;
        return (
            <div>
                <Close className="f-fr button-icon button-right button-warning" onClick={this.props.removeHandle(index)}/>
                <FaPencil className="f-fr button-icon button-left button-normal" onClick={()=>{this.setState({hidden: false})}}/>
                <NormalInput title={this.props.data.name}
                             changeHandle={(e)=>{return this.props.changeValueHandle(e)}}/>
                <div className={this.state.hidden ? "flex-box f-dpnone" : "flex-box"}>
                    <input type="text" className="form-control" value={this.state.newName} style={{flex: "10 1 auto"}}
                           onChange={(e)=>this.setState({newName: e.target.value})}/>
                    <FaCheck className="button-icon button-correct" style={{flex: "auto"}} onClick={this.submitName.bind(this)}/>
                    <Close className="button-icon button-warning" style={{flex: "auto"}} onClick={this.closeInput.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default FilterInput