import React from 'react'
import './index.less'

class CircleLoading extends React.Component{
    render () {
        return (
            <div className="circle-loading-wrapper">
                <svg className="loader-circular" viewBox="25 25 50 50">
                    <circle className="loader-path" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                </svg>
            </div>
        )
    }
} 

export default CircleLoading