import { createAction } from 'redux-actions'
import axios from 'utils/axios'
import {
    addHistoryRecord as saveHistoryRecord,
    clearRecordItems as clearLocalRecordItems,
    removeRecordItem as removeLocalRecordItem,
    syncLocalRecordLists,
    toggleFavoriteRecord as toggleLocalFavoriteRecord
} from 'utils/record'

// 娣诲姞RecordList
export const getRecordList = params => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('record/list', params)
            .then(res => {
                const list = res.data.list
                dispatch(createAction('GET_RECORD_LIST')(list))
                resolve(list)
            }).catch(err => {
                reject(err)
            })
    })
}

// 鍒锋柊褰撳墠RecordList 鐨勫唴瀹?
export const refreshRecordList = params => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('record/list', params)
            .then(res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_RECORD_LIST')(list))
                resolve(list)
            }).catch(err => {
                reject(err)
            })
    })
}

// 閲嶆柊娓叉煋
export const renderRecordList = createAction('RENDER_RECORD_LIST')

// 鍒囨彌tab
export const setTabsIndex = createAction('SET_TABS_INDEX')

export const syncRecordLists = () => dispatch => {
    const payload = syncLocalRecordLists()
    dispatch(createAction('SYNC_RECORD_LISTS')(payload))
    return Promise.resolve(payload)
}

export const addHistoryRecord = article => dispatch => {
    saveHistoryRecord(article)
    const payload = syncLocalRecordLists()
    dispatch(createAction('SYNC_RECORD_LISTS')(payload))
    return Promise.resolve(payload)
}

export const toggleFavoriteRecord = article => dispatch => {
    const payload = toggleLocalFavoriteRecord(article)
    dispatch(createAction('TOGGLE_FAVORITE_RECORD')(payload))
    return Promise.resolve(payload)
}

export const removeRecordByType = ({ type, id }) => dispatch => {
    removeLocalRecordItem(type, id)
    const payload = syncLocalRecordLists()
    dispatch(createAction('SYNC_RECORD_LISTS')(payload))
    return Promise.resolve(payload)
}

export const clearRecordByType = type => dispatch => {
    clearLocalRecordItems(type)
    const payload = syncLocalRecordLists()
    dispatch(createAction('SYNC_RECORD_LISTS')(payload))
    return Promise.resolve(payload)
}
