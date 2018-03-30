import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from './dispatch.js'
class Cartitem extends Component {
    constructor(){
        super()
        // this.toggleselect=this.toggleselect.bind(this)
        this.state={
            selectedClass:''
        }
    }
    render() {
        let {toggleselect,updatacount,item}=this.props
        return (
            <li>
                <span onClick={()=>{toggleselect((1-item.selected),item.goods_id)}} className={item.selected==0?'select-btn iconfont':'select-btn iconfont icon-zhengque'}></span>
                <span className='goods-img'>
                    <img src={'http://www.lb717.com' + item.obj_data} alt="" />
                </span>
                <div className='right-area'>
                    <p className='right-p'>{item.goods_name}</p>
                    <div className='flex'>
                        <div className='price-box'>
                            <p>X{item.count}</p>
                            <p>${item.discount_price}</p>
                        </div>
                        <div className='count-box'>
                            <span onClick={() => { updatacount(--item.count, item.goods_id) }}>-</span>
                            <span>{item.count}</span>
                            <span onClick={() => { updatacount(++item.count, item.goods_id) }}>+</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
export default connect(null,mapDispatchToProps,null,{pure:false})(Cartitem)
