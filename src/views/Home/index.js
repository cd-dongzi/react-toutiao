import React from 'react'
import TopBar from './topbar/index'
import Swiper from 'react-id-swiper'
import Content from './content'
import './index.less'
import connect from 'connect'

@connect

class Home extends React.Component {
    state = {
        swiper: null
    }
    componentDidMount () {
        const swiper = this.refs['home-box-swiper'].swiper
        this.setState({
            swiper
        })
    }
    slideChangeTransitionEnd () {
        this.active(this.state.swiper.activeIndex)
    }
    active (index) {
        this.props.setNewsIndex(index)
        this.getListOfNews(index)
    }
    getListOfNews (newsIndex) {
        const {getListOfNews, state: {home:{newsList}}} = this.props
        getListOfNews(newsList[newsIndex],{newsList, newsIndex})
    }
    render () {
        const {newsList, newsIndex} = this.props.state.home
        this.state.swiper && this.state.swiper.slideTo(newsIndex)
        return (
            <div className="home-container">
                <TopBar/>
                <div className="home-box">
                    <Swiper ref="home-box-swiper" on={{
                        slideChangeTransitionEnd: this.slideChangeTransitionEnd.bind(this)
                    }}>
                        {
                            newsList.map((news, index) => (
                                <div key={index}>
                                    <Content news={news}/>
                                </div>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        )
    }
}
export default Home