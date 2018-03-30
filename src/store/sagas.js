import {takeEvery} from 'redux-saga'
import {call,put} from 'redux-saga/effects'

import $http from '../utils/http.js'


//worker saga
function* fetchData(){
    let res=yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3})
    //saga中代替dispatch出发action 的函数
    yield put({
        type:'TEST_SAGA',
        data:res
    })
}

//watcher saga
export default function* watchFetch(){
    //监听每一个type  为GET_GOODS_LIST的action
    yield takeEvery('GET_GOODS_LIST',fetchData)
}