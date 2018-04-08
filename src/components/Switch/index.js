import React from 'react'
import './index.less'
export default class extends React.Component {
    state = {
        checked: false
    }
    componentWillMount () {
        this.setState({
            checked: this.props.checked
        })
    }
    toggle () {
        this.setState({
            checked: !this.state.checked
        }, () => {
            const {handleInput} = this.props
            handleInput && handleInput(this.state.checked)
        })
    }
    render () {
        return (
            <div className="switch-wrapper">
                <label><input className="mui-switch mui-switch-anim" type="checkbox" checked={this.state.checked} ref="obj" readOnly  onClick={this.toggle.bind(this)}/></label>
            </div>
        )
    }
}