import React, { Component } from 'react'
import './search.less'
class Search extends Component {
    constructor() {
        super()
        this.tosearch = this.tosearch.bind(this)
        this.clearhistory = this.clearhistory.bind(this)
        this.state = {
            historylist: []
        }
    }
    render() {
        let { historylist } = this.state
        return <div id="search">
            <header>
                <input type="text" ref='keywords' />
                <button onClick={this.tosearch}>搜索</button>
            </header>
            <section className='recent-search'>
                <p>最近搜索<span onClick={this.clearhistory} className='iconfont icon-jisutuikuan'></span></p>
                {historylist.length == 0 ? <p>暂无搜索记录...</p> :
                    <ul>
                        {this.state.historylist.map((item, index) => {
                            return <li key={index} onClick={() => { this.toresult(item) }}>{item}</li>
                        })}
                    </ul>}
            </section>
            <section className="common-search">
                <p>大家都在搜</p>
                <ul>
                    <li>巧克力</li>
                </ul>
            </section>
        </div>
    }
    clearhistory() {
        localStorage.removeItem('searchhistory')
        this.setState={
            historylist:[]
        }
    }
    tosearch() {
        if (!this.refs.keywords.value) return

        let keywords = this.refs.keywords.value
        let ls = localStorage

        if (ls.getItem('searchhistory')) {
            let sharr = JSON.parse(ls.getItem('searchhistory'))
            if (sharr.indexOf(keywords) > -1) return
            sharr.push(keywords)
            ls.setItem('searchhistory', JSON.stringify(sharr))
        } else {
            ls.setItem('searchhistory', JSON.stringify([keywords]))
        }
    }
    toresult(keywords) {
        this.props.history.push('/index/result', {
            key_words: keywords
        })
    }
    componentDidMount() {
        if (localStorage.getItem('searchhistory')) {
            this.setState({
                historylist: JSON.parse(localStorage.getItem('searchhistory'))
            })
        }

    }
}
export default Search