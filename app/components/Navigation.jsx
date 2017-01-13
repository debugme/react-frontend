const React = require('react')

const Navigation = React.createClass({

  componentDidMount: function () {
    const { moveToNextPage, togglePageCount, togglePopularUsers, triggerSearch } = this.props
    document.querySelector('a.pagination').addEventListener('click', moveToNextPage)
    document.querySelector('a.popular-users').addEventListener('click', togglePopularUsers)
    document.querySelector('a.page-count').addEventListener('click', togglePageCount)
    document.querySelector('.search-field').addEventListener('input', triggerSearch)
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

module.exports = Navigation