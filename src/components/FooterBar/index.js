import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Icon from 'components/Icon-svg'
import './index.less'
import connect from 'connect'
@connect
@withRouter
export default class extends React.Component {
    skipView = path => {
        this.props.history.push(path)
    }
    render () {
        const {location: {pathname}, state: {user: {footerBarList}}} = this.props
        return (
            <footer className="df-c border-half-top footerbar-wrapper">
                <ul className="cf">
                    {
                        footerBarList.map( (item, index) => (
                            <li key={index} className={item.path === pathname ? 'active':''} onClick={this.skipView.bind(this, item.path)}>
                                <Icon iconName={item.icon}></Icon>
                                <div>{item.title}</div>
                            </li>
                        ))
                    }
                </ul>
            </footer>
        )
    }
}