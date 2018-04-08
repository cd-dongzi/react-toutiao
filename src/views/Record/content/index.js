import React from 'react'
import {withRouter} from 'react-router-dom'
import PullLoad from 'components/PullLoad'
import connect from 'connect'
@connect
@withRouter
export default class extends React.Component {
    state = {
        hasMore: true
    }
    handleLoad () {
        const {getRecordList, state: {record: {types, index: i}}} = this.props
        const {title} = types[i]
        return getRecordList({title})
    }
    handleRefresh () {
        const {refreshRecordList, state: {record: {types, index: i}}} = this.props
        const {title} = types[i]
        return refreshRecordList({title})
    }
    render () {
        const {type, className} = this.props
        return (
            <section className={`swiper-box ${className}`}>
                <p className="tip">昨天总共阅读了{type.list.length || 0}篇文章</p>
                <PullLoad className="pullload-wrapper" handleLoad={this.handleLoad.bind(this)} handleRefresh={this.handleRefresh.bind(this)} hasMore={this.state.hasMore}>
                    <ul>
                        {
                            type.list.map((item, i) => (
                                <li key={i} className="item border-half-bottom"  onClick={e => {
                                    this.props.history.slideStatus = 'left'
                                    this.props.history.push(`/article/${item.id}`)
                                }}>
                                    {
                                        item.images.length === 0 ? (
                                            <div>
                                                <h4>{item.title}</h4>
                                                <p className="wes-3">{item.intro}</p>
                                                <div className="df-sb">
                                                    <div className="small-box">
                                                        <span>{item.source}</span>
                                                        <span>评论：{item.comment}</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : item.images.length === 1 ? (
                                            <div className="df-sb">
                                                <div className="item-l">
                                                    <h4>{item.title}</h4>
                                                    <p className="wes-2">{item.intro}</p>
                                                    <div className="df-sb">
                                                        <div className="small-box">
                                                            <span>{item.source}</span>
                                                            <span>评论：{item.comment}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-r">
                                                    <img src={item.images[0]} alt=""/>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="item-t">
                                                    <h4>{item.title}</h4>
                                                    <p className="wes-1">{item.intro}</p>
                                                </div>
                                                <div className="item-b df-sb">
                                                    {
                                                        item.images.map( (img, i) => (
                                                            <img src={img} alt={img} key={i} style={{width: item.images.length === 2 ? '40%':'25%'}}/>
                                                        ))
                                                    }
                                                </div>
                                                <div className="df-sb">
                                                    <div className="small-box">
                                                        <span>{item.source}</span>
                                                        <span>评论：{item.comment}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </PullLoad>
            </section>
        )
    }
}