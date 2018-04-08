import React from 'react'
import TitleBar from 'components/TitleBar'
import NoneData from 'components/NoneData/all-none'
export default class extends React.Component {
    render () {
        return (
    	    <div className="msg-wrapper">
		        <TitleBar title="消息通知"/>
                <NoneData/>
    	    </div>
        )
    }
}