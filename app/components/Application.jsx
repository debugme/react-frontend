import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { chunk, get, uniq } from 'lodash'

import videoData from './data'

import Header from 'Header'
import Navigation from 'Navigation'
import Content from 'Content'
import Footer from 'Footer'

import 'general'
import 'layout'
import 'responsive'
import 'debug'

const Application = React.createClass({

  _hasSearchTerm: function (searchTerms, video) {
    if (!video.description)
      return false
    if (!searchTerms.length)
      return true
    const description = video.description.toLowerCase()
    const targetFound = searchTerms
      .map(term => description.includes(term.toLowerCase()))
      .filter(value => value === true)
      .length > 0
    return targetFound
  },

  _byPopularUser: function (popularUsers, video) {
    if (!popularUsers)
      return true
    const popularUserLikes = 10
    const userLikes = _.get(video, 'user.metadata.connections.likes.total', 0)
    const isPopularVideo = userLikes >= popularUserLikes
    return isPopularVideo
  },

  _filtersActive: function({searchTerms, pageCount, popularUsers, index}) {
    if (searchTerms.length > 0)
      return true
    if (pageCount !== 10)
      return true
    if (popularUsers === true)
      return true
    if (index !== 0)
      return true
    return false
  },

  _buildPageInfo: function ({searchTerms, pageCount, popularUsers, videosChannel, index = 0}) {
    const videoHasSearchTerm = this._hasSearchTerm.bind(this, searchTerms)
    const videoByPopularUser = this._byPopularUser.bind(this, popularUsers)
    const filteredVideos = videosChannel.data
      .filter(videoHasSearchTerm)
      .filter(videoByPopularUser)
    const pages = filteredVideos.length > 0 ? _.chunk(filteredVideos, pageCount) : [[]]
    const pageInfo = { pages, index }
    return pageInfo
  },

  _updateState: function (state) {
    const newState = Object.assign({}, this.state, state)
    const pageInfo = this._buildPageInfo(newState)
    const finalState = Object.assign({}, newState, pageInfo)
    this.setState(Object.assign(finalState, { filtersActive: this._filtersActive(finalState)}))
  },

  getInitialState: function () {
    const searchTerms = []
    const pageCount = 10
    const popularUsers = false
    const videosChannel = videoData
    const filtersActive = false
    const state = { searchTerms, pageCount, popularUsers, videosChannel, filtersActive }
    const pageInfo = this._buildPageInfo(state)
    return { ...state, ...pageInfo }
  },

  moveToNextPage: function() {
    const value = this.state.index + 1
    const index = value % this.state.pages.length
    this._updateState({ index })
  },

  togglePageCount: function() {
    switch (this.state.pageCount) {
      case 10: return this._updateState({ index: 0, pageCount: 25 })
      case 25: return this._updateState({ index: 0, pageCount: 50 })
      case 50: return this._updateState({ index: 0, pageCount: 10 })
    }
  },

  togglePopularUsers: function() {
    this._updateState({ index: 0, popularUsers: !this.state.popularUsers })
  },

  triggerSearch: function(event) {
      const searchValue = event.target.value.toLowerCase().trim()
      const tokenValues = searchValue.split(/\s*\s\s*/)
      const searchTerms = _.uniq(tokenValues).filter(value => value.length)
      this._updateState({ index: 0, searchTerms })
  },

  render: function () {
    return (
      <div className="container">
        <Header {...this.state} />
        <Navigation {...this.state} togglePageCount={this.togglePageCount} togglePopularUsers={this.togglePopularUsers} moveToNextPage={this.moveToNextPage} triggerSearch={this.triggerSearch}/>
        <Content videos={this.state.pages[this.state.index]} />
        <Footer />
      </div>
    )
  }
})

function renderApplication() {
  ReactDOM.render(
    <Application />,
    document.querySelector('#application')
  )
}

renderApplication();
