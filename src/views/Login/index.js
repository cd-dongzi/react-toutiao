import React from 'react'
import Icon from 'components/Icon-svg'
import {withRouter, Redirect} from 'react-router-dom'
import './index.less'
import connect from 'connect'
@connect
@withRouter
export default class extends React.Component {
    state = {
        username: '',
        username_msg: '',
        password: '',
        password_msg: ''
    }
    login = async () => {
        const {username, password} = this.state
        let username_msg, 
            password_msg
        if (!username) {
            username_msg = '请输入用户名'
        }
        if (username_msg) {
            this.setState({ username_msg })
            return
        }

        if (!password) {
            password_msg = '请输入密码'
        }
        if (password_msg) {
            this.setState({ password_msg })
            return
        }

        const {login, history, setFooterList} = this.props
        try {
            await login({
                username,
                password
            })
            setFooterList({title: '我的', icon: 'account1', path: '/account'})
            history.slideStatus = 'bottom'
            history.goBack()
        }catch (e) {}
        
    }
    hangleInput1 (value) {
        this.setState({
            username: value
        })
    }
    hangleInput2 (value) {
        this.setState({
            password: value
        })
    }
    render () {
        const {username_msg, password_msg} = this.state
        // if (this.props.state.user.user.name) return <Redirect to='/'/>
        return (
            <div className="login-wrapper">
                <div className="close" onClick={e => {
                    this.props.history.slideStatus = 'bottom'
                    this.props.history.goBack()
                }}>
                    <Icon iconName="close"/>
                </div>
                <h2>登陆你的头条，精彩永不消失</h2>
                <div className="input username">
                    <input type="text" placeholder="用户名随便填" value={this.state.username} onChange={e => {this.hangleInput1(e.target.value)}}/>
                    <span className={username_msg ? 'animate':''}>{username_msg}</span>
                </div>
                <div className="input password">
                    <input type="password" placeholder="密码: 123456" value={this.state.password} onChange={e => {this.hangleInput2(e.target.value)}}/>
                    <span className={password_msg ? 'animate':''}>{password_msg}</span>
                </div>
                <button className="login" onClick={this.login.bind(this)}>进入头条</button>
            </div>
        )
    }
}
