const PageNav = React.createClass({

  componentDidMount: function() {
    const { move } = this.props
    const refName = `move-${move}`
    const anchor = this.refs[refName]

    $(anchor).on('click', function(event) {
      console.log('clicked', event.target);
    })
  },

  render: function() {
    const { move } = this.props
    const iconClass = `${move} arrow icon`
    const placement = move === 'left' ? {left: '0.35em'} : {right: '0.35em'}
    const refName = `move-${move}`

    return (
      <div className="page" style={placement}>
        <a ref={refName} className="ui circular label">
          <i className={iconClass}></i>
        </a>
      </div>
    )
  }

})      <a className="ui label">
        <i className="chevron circle right black icon"></i> 1 / 5
      </a>




.content-pane .page {
  top: calc(100vh / 2.1 );
  position: fixed;
}

.content-pane .page a {
  padding: 0;
  background-color: #1B1C1D;
}

.content-pane .page a.ui.label:hover {
  background-color: #1B1C1D;
 }

.content-pane .page .ui.label>.icon {
  margin: 0;
  color: #4183C4;
}

.content-pane .page .ui.label>.icon:hover {
  margin: 0;
  color: #DB2828;
}

.content-pane .video-list {
  flex: 1;
  padding: 2em 2em 0em 2em;
}

.content-pane section {
  margin-bottom: 2em;
}








// const classes = popularVideos === true ? 'red toggle on icon' : 'toggle off icon'









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




         // <span className="ui label search-box">
          //   <i className="red search icon"></i>
          //   <span className="ui input small search-box">
          //     <input type="text" />
          //   </span>
          // </span>

          // <span className="ui label page-count">
          //   <span className="filter-text">Page Count</span>
          //   <span><a class="ui red circular label">2</a></span>
          // </span>

          // <span className="ui label pagination">
          //   <i className="left circle arrow icon"></i>
          //   <span className="filter-text">1 of 5</span>
          //   <i className="right circle arrow icon"></i>
          // </span>

          // <a className="ui label page-count">
          //   <span className="filter-text">Page Count</span>
          //   <span>25</span>
          // </a>



          // <a className="ui cicular label">
          //   <i className="red heart icon"></i>
          // </a>

          // <a className="ui cicular label">
          //   <span className="page-count" style={{color: 'red'}}>{pageCount}</span>
          // </a>