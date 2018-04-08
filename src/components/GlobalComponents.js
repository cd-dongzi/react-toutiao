import React from 'react'
import Alert from 'components/Alert'
import DefaultLoading from 'components/DefaultLoading'
import connect from 'connect'
@connect
export default class GlobalComponents extends React.Component {
    render () {
        const {alert, loading} = this.props.state.config
        return (
            <div className="global-components-wrapper">
                <Alert show={alert.show} content={alert.content} success={alert.success}/>
                <DefaultLoading show={loading.show}/>
            </div>
        )
    }
}