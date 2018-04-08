import React from 'react'
import {withRouter} from 'react-router-dom'
import TitleBar from 'components/TitleBar'
import Swiper from 'react-id-swiper'
import Content from './content'
import connect from 'connect'
import './index.less'
@connect
@withRouter
export default class extends React.Component {
    state = {
        swiper: null
    }
    activeTabs (i) {
        const {setTabsIndex, getRecordList, state: {record: {types}}} = this.props
        this.state.swiper && this.state.swiper.slideTo(i)
    }
    componentWillMount () {
        const {match: {params: {type}}, state: {record: {index}}} = this.props
        this.getData(type*1)
    }
    componentDidMount () {
        const swiper = this.refs['record-swiper'].swiper
        this.setState({
            swiper
        })
        swiper.slideTo(this.props.state.record.index)
    }
    slideChangeTransitionEnd () {
        this.getData(this.state.swiper.activeIndex)
    }
    async getData (i) {
        const { showLoading, hideLoading, setTabsIndex, getRecordList, state: {record: {types}}} = this.props
        setTabsIndex(i)
        if (types[i].list.length > 0) return
        const {title} = types[i]
        showLoading()
        await getRecordList({title})
        hideLoading()
    }
    render () {
        const {types: recordTypes, index: recordIndex } = this.props.state.record
        return (
            <div className="record-wrapper">
                <TitleBar title="收藏/历史"/>
                <div className="tabs df-c border-half-top">
                    {
                        recordTypes.map((type, i) => (
                            <div className={`tab ${i === recordIndex ? 'tab-active':''}`} key={i} onClick={e => this.activeTabs(i)}>{type.title}</div>
                        ))
                    }
                </div>
                <div className="record-content">
                    <Swiper ref="record-swiper" on={{
                        slideChangeTransitionEnd: this.slideChangeTransitionEnd.bind(this)
                    }}>
                        {
                            recordTypes.map((type, index) => (
                                <Content key={index} type={type}/>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        )
    }
}
