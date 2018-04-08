import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 添加news
export const addNews = createAction('ADD_NEWS')

// 删除 news
export const delNews = createAction('DEL_NEWS')

// 获取当前news的内容
export const getListOfNews = ({list, params}, {newsIndex, newsList, hasMore}) => dispatch => {
    if (!hasMore) {
        let obj = newsList.find(v => v.id == newsList[newsIndex].id)
        if (obj.list) return
    }
    return new Promise( (resolve, reject) => {
        axios.get('home/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_LIST_OF_NEWS')({list, newsIndex}))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 刷新当前news 的内容
export const refreshListOfNews = ({list, params}, newsIndex) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('home/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_LIST_OF_NEWS')({list, newsIndex}))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}


// 设置当前news 的下标
export const setNewsIndex = createAction('SET_NEWS_INDEX')