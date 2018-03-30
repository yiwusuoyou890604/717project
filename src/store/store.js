import {createStore,applyMiddleware}  from 'redux'
import logger from 'redux-logger'
import reducers from './reducers.js'
// import createSagaMiddleware from 'redux-saga'
// import sagas from './sagas'
// let sagaMiddleware=createSagaMiddleware()   ,applyMiddleware(sagaMiddleware)
let  store =createStore(reducers,applyMiddleware(logger))
// sagaMiddleware.run(sagas)
export default store