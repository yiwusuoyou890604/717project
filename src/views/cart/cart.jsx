import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './map.js'
import './cart.less'
import mapDispatchToProps from './dispatch.js'
import { UPDATE_GOODS_SELECTED } from '../../store/reducers'
import Cartitem from '../../components/cartitem/Cartitem'

class Cart extends PureComponent {
    constructor() {
        super()
        // this.updatacount=this.updatacount.bind(this)
        this.state = {
            str: 'all',
            edit: '编辑',
            pay: '结算'
        }
        this.cartEdit = this.cartEdit.bind(this)
        this.toDelgoods = this.toDelgoods.bind(this)
    }
    render() {
        let { str, edit, pay } = this.state

        let { cartList, totalcost, selectall, toggleSelectAll } = this.props
        return (<div id="cart">
            <div className='header'>
                购物车
                <span className='edit' onClick={this.cartEdit}>{edit}</span>
            </div>
            <div className="goods-list">
                <ul>
                    {
                        cartList.map((item, index) => {
                           
                            return (
                                <Cartitem key={"cartItem" + index} item={item}></Cartitem>
                            )
                        })
                    }
                </ul>
            </div>
            <footer>
                <div onClick={() => {
                    this.setState({
                        str: str == 'all' ? 'none' : 'all'
                    });
                    toggleSelectAll(str)
                }}>全选<span className={'select-btn iconfont ' + (selectall ? 'icon-zhengque' : '')}></span></div>
                <div>总价<span >{totalcost}</span><span className='cart-btn' onClick={this.toDelgoods}>{pay}</span></div>
            </footer>
        </div>)
    }
    toDelgoods() {
        if (this.state.pay == '结算') return
        let selectedId = []
        this.props.cartList.forEach(item => {
            if (item.selected == 1) {
                selectedId.push(item.goods_id)
            }
        })
      
        this.props.delCartGoods(selectedId)
    }
    cartEdit() {
        this.setState({
            edit: this.state.edit == '编辑' ? '完成' : '编辑',
            pay: this.state.edit == '编辑' ? '删除' : '结算'
        })
    }
    componentDidMount() {
        this.props.fetchGoodsList(this.props.history)
    }
}

// function mapStateToProps(state) {
//     //便利cartList 计算总价
//     let totalcost = 0;
//     //全选
//     let selectall = true
//     state.cart_list.forEach((item, index) => {
//         if (item.selected == 1) {
//             totalcost += (item.discount_price * item.count)
//         }
//         if (item.selected == 0) {
//             selectall = false
//         }
//     })
//     return {
//         cartList: state.cart_list,
//         totalcost,
//         selectall
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)