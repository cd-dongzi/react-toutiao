import React from 'react'
import {Route, Switch, Redirect, HashRouter} from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import {routes, loyoutRouterMap, notLoyoutRouterMap} from './config'
import Loyout from 'src/App'
import GlobalComponents from 'components/GlobalComponents'
import { css } from 'glamor'
import AuthRoute from './authRoute'
const renderRouteComponent = routes => routes.map( (route, index) => {
    // if (route.auth) { 
    //     return <AuthRoute key={index} {...route}/>
    // } else {    
    //     return <Route key={index} {...route}/>
    // }
    return <Route key={index} {...route}/>
})
const NotLoyoutRouter = renderRouteComponent(notLoyoutRouterMap)
const LoyoutRouter = renderRouteComponent(loyoutRouterMap)

const pageTransitionsFn = status => {
    let obj = {}
    if (status === 'left' || status === 'top') {
        obj = {
            atEnter: {offset: 100, opacity: 0},
            atLeave: {offset: -100, opacity: 0},
            atActive: {offset: 0, opacity: 1}
        }
    }else if (status === 'right' || status === 'bottom'){
        obj = {
            atEnter: {offset: -100, opacity: 0},
            atLeave: {offset: 100, opacity: 0},
            atActive: {offset: 0, opacity: 1}
        }
    }else{
        obj = {
            atEnter: {offset: 0, opacity: 1},
            atLeave: {offset: 0, opacity: 1},
            atActive: {offset: 0, opacity: 1}
        }
    }
    return obj
}
const mapStyleFn = status => styles => {
    let obj = {}
    if (status === 'left' || status === 'right') {
        obj = { transform: `translateX(${styles.offset}%)`, opacity: styles.opacity }
    }else if (status === 'top' || status === 'bottom'){
        obj = { transform: `translateY(${styles.offset}%)`, opacity: styles.opacity }
    }
    return obj
}
const wrapperRule = css `
    width: '100%';
    height: '100%'; 
    position: 'absolute';
    left:0;
    top:0;
`

class Router extends React.Component {
    render () {
        return (
            <div className={wrapperRule}>
                <HashRouter>
                    <Route render={ ({location, history}) => {
                        history.slideStatus = history.slideStatus || (history.action === 'POP' ? 'right' : history.slideStatus)
                        const pageTransitions = pageTransitionsFn(history.slideStatus)
                        const mapStyle = mapStyleFn(history.slideStatus)
                        history.slideStatus = false
                        return (
                            <div style={{width: '100%', height: '100%'}}>
                                <GlobalComponents/>
                                <AnimatedSwitch
                                    {...pageTransitions}
                                    runOnMount={location.pathname === '/'}
                                    mapStyles={mapStyle}
                                    className="animate-wrapper">
                                    {NotLoyoutRouter}
                                    <Route render={ props => {
                                        return <Loyout {...props}>
                                            <Route render={()=> {
                                                return (
                                                    <Switch>
                                                        {LoyoutRouter}
                                                        <Redirect from="*" to="/404" />
                                                    </Switch>
                                                )
                                            }}/>
                                        </Loyout>
                                    }} />
                                </AnimatedSwitch>
                            </div>
                        )
                    }}/>
                </HashRouter>
            </div>
        )
        
    }
}
export default Router