import React from 'react'
import TitleBar from 'components/TitleBar'
import NoneData from 'components/NoneData/all-none'
export default class extends React.Component {
    render () {
        return (
    	    <div className="feedback-wrapper">
		        <TitleBar title="用户反馈"/>
                <NoneData/>
    	    </div>
        )
    }
}