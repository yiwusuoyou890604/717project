import React, { Component } from 'react'
import './catagory.less'
import $http from '../../utils/http.js'
class Catagory extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0
        }
        this.toggleactive = this.toggleactive.bind(this)
    }
    render() {
        let datlist = ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料']
        return <div id="catagory">
            <header>
                <input type="text" />
            </header>
            <div className="catagory-wrap">
                <div className="left-side">
                    <ul>
                        {
                            datlist.map((item, index) => {
                                return <li className={this.state.activeIndex == index ? 'actagory-active' : ''} key={index} onClick={() => { this.toggleactive(index) }}> {item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="right-side">

                </div>
            </div>
        </div>
    }
    toggleactive(idx) {
        // $http.get('/mobile/Category/categorySon', { sonid: 2 }).then((res) => {
        //     console.log(res)
        // })

        let url_men='https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521707177432&sign=d4d28b051a96fd6c070ec85befe99356&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp2&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%223%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D'
        $http.jsonp(url_men,'mtopjsonp2').then(res=>{
            console.log(res)
        })
        this.setState({
            activeIndex: idx
        })
    }
}
export default Catagory