import React from 'react'
import Icon from 'components/Icon-svg'
import './index.less'
import {withRouter} from 'react-router-dom'
@withRouter
export default class extends React.Component {
    render () {
        return (
            <div className="headerbar-wrapper df-sb">
                <div className="logo df-c">
                    <img src={require('assets/images/logo.png')} alt="LOGO"/>
                </div>
                <div className="search">
                    <Icon iconName="2fangdajing" className="search-icon"></Icon>
                    <input type="text" placeholder="搜索些啥呢..." readOnly onClick={e => {
                        this.props.history.slideStatus = 'left'
                        this.props.history.push(`/search`)
                    }}/>
                </div>
            </div>
        )
    }
}