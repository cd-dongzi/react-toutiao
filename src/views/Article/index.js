import React from 'react'
import Icon from 'components/Icon-svg'
import CircleLoading from 'components/CircleLoading'
import connect from 'connect'
import './index.less'

@connect
export default class extends React.Component {
    state = {
        loading: false
    }

    componentDidMount () {
        this.initArticle(this.props)
    }

    componentDidUpdate (prevProps) {
        const prevId = prevProps.match.params.id
        const currentId = this.props.match.params.id

        if (`${prevId}` !== `${currentId}`) {
            this.initArticle(this.props)
        }
    }

    async initArticle (props) {
        const {
            match: { params: { id } },
            getArticle,
            addHistoryRecord,
            state: { common: { articleInfo } }
        } = props

        if (`${articleInfo.id}` === `${id}`) {
            addHistoryRecord(articleInfo)
            return
        }

        this.setState({
            loading: true
        })

        const article = await getArticle({ id })
        addHistoryRecord(article)

        this.setState({
            loading: false
        })
    }

    likeNum (info) {
        info.islike = !info.islike
        if (info.islike) {
            info.like_num++
        } else {
            info.like_num--
        }
        this.props.renderHeadlineList()
    }

    attrReverse (info, attr) {
        info[attr] = !info[attr]
        this.props.renderArticle()
    }

    toggleFavoriteRecord () {
        const { articleInfo } = this.props.state.common
        if (!articleInfo.id) return
        this.props.toggleFavoriteRecord(articleInfo)
    }

    render () {
        const { articleInfo } = this.props.state.common
        const favoriteList = this.props.state.record.types[0].list
        const isCollected = favoriteList.some(item => `${item.id}` === `${articleInfo.id}`)

        return (
            <article className="article-wrapper">
                <div className="head df-sb border-half-bottom">
                    <div onClick={e => { this.props.history.goBack() }}>
                        <Icon iconName="jiantou"></Icon>
                    </div>
                    <Icon iconName="More"></Icon>
                </div>
                {
                    !this.state.loading ? (
                        <div>
                            <h2>ID: {articleInfo.id}</h2>
                            <h2>{articleInfo.title}</h2>
                            <div className="info df-sb">
                                <div className="info-a">
                                    <div className="avatar bg-cover-all" style={{ backgroundImage: `url(${articleInfo.avatar})` }}></div>
                                    <div>
                                        <h6>{articleInfo.source}</h6>
                                        <time>{articleInfo.time}\u5c0f\u65f6\u524d</time>
                                    </div>
                                </div>
                                <div
                                    className={`like-box ${articleInfo.attention ? 'like-n border-half' : 'like-y'}`}
                                    onClick={e => { this.attrReverse(articleInfo, 'attention') }}>
                                    {articleInfo.attention ? '\u5df2\u5173\u6ce8' : '\u5173\u6ce8'}
                                </div>
                            </div>
                            <p className="intro">{articleInfo.intro}</p>
                            <div className="tags">
                                {
                                    articleInfo.tags && articleInfo.tags.map((tag, index) => (
                                        <div className="tag" key={index}>{tag}</div>
                                    ))
                                }
                            </div>
                            <div className="like-container df-sa">
                                <div className={`like df-c ${articleInfo.islike ? 'like-y' : ''}`} onClick={e => { this.likeNum(articleInfo) }}>
                                    <Icon iconName="zan"></Icon>
                                    <span>{articleInfo.like_num}</span>
                                </div>
                                <div className={`like df-c ${isCollected ? 'like-y favorite-active' : ''}`} onClick={this.toggleFavoriteRecord.bind(this)}>
                                    <Icon iconName="shoucang"></Icon>
                                    <span>{isCollected ? '\u5df2\u6536\u85cf' : '\u6536\u85cf'}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading-wrapper df-c">
                            <CircleLoading/>
                        </div>
                    )
                }

            </article>
        )
    }
}
