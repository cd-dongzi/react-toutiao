import { createStore, compose, applyMiddleware  } from 'redux'
import DevTools from '../devTools'
import reducer from '../reducers'
import thunk from 'redux-thunk'
const configureStore = preloadedState => createStore(
    reducer,
    preloadedState,
    compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    ) 
)
export default configureStore()
