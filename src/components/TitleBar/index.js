import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon from 'components/Icon-svg'
import './index.less'
@withRouter
export default class extends React.Component {
    static propTypes = {
        title: PropTypes.string
    }
    static defaultProps = {
        title: '今日头条'
    }
    render () {
        return (
            <section className="title-bar-wrapper">
                <div className="head">
                    <Icon iconName="jiantou" className="back" onClick={this.props.history.goBack}></Icon>
                    <h2>{this.props.title}</h2>
                </div>
            </section>
        )
    }
}
