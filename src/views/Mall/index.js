import React from 'react'
import Icon from 'components/Icon-svg'
import TitleBar from 'components/TitleBar'
import './index.less'
export default class extends React.Component {
	state = {
		headList: [
			{title: '邀请有礼'},
			{title: '卡包'},
			{title: '免流量服务'},
			{title: '今日特卖'},
			{title: '火车票'},
			{title: '股票'},
			{title: '我的订单'},
			{title: '我的交易'}
		]
	}
    render () {
        return (
    	    <div className="record-wrapper">
    	        <TitleBar title="头条商城"></TitleBar>
    			
    			<div className="recommend">
    				<h4>精选推荐</h4>
    				<div className="recommend-box df-sb">
    					<div className="item">
    						<h5>放心购</h5>
    						<span>放心买好货</span>
    					</div>
    					<div className="item">
    						<h5>火车票</h5>
    						<span>春运抢票</span>
    					</div>
    				</div>
    			</div>
    			<div className="box border-half">
    				<h4>头条服务</h4>
    				{
    					this.state.headList.map((v, i) => (
		    	            <div className="li df-sb border-half-bottom" key={i}>
		    	                <span>{v.title}</span>
		    	                <Icon iconName="arrow"></Icon>
		    	            </div>
    					))
    				}
    	        </div>
    	        <div className="tip">客服电话服务工作时间：看心情</div>
    	    </div>
        )
    }
}
