import React, { Component } from 'react'
import $http from '../../utils/http.js'
import Lazyload from 'react-lazyload'
import { getCookie } from '../../utils/utils.js'
// import { ToastContainer, toast } from 'react-toastify'
// import { css } from 'glamor'
import { connect } from 'react-redux'
import { ADD_CART } from './../../store/reducers'
import { T } from 'react-toast-mobile';  //弹窗

class Palceholder extends Component {
    render() {
        return <img src={require('../../static/img/img8.png')} />
    }
}
class GoodsItem extends Component {
    constructor() {
        super()
        this.addCart = this.addCart.bind(this)
        this.toDetail = this.toDetail.bind(this)
    }
    render() {
        let { data } = this.props
        return (
            <dl className='goods-item' onClick={() => { this.toDetail(data.goods_id) }}>
                <dt>
                    <Lazyload overflow once height={'100%'} palceholder={<Palceholder></Palceholder>} debounce={100}>
                        <img src={"http://www.lb717.com/" + data.obj_data} alt="" />
                    </Lazyload>
                </dt>
                <dd>
                    <p className="goods-detail">{data.goods_name}</p>
                    <p>
                        <span className='goods-price'>{data.discount_price}</span>
                        <span onClick={this.addCart} className='iconfont icon-gouwucheman'></span>
                    </p>
                    {/* <ToastContainer /> */}
                </dd>
            </dl>
        )
    }
    addCart(e) {
        let { data } = this.props
        e.stopPropagation()
        if (getCookie('token')) {
            $http.post('/user/Cart/addCart', {
                goods_id: data.goods_id,
                goods_info: data,
                token: getCookie('token')
            }).then((res) => {
                if (res == 1) {
                    T.notify('购物车添加成功')
                    this.props.dispatch({
                        type: ADD_CART,
                        data: {
                            ...data,
                            count: 1,
                            selected: 0
                        }
                    })
                    // this.props.history.push('/index/cart', {
                    //     from: location.pathname
                    // })
                } else {
                    // toast(res.info, {
                    //     position: toast.POSITION.TOP_CENTER,
                    //     hideProgressBar: true,
                    //     className: css({ //更改样式
                    //         background: 'black',
                    //         color: '#fff',
                    //         fontSize: ".24rem"
                    //     })
                    // })
                    let { history, location } = this.props
                    console.log(this.props)
                    history.push('/login', {
                        from: location.pathname
                    })
                }
            })
        } else {
            let { history, location } = this.props
            this.props.history.push('/login', {
                from: location.pathname
            })
        }
    }
    toDetail(goods_id) {
        this.props.history.push('/detail?goods_id=' + goods_id, {
            goods_id: goods_id
        })
    }
}


export default connect(null)(GoodsItem)