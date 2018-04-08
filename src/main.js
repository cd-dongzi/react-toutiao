import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import 'nprogress/nprogress.css'
import './styles/index.css'
import './styles/index.less'

import Router from './router'
import store from './store'
import DevTools from './devTools'
import 'utils/iconfont'
import 'utils/rem'

import initReactFastclick from 'react-fastclick'
initReactFastclick() // 解决IOS onClick不生效

ReactDom.render(
    <Provider store={store}>
        <div>
            <Router/>
            {/*process.env.NODE_ENV === 'production'?'':<DevTools/>*/}
        </div>
    </Provider>
, document.getElementById('app'))