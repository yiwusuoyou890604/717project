import React, { Component } from 'react'
import $http from '../../utils/http.js'
import './style.less'

import RouterWrapper from '../../components/RouteWrapper'
import { NavLink} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'


class Index extends Component {
    render() {
        let { routes } = this.props
       
        return <div id='index'>
            {/* <ToastContainer></ToastContainer> */}
            <div className="content">
                <RouterWrapper routes={routes}></RouterWrapper>
            </div>
            <ul className='nav'>
                <li>
                    <NavLink to='/index/home' activeClassName='tab-active'>
                        <span className='iconfont icon-shouye'></span>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/catagory' activeClassName='tab-active'>
                        <span className='iconfont icon-zitigui'></span>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/cart' activeClassName='tab-active'>
                        <span className='iconfont icon-gouwucheman'></span>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/mine' activeClassName='tab-active'>
                        <span className='iconfont icon-wode'></span>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    }
    componentDidMount() {
        // $http.get("/server/test.json", { id: 2, name: '张坤' })
        //     .then(data => { console.log(data) })
        //     .catch(err => { console.log(err) })
    }
}


export default Index