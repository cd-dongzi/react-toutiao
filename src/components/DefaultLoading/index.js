import React from 'react'
import PropTypes from 'prop-types'
import './index.less'

class DefaultLoading extends React.Component{
    static propTypes = {
        show: PropTypes.bool
    }
    static defaultProps = {
        show: false
    }
    render () {
        let doms = []
        for (var i = 0; i < 12; i++) {
            doms.push(<div className="toast-loading-leaf" key={i} style={{transform: `rotate(${30*i}deg) translate(7.92px)`, animationDelay: i*0.1+'s'}}></div>)
        }
        return this.props.show ? (
            <div className="loading-wrapper-phone">
                <div className="toast toast-loading">
                    <div className="toast-loading-wrap">
                       {doms} 
                    </div>
                    <p>数据加载中</p>
                </div>
            </div>
        ) : ''
    }
} 

export default DefaultLoading