import React from 'react'
import Icon from 'components/Icon-svg'
import SwitchCheck from 'components/Switch'
import TitleBar from 'components/TitleBar'
import { Local } from 'utils/storage'
import connect from 'connect'
import './index.less'
@connect
export default class extends React.Component {
    state = {
        info: {
            send: Local.get('system_send') || false,
            list: Local.get('system_list') || false
        }
    }
    save (attr, val) {
        let obj = this.state.info
        obj[attr] = val
        this.setState(obj)
        Local.set({
            system_send: this.state.info.send,
            system_list: this.state.info.list
        })
    }
    signOut () {
        const {signOut, setFooterList, history} = this.props
        this.props.signOut()
        setFooterList({title: '未登录', icon: 'account', path: '/account'})
        history.slideStatus = 'right'
        history.push('/account')
    }
    render () {
        const {info} = this.state
        return (
            <div className="system-wrapper">
                <TitleBar title="系统设置"/>
                <div className="box border-half">
                    <div className="li df-sb border-half-bottom">账号设置</div>
                    <div className="li df-sb border-half-bottom">账号和隐私设置</div>
                    <div className="li df-sb border-half-bottom">黑名单</div>
                </div>

                <div className="box border-half">
                    <div className="li df-sb border-half-bottom">清除缓存</div>
                    <div className="li df-sb border-half-bottom">
                        <span>字体大小</span>
                        <Icon iconName="arrow"></Icon>
                    </div>
                    <div className="li df-sb border-half-bottom">
                        <span>列表显示摘要</span>
                        <SwitchCheck checked={info.list} handleInput={val => {this.save('list',val)}}></SwitchCheck>
                    </div>
                    <div className="li df-sb border-half-bottom">
                        <span>非wifi网络流量</span>
                        <small>最佳效果（下载大图）</small>
                    </div>
                    <div className="li df-sb border-half-bottom">
                        <span>非wifi网络播放提醒</span>
                        <small>提醒一次</small>
                    </div>
                    <div className="li df-sb border-half-bottom">
                        <span>推送通知</span>
                        <SwitchCheck checked={true} handleInput={val => {this.save('send',val)}}></SwitchCheck>
                    </div>
                </div>

                <div className="box border-half">
                    <div className="li df-sb border-half-bottom">
                        <span>头条封面</span>
                        <Icon iconName="arrow"></Icon>
                    </div>
                    <div className="li df-sb border-half-bottom">
                        <span>当前版本</span>
                        <Icon iconName="arrow">6.5.1</Icon>
                    </div>
                </div>
                

                <div className="box esc" onClick={this.signOut.bind(this)}>退出登录</div>
                
            </div>
        )
    }
}