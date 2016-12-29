const Navigation = React.createClass({

         // <span className="ui label search-box">
          //   <i className="red search icon"></i>
          //   <span className="ui input small search-box">
          //     <input type="text" />
          //   </span>
          // </span>

  render: function () {
    return (
      <nav className="navigation-pane">

        <div className="toolbar">

          <span className="ui label pagination">
            <i className="left circle arrow icon"></i>
            <span className="filter-text">1 of 5</span>
            <i className="right circle arrow icon"></i>
          </span>

          <span className="ui label popular-user">
            <span className="filter-text">Popular Users</span>
            <i className="heart outline icon"></i>
          </span>

          <span className="ui label page-count">
            <span className="filter-text">Page Count</span>
            <span>10</span>
          </span>



        </div>

      </nav>
    )
  }
})

const FilterSet = React.createClass({

  onSearch: function (event) {
    const searchValue = event.target.value.trim()
    const searchTerms = searchValue.split(/\s*\s\s*/)
    const { updateState } = this.props
    updateState({ searchTerms })
  },

  componentDidMount: function () {
    const searchWords = this.props.searchTerms.join(' ')
    const searchField = this.refs.searchTerms
    searchField.value = searchWords
    const { updateState } = this.props

    $('.ui.dropdown#videosPerPage').dropdown({
      onChange: function (videosPerPage) {
        updateState({ videosPerPage: videosPerPage })
      }
    })

    $('.ui.dropdown#popularVideos').dropdown({
      onChange: function (popularVideos) {
        updateState({ popularVideos: popularVideos === "yes" })
      }
    })
  },

  getClasses: function (propName, propData) {
    return ['item', this.props[propName] === propData ? 'active' : ''].join(' ')
  },

  render: function () {

    const show10 = this.getClasses('videosPerPage', 10);
    const show25 = this.getClasses('videosPerPage', 25);
    const show50 = this.getClasses('videosPerPage', 50);

    const showPopular = this.getClasses('popularVideos', 'Yes')
    const hidePopular = this.getClasses('popularVideos', 'No')

    return (
      <div className="ui raised segments">
        <div className="ui segment compact search-field">
          <i className="red search icon"></i>
          <span className="ui input small search-box">
            <input ref="searchTerms" onChange={this.onSearch} id="filter-input" type="text" placeholder="Add search terms to refine results by ..." value={this.props.searchTerms.join(' ')} />
          </span>
        </div>
        <div className="ui segment">
          <i className="red unhide icon"></i>
          <span className="small-text">Only show</span>
          <div className="ui inline dropdown" id="videosPerPage">
            <span className="text small-text">{this.props.videosPerPage}</span>
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className={show10} data-text="10"><span className="drop-down">10</span></div>
              <div className={show25} data-text="25"><span className="drop-down">25</span></div>
              <div className={show50} data-text="50"><span className="drop-down">50</span></div>
            </div>
            <span className="small-text">videos per page</span>
          </div>
        </div>
        <div className="ui segment">
          <i className="red filter icon filter-icon"></i>
          <span className="small-text">Filter videos by popular users</span>
          <div className="ui inline dropdown" id="popularVideos">
            <span className="text small-text">{this.props.popularVideos ? 'Yes' : 'No'}</span>
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className={showPopular} data-text="Yes"><span className="drop-down">Yes</span></div>
              <div className={hidePopular} data-text="No"><span className="drop-down">No</span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

const Header = React.createClass({

  componentDidMount: function () {
    $('.ui.small.modal').modal({ observeChanges: true });
    $('span.menu').on('click', function (event) {
      $('.ui.small.modal').modal({ blurring: true }).modal('show')
    })
  },

  render: function () {
    return (
      <header className="header-pane">
        <span className="logo">Video Channel</span>
        <span className="more">
          <span className="menu"><i className="content icon"></i></span>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
          <span className="name">Asad Razvi</span>
        </span>
        <div className="ui small modal center">
          <FilterSet {...this.props} />
        </div>
      </header>
    )
  }
})

const Footer = React.createClass({
  render: function () {
    return (
      <footer className="footer-pane">
        <span>
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

    const shortDescription = _.truncate(description, { length: 500, omission: '...' })

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
                <i className="red play icon"></i> {plays} <span className="text">plays</span>
                <i className="red like icon"></i>{likes}<span className="text">likes</span>
                <i className="red comments icon"></i> {comments} <span className="text">comments</span>
                <a href={link} target="_blank"><i className="red linkify icon"></i>video<span className="text">link</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
})

const VideoList = React.createClass({
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

  _byPopularUser: function (popularVideos, video) {
    if (!popularVideos)
      return true
    const popularUserLikes = 10
    const userLikes = _.get(video, 'user.metadata.connections.likes.total', 0)
    const isPopularVideo = userLikes >= popularUserLikes
    return isPopularVideo
  },

  buildPageInfo: function ({searchTerms, videosPerPage, popularVideos, videosChannel, index = 0}) {
    const videoHasSearchTerm = this._hasSearchTerm.bind(this, searchTerms)
    const videoByPopularUser = this._byPopularUser.bind(this, popularVideos)
    const filteredVideos = videosChannel
      .filter(videoHasSearchTerm)
      .filter(videoByPopularUser)
    const pages = filteredVideos.length > 0 ? _.chunk(filteredVideos, videosPerPage) : [[]]
    const pageInfo = { pages, index }
    return pageInfo
  },

  getDefaultProps: function () {
    const searchTerms = []
    const videosPerPage = 10
    const popularVideos = false
    const videosChannel = window.com.schibsted.videos.data
    const props = { searchTerms, videosPerPage, popularVideos, videosChannel }
    return props
  },

  getInitialState: function () {
    const pageInfo = this.buildPageInfo(this.props)
    const initialState = Object.assign({}, this.props, pageInfo)
    return initialState
  },

  updateState: function (state) {
    const newState = Object.assign({}, this.state, state)
    const pageInfo = this.buildPageInfo(newState)
    const finalState = Object.assign({}, newState, pageInfo)
    this.setState(finalState)
  },

  render: function () {
    return (
      <div className="container">
        <Header {...this.state} updateState={this.updateState} />
        <Navigation {...this.props} />
        <VideoList videos={this.state.pages[this.state.index]} />
        <Footer />
      </div>
    )
  }
})

ReactDOM.render(
  <Application />,
  document.querySelector('#application')
)
