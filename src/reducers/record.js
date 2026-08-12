import { handleActions } from 'redux-actions'
import { getFavoriteRecords, getHistoryRecords } from 'utils/record'

const buildTypes = () => ([
    { title: '\u6211\u7684\u6536\u85cf', key: 'favorite', source: 'local', list: getFavoriteRecords() },
    { title: '\u9605\u8bfb\u5386\u53f2', key: 'history', source: 'local', list: getHistoryRecords() },
    { title: '\u63a8\u9001\u5386\u53f2', key: 'push', source: 'remote', list: [] }
])

const state = {
    types: buildTypes(),
    index: 0,
    recordList: []
}

const syncLocalTypes = (state, payload) => {
    state.types[0].list = payload.favorites
    state.types[1].list = payload.histories
    return { ...state }
}

export const record = handleActions({
    GET_RECORD_LIST: (state, action) => {
        state.types[state.index].list = state.types[state.index].list.concat(action.payload)
        return { ...state }
    },
    REFRESH_RECORD_LIST: (state, action) => {
        state.types[state.index].list = action.payload
        return { ...state }
    },
    RENDER_RECORD_LIST: state => ({ ...state }),
    SET_TABS_INDEX: (state, action) => {
        state.index = action.payload
        return { ...state }
    },
    SYNC_RECORD_LISTS: (state, action) => syncLocalTypes(state, action.payload),
    TOGGLE_FAVORITE_RECORD: (state, action) => {
        state.types[0].list = action.payload.list
        return { ...state }
    }
}, state)
