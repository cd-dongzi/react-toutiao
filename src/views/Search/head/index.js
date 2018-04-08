import React from 'react'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import {withRouter} from 'react-router-dom'
@connect
@withRouter
export default class extends React.Component {
    state = {
        value: '',
        pageindex: 1
    }
    handleChange (value) {
        this.setState({
            value
        })
    }
    async getSearchData () {
        const {pageindex, value} = this.state
        const {refreshSearchList} = this.props
        await refreshSearchList({
            keyword: value,
            pageindex
        })
        this.setState({
            value: ''
        })
    }
    render () {
        return (
            <div className="search-head-wrapper df-sb">
                <div className="search-title df-sb border-half-bottom">
                    <div className="search">
                        <Icon iconName="2fangdajing" className="search-icon"/>
                        <input type="text" placeholder="搜索些啥呢..." value={this.state.value} 
                            onChange={e => {this.handleChange(e.target.value)}}
                            onKeyDown={e => {
                                e.keyCode === 13 ? this.getSearchData() : null
                            }}
                            onBlur={this.getSearchData.bind(this)}
                        />
                    </div>
                    {
                        this.state.value ? <div className="search-btn" onClick={this.getSearchData.bind(this)}>确定</div> :
                            <div className="close" onClick={e => {this.props.history.goBack()}}>取消</div>
                    }
                    
                    
                </div>
            </div>
        )
    }
}