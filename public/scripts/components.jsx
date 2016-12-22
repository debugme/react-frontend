const Header = React.createClass({
  render: function () {
    return (
      <header>
        <section>
          <span>Video Channel</span>
        </section>
      </header>
    )
  }
})

const Footer = React.createClass({
  render: function () {
    return (
      <footer>
        <span>
          Made with <i className="empty heart icon red"></i> by Asad
        </span>
      </footer>
    )
  }
})

const Filter = React.createClass({

  onSearch: function (event) {
    const searchValue = event.target.value.trim()
    const searchTerms = searchValue.split(/\s*\s\s*/)
    const { updateState } = this.props
    updateState({ searchTerms })

  },

  componentDidMount: function () {
    const searchTerms = this.props.searchTerms.join(' ')
    const searchField = this.refs.search
    searchField.value = searchTerms
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
      <aside>
        <div className="ui raised segments">
          <div className="ui segment">
            <i className="red search icon"></i>
            <span className="ui input small filter-box">
              <input ref="search" onChange={this.onSearch} id="filter-input" type="text" placeholder="Type to refine results ..." />
            </span>
          </div>
          <div className="ui segment">
            <i className="red unhide icon"></i>
            <span className="small-text">Show</span>
            <div className="ui inline dropdown" id="videosPerPage">
              <span className="text small-text">{this.props.videosPerPage}</span>
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className={show10} data-text="10"><span className="drop-down">10</span></div>
                <div className={show25} data-text="25"><span className="drop-down">25</span></div>
                <div className={show50} data-text="50"><span className="drop-down">50</span></div>
              </div>
              <span className="small-text">videos on page</span>
            </div>
          </div>
          <div className="ui segment">
            <i className="red filter icon filter-icon"></i>
            <span className="small-text">Filter by popular users?</span>
            <div className="ui inline dropdown" id="popularVideos">
              <span className="text small-text">No</span>
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className={showPopular} data-text="Yes"><span className="drop-down">Yes</span></div>
                <div className={hidePopular} data-text="No"><span className="drop-down">No</span></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }
})

const VideoInfo = React.createClass({
  render: function () {

    const { user, link, description, modified_time, stats, metadata } = this.props

    const authorImage = _.get(user, 'pictures.sizes[0].link', 'http://semantic-ui.com/images/avatar/small/elliot.jpg')
    const authorName = _.get(user, 'name')
    const authorLink = _.get(user, 'link')
    const likes = _.get(metadata, 'connections.likes.total', '0')
    const comments = _.get(metadata, 'connections.comments.total', '0')
    const plays = _.get(stats, 'plays', '0')
    const lastModified = moment(modified_time).fromNow()

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
                  {lastModified}
                </div>
              </div>
              <div className="description">
                {description}
              </div>
              <div className="meta">
                <i className="red like icon"></i> {likes} Likes
                <i className="red comments icon"></i> {comments} comments
                <i className="red play icon"></i> {plays} plays
                <a href={link} href="_blank"><i className="red linkify icon"></i>Link</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
})

const VideoList = React.createClass({
  buildVideo: video => <VideoInfo key={video.uri} {...video} />,
  render: function () {
    const videos = this.props.videos.map(this.buildVideo)
    return <main> {videos} </main>
  }
})

const Application = React.createClass({

  getDefaultProps: function () {
    return {
      searchTerms: [],
      videosPerPage: 50,
      popularVideos: false,
      videosChannel: window.com.schibsted.videosChannel,
      filteredVideo: window.com.schibsted.videosChannel.data
    }
  },

  getInitialState: function () {
    return Object.assign({}, this.props)
  },

  updateState: function (newState) {
    const state = Object.assign({}, this.state, newState)
    const filteredVideo = this.getFilteredVideos(state)
    this.setState(Object.assign(state, { filteredVideo }))
  },

  render: function () {
    return (
      <div>
        <Header />
        <VideoList videos={this.state.filteredVideo} />
        <Filter {...this.state} updateState={this.updateState} />
        <Footer />
      </div>
    )
  },

  getFilteredVideos: function ({searchTerms, videosPerPage, popularVideos, videosChannel, filteredVideo}) {
    return filteredVideo
  }
})

ReactDOM.render(
  <Application />,
  document.querySelector('#application')
)
