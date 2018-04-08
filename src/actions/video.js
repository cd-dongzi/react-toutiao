import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 添加videoList
export const getVideoList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('video/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_VIDEO_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 刷新当前videoList 的内容
export const refreshVideoList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('video/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_VIDEO_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 重新渲染
export const renderVideoList = createAction('RENDER_VIDEO_LIST')