import React from 'react'
import PullLoad from 'components/PullLoad'
import Icon from 'components/Icon-svg'
import './index.less'
import connect from 'connect'
@connect
export default class extends React.Component {
    state = {
        hasMore: true,
        pageindex: 1
    }
    componentWillMount () {
        const {getVideoList, state: {video: {hasMore}}} = this.props
        if (!hasMore) return
        getVideoList({
            pageindex: this.state.pageindex
        })
    }
    handleRefresh () {
        this.setState({
            pageindex: 1
        })
        return this.props.refreshVideoList({
            pageindex: 1
        })
    }
    handleLoad () {
        let {pageindex} = this.state
        pageindex ++
        this.setState({
            pageindex 
        })
        return this.props.getVideoList({
            pageindex
        })
    }
    // canvas 绘制
    dragVideo (index) {
        let video = document.querySelectorAll('video')[index],
            ctx = document.querySelectorAll('canvas')[index].getContext('2d')
        video.play()
        let fps = 1000/30,
            w = document.querySelectorAll('.video')[index].clientWidth,
            h = document.querySelectorAll('.video')[index].clientHeight

        video.addEventListener('play', () => {
            setInterval( () => {
                ctx.drawImage(video, 0, 0, 320, 176);
            }, fps)
        })
    }
    // 播放
    play (index, item) {
        item.playBol = true
        this.dragVideo(index)
        // 添加playBol属性,重新渲染
        this.props.renderVideoList()
    }
    // 暂停
    pause (index, item) {
        if (!item.playBol) return
        document.querySelectorAll('video')[index].pause()
        this.attrReverse(item, 'playBol')
    }
    //属性置反
    attrReverse (item, attr) {
        item[attr] = !item[attr]
        this.props.renderVideoList()
    }
    render () {
        const {videoList, hasMore} = this.props.state.video
        return (
            <PullLoad handleLoad={this.handleLoad.bind(this)} handleRefresh={this.handleRefresh.bind(this)} hasMore={hasMore}>
                <article className="video-wrapper">
                    <div className="video-container">
                        {
                            videoList.map( (item, index) => (
                                <section className="item border-half-bottom" key={index}>
                                    <div className="video">
                                        <video src={item.video}></video>

                                        
                                        <div className="canvas-video bg-cover" style={{backgroundImage: `url(${item.images})`}}>
                                            <canvas onClick={e => {this.pause(index, item)}}></canvas>
                                        </div>
                                        {
                                            !item.playBol ? (
                                                <div className="title">
                                                    <h4>{item.title}</h4>
                                                    <small>{item.video_num}次播放</small>
                                                </div>
                                            ) : ''
                                        }
                                        {
                                            !item.playBol ? (
                                                <div className="play" onClick={e => {this.play(index, item)}}>
                                                    <Icon iconName="play"></Icon>
                                                </div>
                                            ) : ''
                                        }
                                        {!item.playBol ? <time>{item.time}</time> : ''}
                                        {!item.playBol ? <div className="avatar bg-cover-all" style={{backgroundImage: `url(${item.image})`}}></div> : ''}
                                    </div>
                                    <div className="intro df-sb">
                                        <div className="source">{item.source}</div>
                                        <div className="box df-c">
                                            <div onClick={e => {this.attrReverse(item, 'attention')}}>
                                                {
                                                    item.attention ? <div>已关注</div> : (
                                                        <div>
                                                            <Icon iconName="attention"></Icon>
                                                            <span>关注</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <Icon iconName="custom-comment"></Icon>
                                                <span>{item.comment_num || '评论'}</span>
                                            </div>
                                            <div>
                                                <Icon iconName="More"></Icon>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            ))
                        }
                    </div>
                </article>
            </PullLoad>
        )
    }
} 