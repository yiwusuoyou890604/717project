import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import { UPDATA_GOODS_LIST, SELECTED_ALL } from '../../store/reducers'
export default function mapDispatchToProps(dispatch) {
    return {
        fetchGoodsList(history) {
            $http.post('/user/Cart/goodsList', {
                token: getCookie('token')
            }).then(res => {
                if (res.error == 1) {
                    history.push('/login', {
                        from: '/index/cart'
                    })
                } else {
                    dispatch({
                        type: UPDATA_GOODS_LIST,
                        data: res
                    })
                }
            })
        },
        toggleSelectAll(str) {
            dispatch({
                type: SELECTED_ALL,
                data: str
            })
        },
        delCartGoods(selectedId) {
         
            $http.post('/user/Cart/delgoods', {
                selectedId: selectedId,
                token: getCookie('token')
            })
                .then(res => {
                   
                    if (res.success == 1) {
                        dispatch({
                            type: UPDATA_GOODS_LIST,
                            data: res.leftGoods
                        })
                    }
                })
        }
    }
}