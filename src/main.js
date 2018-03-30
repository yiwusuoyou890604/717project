//main引用的是入口模块
import React, { Component } from 'react' //在es6模式下React模块 要求React必须在当前的作用域内
import ReactDOM from "react-dom"
import router from './router/router.config.js'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import RouteWrapper from './components/RouteWrapper.jsx'
import './static/font/iconfont.css'
import './utils/fontset.js'
import './static/css/common.css'
import './static/font/iconfont.css'
import './static/css/goodsitem.less'
import { Provider } from 'react-redux'
import store from './store/store.js'


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Redirect exact path='/' to='/index/home'></Redirect>
                <RouteWrapper routes={router.routes}></RouteWrapper>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'))