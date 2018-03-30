import React, { Component } from 'react'
import {connect} from 'react-redux'
class Mine extends Component{
    constructor(){
        super()
        this.tosetting=this.tosetting.bind(this)
    }
    render(){
        return <div id='mine'>
            <div>
                <p>
                    <span className="iconfont icon-wxbgongju" onClick={this.tosetting}></span>
                    <span>我的717商城</span>
                </p>
                <dl>
                    <dt>
                        <img src={require('../../static/img/nav4.jpg')} alt=""/>
                    </dt>
                    <dd>
                        <p>{123}</p>
                        <p>{456}</p>
                    </dd>
                </dl>
            </div>
        </div>
    }
    tosetting(){
        this.props.history.push('/setting')
    }
}

export default Mine