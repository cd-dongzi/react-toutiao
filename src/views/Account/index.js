import React from 'react'
import FooterBar from 'components/FooterBar'
import Head from './head/index'
import Body from './body/index'
import './index.less'

export default () => (
    <article>
        <div className="account-container">
            <Head></Head>
            <Body></Body>
        </div>
        <FooterBar></FooterBar>
    </article>
)

