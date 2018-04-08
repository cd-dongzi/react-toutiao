import React from 'react'
import TitleBar from 'components/TitleBar'
import NoneData from 'components/NoneData/all-none'
export default class extends React.Component {
    render () {
        return (
    	    <div className="jd-wrapper">
		        <TitleBar title="京东特供"/>
                <NoneData/>
    	    </div>
        )
    }
}