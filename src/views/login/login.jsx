import React, { Component } from 'react'
import './login.less'
import $http from '../../utils/http.js'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispath.js'
class Rgister extends Component {
    constructor() {
        super()
        this.tologin = this.tologin.bind(this)
        this.toregister = this.toregister.bind(this)
    }
    render() {
        return (
            <div id='login'>
                <h1 className='tit'>
                    <span>《</span>
                    <span className='sps'>请登录</span>
                    <span>注册</span>
                </h1>
                <p>用户名:<input type="text" className='username' ref='username' /></p>
                <p>密码:<input type="password" className='password' ref='password' /></p>
                <p className='btn'>
                    <button onClick={this.tologin}>登录</button>
                    <button onClick={this.toregister}>注册</button>
                </p>
                
            </div>
        )
    }
    toregister(){
        this.props.history.push('/register')
    }
    tologin() {
        let { username, password } = this.refs

        $http.post('/user/login', {
            username: username.value,
            password: password.value
        }).then(res => {
            if (res.success == 1) {
                //存用户信息到store
                this.props.saveUser(res.user)
                localStorage.setItem('user-info',JSON.stringify(res.user))
                let from=this.props.location.state ? this.props.location.state.from || 'index/home':'index/home'
                document.cookie = ''
                document.cookie = 'token=' + res.token
                this.props.history.replace(from)
            } else {
                alert('错')
            }

        })
    }
}

export default connect(null,mapDispatchToProps)(Rgister)