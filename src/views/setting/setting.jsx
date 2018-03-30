import React, { Component } from 'react'
import { loginout } from '../../utils/utils.js'
import Dialog from '../../components/dialog/dialog.jsx'
class Setting extends Component {
    constructor() {
        super()
        this.state = {
            flag: false
        }
        this.logout = this.logout.bind(this)
        this.close = this.close.bind(this)
    }
    render() {
        let { flag } = this.state
        return <div id='setting'>
            <div>设置</div>
            <button onClick={this.logout} className='logout'>退出登录</button>
           
        </div>
    }
    close() {
        this.setState({
            flag: false
        })
    }
    logout() {
        this.props.history.push('/login')
        // this.setState({
        //     flag: true
        // })
    }
}

export default Setting 