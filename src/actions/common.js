import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 添加文章数据
export const getArticle = params => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('article/info', params)
            .then( res => {
                dispatch(createAction('GET_ARTICLE')(res.data))
                resolve(res.data)
            }).catch( err => {
                reject(err)
            })
    })
}
// 重新渲染文章数据
export const renderArticle = createAction('RENDER_ARTICLE')


// 显示Alert
export const showAlert = createAction('SHOW_ALERT')
// 隐藏Alert
export const hideAlert = createAction('HIDE_ALERT')


// 显示Loading
export const showLoading = createAction('SHOW_LOADING')
// 隐藏Loading
export const hideLoading = createAction('HIDE_LOADING')


