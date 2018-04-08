import React from 'react'
import Icon from 'components/Icon-svg'
import './index.less'
import connect from 'connect'
import { news } from 'reducers/data'

@connect
export default class extends React.Component {
    render () {
        const {state: {home:{newsList}}, delNews, addNews, className, closeBox} = this.props
        const allNewsList = news.filter( news => {
            return !newsList.some( v => news.title === v.title)
        }) 
        return (
            <div className={`top-bar-box ${className}`}>
                <div className="close" onClick={closeBox}><Icon iconName="close"></Icon></div>
                <div className="self-box">
                    <div className="title df-sb">
                        <div className="title-l">
                            <span>我的频道</span>
                            <small>点击删除以下频道</small>
                        </div>
                    </div>
                    <ul className="cf">
                        {
                            newsList.map((news, index) => (
                                <li className="fl" key={index} onClick={() => {delNews(news)}}>
                                    <a href="javascript:;">{news.title}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="recommend-box">
                    <div className="title df-sb">
                        <div className="title-l">
                            <span>推荐频道</span>
                            <small>点击添加以下频道</small>
                        </div>
                    </div>
                    <ul className="cf">
                        {
                            allNewsList.map((news, index) => (
                                <li className="fl" key={index} onClick={() => {addNews(news)}}>
                                    <a href="javascript:;">{news.title}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
