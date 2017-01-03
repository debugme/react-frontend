const Header = React.createClass({

  componentDidMount: function() {
    $('.content.icon').on('click', function() {
      $('.navigation-pane').toggle('display')
    })
  },

  render: function () {

    const { filtersActive } = this.props
    const classes = filtersActive ? 'filter-active content icon' : 'filter-inactive content icon'

    return (
      <header className="header-pane">
        <span className="logo">Video Channel</span>
        <span>
          <a href="#" className="menu"><i className={classes}></i></a>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
          <span className="name">Asad Razvi</span>
        </span>
      </header>
    )
  }
})

const Navigation = React.createClass({

  componentDidMount: function () {

    const { updateState, moveToNextPage, togglePageCount, togglePopularUsers, triggerSearch } = this.props

    $('a.pagination').on('click', moveToNextPage)
    $('a.popular-users').on('click', togglePopularUsers)
    $('a.page-count').on('click', togglePageCount)
    $('.search-field').on('input', triggerSearch)
  },

  render: function () {

    const { popularUsers, pageCount } = this.props
    const currentPage = this.props.index + 1
    const totalPages = this.props.pages.length
    const pageMessage = totalPages === 1 ? currentPage : `${currentPage} / ${totalPages}`
    const classes = popularUsers === true ? 'red heart icon' : 'heart outline icon'

    return (
      <nav className="navigation-pane">
        <div className="filters">

          <a className="ui label pagination">
            <span className="filter-text text">Page</span>
            <span className="pagination">{pageMessage}</span>
          </a>

          <a className="ui label page-count">
            <span className="filter-text text">Page Count</span>
            <span className="page-count">{pageCount}</span>
          </a>

          <a className="ui label popular-users">
            <span className="filter-text text">Popular Users</span>
            <i className={classes} />
          </a>

          <span className="ui label search-terms">
            <i className="search icon"></i>
            <span className="ui inverted transparent icon input search-box">
              <input className="search-field" type="text" />
            </span>
          </span>

        </div>
      </nav>
    )
  }
})

const Content = React.createClass({

  buildVideo: function (video) {
    return <VideoInfo key={video.uri} {...video} />
  },

  render: function () {
    const videos = this.props.videos.map(this.buildVideo)
    return (
      <main className="content-pane">
        {videos}
      </main>)
  }
})

const VideoInfo = React.createClass({
  render: function () {

    const { user, name, link, description, modified_time, stats, metadata } = this.props

    const authorImage = _.get(user, 'pictures.sizes[0].link', 'http://semantic-ui.com/images/avatar/small/elliot.jpg')
    const authorName = _.get(user, 'name')
    const authorLink = _.get(user, 'link')
    const likes = _.get(metadata, 'connections.likes.total', '0')
    const comments = _.get(metadata, 'connections.comments.total', '0')
    const plays = _.get(stats, 'plays', '0')
    const lastModified = moment(modified_time).fromNow()
    const shortDescription = _.truncate(description, { length: 300, omission: '...' })

    return (
      <section>
        <div className="ui raised segment feed">
          <div className="event">
            <div className="label">
              <img src={authorImage} />
            </div>
            <div className="content">
              <div className="summary">
                <a className="user" href={authorLink} target="_blank">{authorName}</a>
                <div className="date">
                  <span className="text">{lastModified}</span>
                </div>
              </div>
              <div className="video-title">
                <h3 className="ui header"><a className="user" href={link} target="_blank">{name}</a></h3>
              </div>
              <div className="short-description">
                {shortDescription}
              </div>
              <div className="description">
                {description}
              </div>
              <div className="meta">
                <span className="information">
                  <i className="red play icon"></i><span className="info">{plays}</span><span className="text">plays</span>
                  <i className="red like icon"></i><span className="info">{likes}</span><span className="text">likes</span>
                  <i className="red comments icon"></i><span className="info">{comments}</span><span className="text">comments</span>
                  <a href={link} target="_blank"><i className="red linkify icon"></i><span className="info">video</span><span className="text">link</span></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
})

const Footer = React.createClass({
  render: function () {
    return (
      <footer className="footer-pane">
        <span className="social-links">
          <a href="mailto:debugme@hotmail.com">
            <i className="send icon"></i>
            <span className="text">E-Mail</span>
          </a>
          <a href="https://uk.linkedin.com/in/debugme" target="_blank">
            <i className="linkedin square icon"></i>
            <span className="text">LinkedIn</span>
          </a>
          <a href="https://github.com/debugme" target="_blank">
            <i className="github icon"></i>
            <span className="text">GitHub</span>
          </a>
          <a href="https://debugme.wordpress.com/" target="_blank">
            <i className="wordpress icon"></i>
            <span className="text">WordPress</span>
          </a>
          <span className="view">
            <span className="small">
              <i className="red tablet icon"></i>
              <span className="text">Small</span>
            </span>
            <span className="medium">
              <i className="red laptop icon"></i>
              <span className="text">Medium</span>
            </span>
            <span className="large">
              <i className="red desktop icon"></i>
              <span className="text">Large</span>
            </span>
          </span>
        </span>
      </footer>
    )
  }
})

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
    const filteredVideos = videosChannel
      .filter(videoHasSearchTerm)
      .filter(videoByPopularUser)
    const pages = filteredVideos.length > 0 ? _.chunk(filteredVideos, pageCount) : [[]]
    const pageInfo = { pages, index }
    return pageInfo
  },

  getDefaultProps: function () {
    const searchTerms = []
    const pageCount = 10
    const popularUsers = false
    const videosChannel = window.com.debugme.videos.data
    const props = { searchTerms, pageCount, popularUsers, videosChannel }
    return props
  },

  getInitialState: function () {
    const pageInfo = this._buildPageInfo(this.props)
    const filterStatus = { filtersActive: false }
    const initialState = Object.assign({}, this.props, pageInfo, filterStatus)
    return initialState
  },

  updateState: function (state) {
    const newState = Object.assign({}, this.state, state)
    const pageInfo = this._buildPageInfo(newState)
    const finalState = Object.assign({}, newState, pageInfo)
    this.setState(Object.assign(finalState, { filtersActive: this._filtersActive(finalState)}))
  },

  moveToNextPage: function() {
    const value = this.state.index + 1
    const index = value % this.state.pages.length
    this.updateState({ index })
  },

  togglePageCount: function() {
    switch (this.state.pageCount) {
      case 10: return this.updateState({ index: 0, pageCount: 25 })
      case 25: return this.updateState({ index: 0, pageCount: 50 })
      case 50: return this.updateState({ index: 0, pageCount: 10 })
    }
  },

  togglePopularUsers: function() {
    this.updateState({ index: 0, popularUsers: !this.state.popularUsers })
  },

  triggerSearch: function(event) {
      const searchValue = event.target.value.toLowerCase().trim()
      const tokenValues = searchValue.split(/\s*\s\s*/)
      const searchTerms = _.uniq(tokenValues).filter(value => value.length)
      console.log('search-terms', searchTerms)
      this.updateState({ index: 0, searchTerms })
  },

  render: function () {
    return (
      <div className="container">
        <Header {...this.state} updateState={this.updateState} />
        <Navigation {...this.state} updateState={this.updateState} togglePageCount={this.togglePageCount} togglePopularUsers={this.togglePopularUsers} moveToNextPage={this.moveToNextPage} triggerSearch={this.triggerSearch}/>
        <Content videos={this.state.pages[this.state.index]} />
        <Footer />
      </div>
    )
  }
})

ReactDOM.render(
  <Application />,
  document.querySelector('#application')
)
