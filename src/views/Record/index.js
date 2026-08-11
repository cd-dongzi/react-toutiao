import React from 'react'
import { withRouter } from 'react-router-dom'
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

    componentWillMount () {
        const type = this.getSafeIndex(this.props.match.params.type)
        this.getData(type)
    }

    getSafeIndex (type) {
        const total = this.props.state.record.types.length
        const nextIndex = Number(type)

        if (Number.isNaN(nextIndex)) return 0
        if (nextIndex < 0) return 0
        if (nextIndex >= total) return total - 1
        return nextIndex
    }

    componentDidMount () {
        const swiper = this.refs['record-swiper'].swiper
        this.setState({
            swiper
        })
        swiper.slideTo(this.props.state.record.index)
    }

    activeTabs (index) {
        if (this.state.swiper) {
            this.state.swiper.slideTo(index)
        }
    }

    slideChangeTransitionEnd () {
        const currentIndex = this.state.swiper.activeIndex
        this.syncRoute(currentIndex)
        this.getData(currentIndex)
    }

    syncRoute (index) {
        if (`${this.props.match.params.type}` !== `${index}`) {
            this.props.history.replace(`/record/${index}`)
        }
    }

    async getData (index) {
        const {
            showLoading,
            hideLoading,
            setTabsIndex,
            getRecordList,
            syncRecordLists,
            state: { record: { types } }
        } = this.props

        setTabsIndex(index)
        const currentType = types[index]

        if (currentType.source === 'local') {
            await syncRecordLists()
            return
        }

        if (currentType.list.length > 0) return

        showLoading()
        await getRecordList({ title: currentType.title })
        hideLoading()
    }

    clearCurrentType () {
        const { clearRecordByType, state: { record: { types, index } } } = this.props
        const currentType = types[index]

        if (currentType.source !== 'local' || currentType.list.length < 1) return
        clearRecordByType(currentType.key)
    }

    render () {
        const { types: recordTypes, index: recordIndex } = this.props.state.record
        const currentType = recordTypes[recordIndex]
        const canClear = currentType && currentType.source === 'local' && currentType.list.length > 0

        return (
            <div className="record-wrapper">
                <TitleBar title="\u6536\u85cf/\u5386\u53f2"/>
                <div className="tabs df-c border-half-top">
                    {
                        recordTypes.map((type, index) => (
                            <div className={`tab ${index === recordIndex ? 'tab-active' : ''}`} key={index} onClick={e => this.activeTabs(index)}>{type.title}</div>
                        ))
                    }
                </div>
                <div className="record-actions">
                    <div className="record-actions__summary">
                        {currentType.source === 'local' ? `\u5171 ${currentType.list.length} \u6761` : '\u4e0b\u62c9\u5237\u65b0\uff0c\u4e0a\u62c9\u52a0\u8f7d'}
                    </div>
                    {
                        canClear ? (
                            <button className="record-actions__btn" onClick={this.clearCurrentType.bind(this)}>
                                \u6e05\u7a7a\u5168\u90e8
                            </button>
                        ) : null
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
