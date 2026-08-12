import { Local } from './storage'

const FAVORITE_KEY = 'react_toutiao_favorite_records'
const HISTORY_KEY = 'react_toutiao_history_records'
const RECORD_LIMIT = 50

const ensureArray = list => Array.isArray(list) ? list : []

const normalizeArticle = article => ({
    id: article.id,
    title: article.title || '',
    intro: article.intro || '',
    source: article.source || '',
    time: article.time || 0,
    comment: article.comment || 0,
    avatar: article.avatar || '',
    tags: ensureArray(article.tags),
    images: ensureArray(article.images),
    like_num: article.like_num || 0,
    savedAt: Date.now()
})

const readList = key => ensureArray(Local.get(key))

const writeList = (key, list) => {
    Local.set(key, list)
    return list
}

const upsertArticle = (list, article) => {
    const currentId = `${article.id}`
    const nextList = ensureArray(list).filter(item => `${item.id}` !== currentId)
    nextList.unshift(normalizeArticle(article))
    return nextList.slice(0, RECORD_LIMIT)
}

export const getFavoriteRecords = () => readList(FAVORITE_KEY)

export const getHistoryRecords = () => readList(HISTORY_KEY)

export const syncLocalRecordLists = () => ({
    favorites: getFavoriteRecords(),
    histories: getHistoryRecords()
})

export const addHistoryRecord = article => {
    const nextList = upsertArticle(getHistoryRecords(), article)
    return writeList(HISTORY_KEY, nextList)
}

export const toggleFavoriteRecord = article => {
    const favoriteList = getFavoriteRecords()
    const currentId = `${article.id}`
    const exists = favoriteList.some(item => `${item.id}` === currentId)
    const nextList = exists
        ? favoriteList.filter(item => `${item.id}` !== currentId)
        : upsertArticle(favoriteList, article)

    return {
        list: writeList(FAVORITE_KEY, nextList),
        collected: !exists
    }
}

export const removeRecordItem = (type, id) => {
    const key = type === 'favorite' ? FAVORITE_KEY : HISTORY_KEY
    const nextList = readList(key).filter(item => `${item.id}` !== `${id}`)
    return writeList(key, nextList)
}

export const clearRecordItems = type => {
    const key = type === 'favorite' ? FAVORITE_KEY : HISTORY_KEY
    return writeList(key, [])
}

export const hasFavoriteRecord = id => getFavoriteRecords().some(item => `${item.id}` === `${id}`)
