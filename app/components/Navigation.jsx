const React = require('react')

const Navigation = React.createClass({

  render: function () {
    const { toggleMenu, moveToNextPage, togglePopularUsers, togglePageCount, popularUsers, pageCount } = this.props
    const currentPage = this.props.index + 1
    const totalPages = this.props.pages.length
    const pageMessage = totalPages === 1 ? currentPage : `${currentPage} / ${totalPages}`
    const classes = popularUsers === true ? 'red heart icon' : 'heart outline icon'
    return (
      <nav className="navigation-pane" click={toggleMenu}>
        <div className="filters">
          <a className="ui label pagination" click={moveToNextPage}>
            <span className="filter-text text">Page</span>
            <span className="pagination">{pageMessage}</span>
          </a>
          <a className="ui label page-count" click={togglePageCount}>
            <span className="filter-text text">Page Count</span>
            <span className="page-count">{pageCount}</span>
          </a>
          <a className="ui label popular-users" click={togglePopularUsers}>
            <span className="filter-text text">Popular Users</span>
            <i className={classes} />
          </a>
          <span className="ui label search-terms">
            <i className="search icon"></i>
            <span className="ui inverted transparent icon input search-box">
              <input className="search-field" type="text" input={triggerSearch} />
            </span>
          </span>
        </div>
      </nav>
    )
  }
})

module.exports = Navigation