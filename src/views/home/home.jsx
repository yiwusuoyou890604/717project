import React, { Component } from 'react'
import $http from '../../utils/http.js'
import Swiper from '../../components/swiper/swiper.jsx'

import GoodsItem from '../../components/goodsComp/goodsItem.jsx'
import './home.less'
import Toast from 'react-toast-mobile'; //弹窗插件
import   'react-toast-mobile/lib/react-toast-mobile.css';
class Home extends Component {
    constructor() {
        super()
        this.state = {
            goodslist: [],
            channel_id: 3,
            caniquer: true
        }
        this.toSearch = this.toSearch.bind(this)
        this.scrolling = this.scrolling.bind(this)
    }
    toSearch() {
        let { history } = this.props
        history.push('/index/search')
    }
    render() {
        return <div id='home' onScroll={this.scrolling} ref='scroller'>
            <Toast  />
            <div ref='doc'>
                <header className='header'>
                    <div className='logo'>
                        <img src={require('../../static/img/homelo.gif')} alt="" />
                    </div>
                    <div className='searchBox'>
                        <span><img src={require('../../static/img/serach.png')} alt="" /></span>
                        <input type="text" className='search' onFocus={this.toSearch}/>
                    </div>
                    <dl className='dl'>
                        <dt><img src={require('../../static/img/shoping.png')} alt="" /></dt>
                        <dd>我的店铺</dd>
                    </dl>
                </header>

                <Swiper></Swiper>
                <section className='home-cat'>
                    <dl>
                        <dt><img src={require('../../static/img/img1.png')} alt="" /></dt>
                        <dd>牛奶乳品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img2.png')} alt="" /></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img3.png')} alt="" /></dt>
                        <dd>休闲零食</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img4.png')} alt="" /></dt>
                        <dd>米面粮油</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img5.png')} alt="" /></dt>
                        <dd>调味调料</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img6.png')} alt="" /></dt>
                        <dd>酒水饮品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img7.png')} alt="" /></dt>
                        <dd>生鲜果蔬</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/img8.png')} alt="" /></dt>
                        <dd>进口食品</dd>
                    </dl>
                </section>
                <span className='tiao'>
                    <img src={require('../../static/img/my17.png')} alt=""/>
                    <span>热门推荐</span>
                    <img src={require('../../static/img/my17.png')} alt=""/>
                </span>
                <div className='goods-list'>
                    {
                        this.state.goodslist.map((item, index) => {
                            return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                        })
                    }
                </div>
            </div>
        </div>
    }
    componentDidMount() {
        $http.post('/mall/index/getGoodsChannel', { channel_id: this.state.channel_id })
            .then(res => {
                this.setState({
                    goodslist: JSON.parse(res).data.data
                })
            })
    }
    scrolling() {
        if(this.state.channel_id>9){
            return 
        }
        if (!this.state.caniquer) return
        let { scroller, doc } = this.refs
        let st = scroller.scrollTop
        let sw = scroller.offsetHeight;
        let dh = doc.offsetHeight;
        if (dh - (st + sw) < 50) {
            this.setState({
                caniquer: false
            })
            this.setState({
                channel_id: ++this.state.channel_id
            })
            let {goodslist}=this.state
            $http.post('/mall/index/getGoodsChannel', { channel_id: this.state.channel_id })
                .then(res => {
                    this.setState({
                        goodslist: [...goodslist,...JSON.parse(res).data.data]
                    })
                    this.setState({
                        caniquer: true
                    })
                })
        }
    }
}
export default Home