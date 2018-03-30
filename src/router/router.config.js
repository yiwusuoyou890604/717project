import React, { Component } from 'react'
import Home from '../views/home/home.jsx'
import Detail from '../views/detail/detail.jsx'
import Login from '../views/login/login.jsx'
import Index from '../views/index/index.jsx'
import Nomatch from '../views/route404/nomatch.jsx'
import Register from '../views/register/register.jsx'
import Search from '../views/search/search.jsx'
import SearchResult from '../views/result'
import Catagory from '../views/catagory/catagory.jsx'
import Mine from '../views/mine/mine.jsx'
import Cart from '../views/cart/cart.jsx'
import Setting from '../views/setting/setting.jsx'
let router = {
    routes: [
        {
            path: '/detail',
            component: Detail,
            exact: true
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/setting',
            component: Setting
        },
        {
            path: '/index',
            component: Index,
            // exact:true,
            children: [
                {
                    path: '/index/home',
                    component: Home,
                },
                {
                    path: '/index/catagory',
                    component: Catagory,
                },
                {
                    path: '/index/cart',
                    component: Cart,
                },
                {
                    path: '/index/mine',
                    component: Mine,
                    authorization:true
                },
                {
                    path: '/index/search',
                    component: Search,
                },
                {
                    path: '/index/result',
                    component: SearchResult,
                }
            ]
        },
     
    ]
}
export default router