import React from 'react'
import { withRouter } from 'react-router-dom'
import PullLoad from 'components/PullLoad'
import connect from 'connect'
import AllNone from 'components/NoneData/all-none'

const renderNewsItem = item => {
    if (item.images.length === 0) {
        return (
            <div>
                <h4>{item.title}</h4>
                <p className="wes-3">{item.intro}</p>
                <div className="df-sb item-meta">
                    <div className="small-box">
                        <span>{item.source}</span>
                        <span>璇勮锛?{item.comment}</span>
                        <span>{item.time}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (item.images.length === 1) {
        return (
            <div className="df-sb">
                <div className="item-l">
                    <h4>{item.title}</h4>
                    <p className="wes-2">{item.intro}</p>
                    <div className="df-sb item-meta">
                        <div className="small-box">
                            <span>{item.source}</span>
                            <span>璇勮锛?{item.comment}</span>
                        </div>
                    </div>
                </div>
                <div className="item-r">
                    <img src={item.images[0]} alt=""/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="item-t">
                <h4>{item.title}</h4>
                <p className="wes-1">{item.intro}</p>
            </div>
            <div className="item-b df-sb">
                {
                    item.images.map((img, index) => (
                        <img src={img} alt={img} key={index} style={{ width: item.images.length === 2 ? '40%' : '25%' }}/>
                    ))
                }
            </div>
            <div className="df-sb item-meta">
                <div className="small-box">
                    <span>{item.source}</span>
                    <span>璇勮锛?{item.comment}</span>
                </div>
            </div>
        </div>
    )
}

@connect
@withRouter
export default class extends React.Component {
    handleLoad () {
        const { type } = this.props

        if (type.source === 'local') {
            return Promise.resolve(type.list)
        }

        const { getRecordList, state: { record: { types, index } } } = this.props
        return getRecordList({ title: types[index].title })
    }

    handleRefresh () {
        const { type, syncRecordLists } = this.props

        if (type.source === 'local') {
            return syncRecordLists()
        }

        const { refreshRecordList, state: { record: { types, index } } } = this.props
        return refreshRecordList({ title: types[index].title })
    }

    removeItem (e, id) {
        e.stopPropagation()
        this.props.removeRecordByType({
            type: this.props.type.key,
            id
        })
    }

    getTipText () {
        const { type } = this.props
        const count = type.list.length

        if (type.key === 'favorite') {
            return `\u5df2\u6536\u85cf ${count} \u7bc7\u6587\u7ae0`
        }

        if (type.key === 'history') {
            return `\u6700\u8fd1\u8bfb\u8fc7 ${count} \u7bc7\u6587\u7ae0`
        }

        return `\u6628\u5929\u603b\u5171\u9605\u8bfb\u4e86 ${count} \u7bc7\u6587\u7ae0`
    }

    render () {
        const { type } = this.props
        const isLocalType = type.source === 'local'

        return (
            <section className="swiper-box">
                <p className="tip">{this.getTipText()}</p>
                <PullLoad
                    className="pullload-wrapper"
                    handleLoad={this.handleLoad.bind(this)}
                    handleRefresh={this.handleRefresh.bind(this)}
                    hasMore={!isLocalType}>
                    {
                        type.list.length > 0 ? (
                            <ul>
                                {
                                    type.list.map((item, index) => (
                                        <li key={index} className="item border-half-bottom" onClick={e => {
                                            this.props.history.slideStatus = 'left'
                                            this.props.history.push(`/article/${item.id}`)
                                        }}>
                                            {renderNewsItem(item)}
                                            {
                                                isLocalType ? (
                                                    <div className="item-actions">
                                                        <button className="item-remove" onClick={e => this.removeItem(e, item.id)}>
                                                            {type.key === 'favorite' ? '\u53d6\u6d88\u6536\u85cf' : '\u5220\u9664\u8bb0\u5f55'}
                                                        </button>
                                                    </div>
                                                ) : null
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <div className="record-empty">
                                <AllNone/>
                            </div>
                        )
                    }
                </PullLoad>
            </section>
        )
    }
}
