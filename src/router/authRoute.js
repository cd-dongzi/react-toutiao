import React from 'react'
import {withRouter} from 'react-router-dom'
import store from '../store'
import { Route, Redirect } from 'react-router-dom'
@withRouter
export default class extends React.Component {
    render () {
        let {component: Component, ...rest} = this.props
        let {history} = rest
        // 是否登录
        if (!store.getState().user.user.name) {
            history.slideStatus = 'top'
            return <Redirect to='/login' />
        }
        return <Route {...rest}  component={Component}/>
    }
}
