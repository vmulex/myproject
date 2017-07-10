import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Route, HashRouter as Router } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'
const history = createHistory()

/*
 全局导入less
 如果你发现你的样式没有起作用，那么很可能是没有在这里导入样式
 */
import './app.less'
import 'containers/Home/styles/home.less'
import 'containers/Search/styles/search.less'

import * as globalActions from 'actions/global'
import { asyncComponent } from './AsyncComponent'

import homeContainer from 'containers/Home/HomeContainer'

const Search = asyncComponent(() => import(/* webpackChunkName: "search" */ "./containers/Search/SearchContainer"))
const BookList = asyncComponent(() => import(/* webpackChunkName: "bookList" */ "./containers/BookList/BookListContainer"))

@connect (
    state => state,
    dispatch => bindActionCreators(globalActions, dispatch)
)
export default class App extends React.Component {

    componentDidMount() {
        window.addEventListener('hashchange', () => {
           this.props.currentAnimate('normal')
        })
    }
    
  render() {
      const { animateCls } = this.props.global
      console.log(animateCls)
      return (
          <Router history={history}>
              <Route render={({ location }) => {
                  return(
                      <CSSTransitionGroup
                          transitionName={animateCls}
                          transitionEnter={true}
                          transitionLeave={true}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}
                      >
                          <div key={location.pathname}>
                              <Route location={location} exact path="/" component={homeContainer} />
                              <Route location={location} path="/search" component={Search} />
                              <Route location={location} path="/bookList/:bookId" component={BookList} />
                          </div>
                      </CSSTransitionGroup>
                  )
              }}/>
          </Router>
    );
  }
}