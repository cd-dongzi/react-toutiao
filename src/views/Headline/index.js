import React from 'react'
import {withRouter} from 'react-router-dom'
import PullLoad from 'components/PullLoad'
import Icon from 'components/Icon-svg'
import TopBar from './topBar'
import connect from 'connect'
import './index.less'

@connect
export default class extends React.Component {
	state = {
        pageindex: 1
    }
	componentWillMount () {
        const {getHeadlineList, state: {headline: {hasMore}}} = this.props
        if (!hasMore) return
	    this.props.getHeadlineList({
	        pageindex: this.state.pageindex
	    })
	}
	handleRefresh () {
        this.setState({
            pageindex: 1
        })
        return this.props.refreshHeadlineList({
            pageindex: 1
        })
    }
    handleLoad () {
        let {pageindex} = this.state
        pageindex ++
        this.setState({
            pageindex 
        })
        return this.props.getHeadlineList({
            pageindex
        })
    }
	// 点赞
    likeNum (item) {
        item.islike = !item.islike
        if (item.islike) {
            item.like_num ++
        }else{
            item.like_num --
        } 
        this.props.renderHeadlineList()
    }
    //属性置反
    attrReverse (item, attr) {
        item[attr] = !item[attr]
        this.props.renderHeadlineList()
    }
    render () {
    	const {headline: {headlineList, hasMore}} = this.props.state
    	return (

			<article className="headline-wrapper">
		        <section>
		            <TopBar></TopBar>
		        </section>
			    <div className="header-container">
	    			<PullLoad handleLoad={this.handleLoad.bind(this)} handleRefresh={this.handleRefresh.bind(this)} hasMore={hasMore}>
    			        <div className="header-box">
    			        	{
    			        		headlineList.map( (item, index) => (
    								<section className="item border-half-top" key={index}>
    								    <div className="item-t df-sb">
    								        <div className="item-t-l">
    								            <div className="avatar bg-cover-all" style={{backgroundImage: `url(${item.avatar})`}}></div>
    								            <div className="info">
    								                <div className="name">{item.name}</div>
    								                <div className="info-box">
    								                    <time>{item.time}小时以前</time> ·
    								                    <span>{item.tag}</span>
    								                </div>
    								            </div>
    								        </div>
    								        <div className="item-t-r" onClick={this.attrReverse.bind(this,item,'attention')}>
    								        	{
    								        		item.attention ? <span className="like-y">已关注</span> :
    								        			<span className="like-n">关注</span>
    								        	}
    								        </div>
    								    </div>
    								    <div className="item-m" onClick={e => {
                                            this.props.history.slideStatus = 'left'
                                            this.props.history.push(`/article/${item.id}`)
                                        }}>
    								        <p>{item.intro}</p>
    								        <div className="images">
    								        	{item.images.map( (img, index) => (<img key={index} src={img} className={item.images.length > 2 ? 'three':item.images.length === 2 ? 'two':'one'}/>))}
    								        </div>
    								        <span>{item.read_num}阅读</span>
    								    </div>
    								    <div className="item-b df-c">
    								        <div className="item-b-icon df-c">
    								            <Icon iconName="exchangejiaohuan"></Icon>
    								            <span>{item.opinion_num}</span>
    								        </div>
    								        <div className="item-b-icon df-c">
    								            <Icon iconName="comment"></Icon>
    								            <span>{item.comment_num}</span>
    								        </div>
    								        <div className={`item-b-icon df-c ${item.islike ? 'item-b-icon-active':''}`} onClick={this.likeNum.bind(this,item)}>
    								            <Icon iconName="zan"></Icon>
    								            <span>{item.like_num}</span>
    								        </div>
    								    </div>
    								</section>
    			        		))
    			        	}
    			            
    			        </div>
		    		</PullLoad>
			    </div>
			</article>
    	)
    }
}
