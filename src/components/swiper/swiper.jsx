import React, { Component } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
let img1=require('../../static/img/1.jpg')
class Swipercomponent extends Component {
    render() {
        
        return <div className='swiper-container' ref='scDom'>
            <div className='swiper-wrapper'>
                <div className='swiper-slide'><img src={img1} alt="" />  </div>
                <div className='swiper-slide'><img src={require('../../static/img/2.jpg')} alt="" />  </div>
                <div className='swiper-slide'><img src={require('../../static/img/3.jpg')} alt="" />  </div>
                <div className='swiper-slide'><img src={require('../../static/img/4.jpg')} alt="" />  </div>
            </div>
        </div>
    }
    componentDidMount() {
        new Swiper(this.refs.scDom,{
            autoplay:true,
            loop:true
        })
    }
}

export default Swipercomponent