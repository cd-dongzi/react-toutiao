import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import './index.less'
/*
status = {
  init: '',
  pulling: 'pulling', // 下拉中
  enough: 'pulling enough', // 下拉到可以刷新了
  refreshing: 'refreshing', // 刷新中
  refreshed: 'refreshed', // 刷新完毕
  reset: 'reset', // 重置
  loading: 'loading' // 加载中
}

 */
const HeadNode = () => (
    <div className="pull-load-head-default">
        <i/>
    </div>
)

const FooterNode = ({status, hasMore}) => (
    <div className={`pull-load-footer-default ${hasMore? "" : "nomore"}`}>
        {status === 'loading' ? <i/> : ""}
    </div>
)

function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn
        obj[type + fn] = function() {
            obj['e' + type + fn](window.event)
        }
        obj.attachEvent('on' + type, obj[type + fn])
    } else {
        obj.addEventListener(type, fn, false, {
            passive: false
        })
    }
}

function removeEvent(obj, type, fn) {
    if (obj.detachEvent) {
        obj.detachEvent('on' + type, obj[type + fn])
        obj[type + fn] = null
    } else {
        obj.removeEventListener(type, fn, false)
    }
}

class PullLoad extends React.Component {
    static propTypes = {
        handleLoad: PropTypes.func, //加载回调函数, 必须返回Promise
        handleRefresh: PropTypes.func, //刷新回调函数, 必须返回Promise
        hasMore: PropTypes.bool, //是否还有更多内容可加载
        offsetScrollTop: PropTypes.number, //必须大于零，使触发刷新往下偏移，隐藏部分顶部内容
        downEnough: PropTypes.number, //下拉满足刷新的距离
        distanceBottom: PropTypes.number, //距离底部距离触发加载更多

        HeadNode: PropTypes.any, //refresh message react dom
        FooterNode: PropTypes.any, //refresh loading react dom
    }

    // 默认参数
    static defaultProps = {
        handleLoad: function(){},
        handleRefresh: function(){},
        hasMore: true,
        downEnough: 100,
        offsetScrollTop: 1,
        distanceBottom: 50
    }
    state = {
        status: '',
        pullHeight: 0
    }
    componentDidMount () {
        // 默认配置
        const {offsetScrollTop, downEnough, distanceBottom} = this.props
        this.defaultConfig = {
            offsetScrollTop, 
            downEnough, 
            distanceBottom
        }
        this.container = findDOMNode(this) 
        addEvent(this.container, "touchstart", this.onTouchStart)
        addEvent(this.container, "touchmove", this.onTouchMove)
        addEvent(this.container, "touchend", this.onTouchEnd)
    }

    // 获取容器的scrollTop
    getScrollTop = () => {
        if (this.container) {
            if (this.container === document.body) {
                return document.documentElement.scrollTop || document.body.scrollTop
            }
            return this.container.scrollTop
        } else {
            return 0
        }
    }

    // 拖拽的缓动公式 - easeOutSine
    easing = distance => {
        var t = distance
        var b = 0
        var d = screen.availHeight // 允许拖拽的最大距离
        var c = d / 2.5 // 提示标签最大有效拖拽距离
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    }

    // 不能刷新
    cannotRefresh = () => {
        return ['refreshing', 'loading'].some(status => status === this.state.status)
    }

    // 下拉刷新
    onPullDownMove = data => {
        if (this.cannotRefresh()) return false
        let {diffY, startY, curY} = data
        let status
        diffY = this.easing(diffY)
        this.setState({
            pullHeight: diffY,
        })
        if (diffY > this.defaultConfig.downEnough) {
          status = 'enough'
        } else {
          status = 'pulling'
        }
        this.setState({status}) 
    }

    // 上拉加载
    onPullUpMove = async data => {
        if (this.cannotRefresh() || !this.props.hasMore) return false
        this.setState({status: 'loading'})
        await this.props.handleLoad()
        this.setState({status: 'reset'})
    }

    // 下拉松开刷新
    onPullDownRefresh = async () => {
        if (this.cannotRefresh()) return false
        // 刷新后，回到0
        this.setState({
            pullHeight: 0
        }) 
        switch (this.state.status) {
            case 'pulling':
                this.setState({status: 'reset'})
                break
            case 'enough':
                this.setState({status: 'refreshing'})
                await this.props.handleRefresh()
                this.setState({status: 'refreshed'})
                setTimeout(() => {
                    this.setState({status: 'reset'})
                }, 1000)
                break
            default:
                this.setState({status: 'reset'})
                break
        }
    }

    // 按下
    onTouchStart = e => {
        let targetEve = e.changedTouches[0]
        this.startX = targetEve.clientX
        this.startY = targetEve.clientY
    }

    // 移动
    onTouchMove = e => {
        let scrollTop = this.getScrollTop(),
            scrollH = this.container.scrollHeight,
            w = this.container === document.body ? document.documentElement.clientHeight : this.container.offsetHeight,
            targetEve = e.changedTouches[0],
            curX = targetEve.clientX,
            curY = targetEve.clientY,
            diffX = curX - this.startX,
            diffY = curY - this.startY

        // 判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
        if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
            if (diffY > 5 && scrollTop < this.defaultConfig.offsetScrollTop) { // 下拉刷新
                this.onPullDownMove({
                    startY: this.startY,
                    curY,
                    diffY
                })
                e.preventDefault()
            } else if (diffY < 0 && (scrollH - scrollTop - w) < this.defaultConfig.distanceBottom) { // 上拉加载
                this.onPullUpMove({
                    startY: this.startY,
                    curY,
                    diffY
                })
            }
        }
        e.cancelBubble = true
    }

    // 松开
    onTouchEnd = e => {
        let scrollTop = this.getScrollTop(),
            targetEve = e.changedTouches[0],
            curX = targetEve.clientX,
            curY = targetEve.clientY,
            diffX = curX - this.startX,
            diffY = curY - this.startY

        // 判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
        if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
            this.onPullDownRefresh()
        }
        e.preventDefault()
        // e.cancelBubble = true          
    }
    render () {
        const {
            pullHeight,
            status
        } = this.state
        const {
            className,
            hasMore,
            children
        } = this.props

        const pullStyle = pullHeight ? {
            WebkitTransform: `translate3d(0, ${pullHeight}px, 0)`,
            transform: `translate3d(0, ${pullHeight}px, 0)`
        } : null

        const containerClassName = `${className} pull-load state-${status}`

        return (
            <div className={containerClassName} ref="container">
                <div className="pull-load-body" style={pullStyle}>
                    <div className="pull-load-head"><HeadNode/></div>
                    {children}
                    <div className="pull-load-footer"><FooterNode status={status} hasMore={hasMore}/></div>
                </div>
            </div>
        )
    }
}

export default PullLoad