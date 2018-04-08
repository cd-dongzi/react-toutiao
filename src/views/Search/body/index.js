import React from 'react'
import PullLoad from 'components/PullLoad'
import {withRouter} from 'react-router-dom'
import connect from 'connect'
@connect
@withRouter
export default class extends React.Component {
    state = {
        keywordList: ['Easy-Mock', 'webpack', 'vue', 'Javascript'],
        pageindex: 1,
        keyword: ''
    }
    getSearchData (keyword) {
        const {getSearchList} = this.props
        const {pageindex} = this.state
        this.setState({
            keyword
        })
        getSearchList({
            keyword,
            pageindex
        })
    }
    handleLoad () {
        const {getSearchList} = this.props
        const {pageindex, keyword} = this.state
        return getSearchList({
            keyword,
            pageindex
        })
    }
    handleRefresh () {
        const {refreshSearchList} = this.props
        const {pageindex, keyword} = this.state
        return refreshSearchList({
            keyword,
            pageindex
        })
    }
    render () {
        const {keywordList} = this.state
        const {searchList, hasMore} = this.props.state.search
        return (
            <div className="search-body-wrapper">
                <div className="search-container">
                    {
                        searchList.length < 1 ? (
                            <div className="guess">
                                <div className="tip">猜你想搜的</div>
                                <ul className="search-menu border-half cf">
                                    {
                                        keywordList.map( (keyword, index) => (
                                            <li className="fl border-half" key={index} onClick={this.getSearchData.bind(this, keyword)}>{keyword}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : (
                            <PullLoad handleLoad={this.handleLoad.bind(this)} handleRefresh={this.handleRefresh.bind(this)} hasMore={hasMore}>
                                <div className="search-box">
                                    {
                                        searchList.map( (item, index) => (
                                            <section key={index} className="item border-half-bottom" onClick={e => {
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
                                            </section>
                                        ))
                                    }
                                </div>
                            </PullLoad>
                        )
                    }
                </div>
            </div>
        )
    }
}
