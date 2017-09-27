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
                <FaPencil onClick={()=>{this.setState({hidden: false})}}/>
                <Close onClick={this.props.removeHandle(index)}/>
                <NormalInput title={this.props.data.name}
                             changeHandle={(e)=>{return this.props.changeValueHandle(e)}}/>
                <div className={this.state.hidden ? "f-dpnone" : ""}>
                    <input type="text" className="form-control" value={this.state.newName}
                           onChange={(e)=>this.setState({newName: e.target.value})}/>
                    <FaCheck onClick={this.submitName.bind(this)}/>
                    <Close onClick={this.closeInput.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default FilterInput