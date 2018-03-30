import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getCookie } from '../utils/utils'
import { Redirect } from 'react-router-dom'
function islogin() {
    return !!getCookie('token')
}
class RouteWrapper extends Component {
    render() {
        const { routes } = this.props
        return routes.map((item, index) => {
            return <Route exact={item.exact} key={index} path={item.path} render={(location) => {
                    return item.authorization && !islogin() ?
                        <Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect>
                        :
                        <item.component {...location} routes={item.children}></item.component>             
            }}></Route>
            // routes.map((item, index) => {
            //         return <Route exact={item.exact} key={index} path={item.path} render={(location) => {
                        // return <item.component {...location} routes={item.children}></item.component>
            //         }}> </Route>
        })
    }
}

export default RouteWrapper