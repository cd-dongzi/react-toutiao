import { combineReducers } from 'redux'
import * as home from './home'
import * as video from './video'
import * as headline from './headline'
import * as search from './search'
import * as record from './record'
import * as user from './user'
import * as common from './common'

export default combineReducers({
    ...home,
    ...video,
    ...headline,
    ...search,
    ...record,
    ...user,
    ...common
})
