import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 添加headlineList
export const addHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.post('headline/add', params)
            .then( res => {
                const info = res.data
                dispatch(createAction('ADD_HEADLINE_LIST')(info))
                resolve(info)
            }).catch( err => {
                reject(err)
            })
    })
}

// 获取headlineList
export const getHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('headline/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_HEADLINE_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 刷新当前headlineList 的内容
export const refreshHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('headline/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_HEADLINE_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 重新渲染
export const renderHeadlineList = createAction('RENDER_HEADLINE_LIST')