import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 添加RecordList
export const getRecordList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('record/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_RECORD_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 刷新当前RecordList 的内容
export const refreshRecordList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('record/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_RECORD_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 重新渲染
export const renderRecordList = createAction('RENDER_RECORD_LIST')

// 切換tab
export const setTabsIndex = createAction('SET_TABS_INDEX')