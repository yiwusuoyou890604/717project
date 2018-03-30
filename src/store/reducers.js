import { combineReducers } from "redux"
//添加购物车
export const ADD_CART = "ADD_CART"
//用户信息
export const USER_INFO = "USER_INFO"
//改变商品的数量
export const UPDATE_GOODS_COUNT = "UPDATE_GOODS_COUNT"
//改变商品选中与否
export const UPDATE_GOODS_SELECTED = "UPDATE_GOODS_SELECTED"
//更新整个商品列表
export const UPDATA_GOODS_LIST = 'UPDATA_GOODS_LIST'

export const SELECTED_ALL = 'SELECTED_ALL'

let initState = {
    cart_list: [],
    user_info: null,
    goods_list:[]
}

function goods_list(state=initState.goods_list,action){
    if(action.type=='TEST_SAGA'){
        return action.data
    }
    return state
}

function cart_list(state = initState.cart_list, action) {
    switch (action.type) {
        case ADD_CART:
            let flag = false;
            state.forEach((item, index) => {
                if (item.goods_id == action.data.goods_id) {
                    ++item.count;
                    flag = true
                }
            })
            return flag ? [...state] : [...state, action.data];//如果购物车里面有那就去重没有就返回数据
            break;
        case UPDATE_GOODS_COUNT:
            let arr = [...state];
            arr.forEach(item => {
                if (item.goods_id == action.id) {
                    item.count = action.data
                }
            });
            return arr
            break;
        case UPDATE_GOODS_SELECTED:
            let arr2 = [...state];
            arr2.forEach(item => {
                console.log(item.selected , action.data)
                if (item.goods_id == action.id) {
                    item.selected = action.data
                }
            });
            return arr2
        case UPDATA_GOODS_LIST:
            return action.data

        case SELECTED_ALL:
            let arr3 = [...state];
            let str = action.data

            arr3.forEach(item => {


                item.selected = str == 'all' ? 1 : 0


            });
            return arr3
        default: return state
    }
    return state
}

function user_info(state = initState.uese_info, action) {
    switch (action.type) {
        case USER_INFO:
            return action.data;
            break;
        default:
            return {

            }
    }
}

export default combineReducers({
    cart_list,
    user_info,
    goods_list
})