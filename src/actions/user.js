import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 登录
export const login = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.post('login', params)
            .then( res => {
                const info = res.data
                dispatch(createAction('LOGIN')(info))
                resolve(info)
            }).catch( err => {
                reject(err)
            })
    })
}


// 弹出登录界面
export const showLogin = createAction('SHOW_LOGIN')

//退出
export const signOut = createAction('SIGN_OUT')

//设置菜单
export const setFooterList = createAction('SET_FOOTER_LIST')
