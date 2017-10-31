import React from 'react'
import FromToInput from './FromToInput'
import MaskInput from './MaskInput'

class FromToInputNumChange extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isChange: false,
            first: "Use CIDR Masks",
            second: "Use From/To"
        }
    }

    changeMod(){
        let {index} = this.props;
        if(!this.state.isChange){
            this.setState({
                isChange: true,
            });
            this.props.changeHandle(index, 'ranges', [{from:0,to:0}])
        }else{
            this.setState({
                isChange: false,
            });
            this.props.changeHandle(index, 'mask', [""])
        }

    }

    render() {
        let {index} = this.props;
        let {isChange,first,second} = this.state;
        return (
            <div>
                <button onClick={this.changeMod.bind(this)}>{isChange ? second : first}</button>
                {
                    this.state.isChange
                    ? <MaskInput index={index} name="mask"/>
                    : <FromToInput index={index} name="ranges"/>
                }
            </div>
        )
    }
}

export default FromToInputNumChange