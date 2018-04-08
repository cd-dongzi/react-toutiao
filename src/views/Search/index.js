import React from 'react'
import HeadComponent from './head'
import BodyComponent from './body'
import './index.less'

export default class extends React.Component {
    render () {
        return (
            <div className="search-wrapper">
                <HeadComponent></HeadComponent>
                <BodyComponent></BodyComponent>
            </div>
        )
    }
}