import React from 'react'
import { debounce } from 'lodash'

const Navigation = React.createClass({

  render: function () {

    const { moveToNextPage, togglePopularUsers, togglePageCount, triggerSearch, popularUsers, pageCount, showFilters } = this.props
    const currentPage = this.props.index + 1
    const totalPages = this.props.pages.length
    const pageMessage = totalPages === 1 ? currentPage : `${currentPage} / ${totalPages}`
    const classes = popularUsers === true ? 'red heart icon' : 'heart outline icon'
    const style = { display: showFilters ? 'flex' : 'none' }
    const debouncedSearch = debounce(triggerSearch, 250)
    const searchByTerms = ({target}) => debouncedSearch(target.value)

    return (
      <nav className="navigation-pane" style={style}>
        <div className="filters">
          <a className="ui label pagination" onClick={moveToNextPage}>
            <span className="filter-text text">Page</span>
            <span className="pagination">{pageMessage}</span>
          </a>
          <a className="ui label page-count" onClick={togglePageCount}>
            <span className="filter-text text">Page Count</span>
            <span className="page-count">{pageCount}</span>
          </a>
          <a className="ui label popular-users" onClick={togglePopularUsers}>
            <span className="filter-text text">Popular Users</span>
            <i className={classes} />
          </a>
          <span className="ui label search-terms">
            <i className="search icon"></i>
            <span className="ui inverted transparent icon input search-box">
              <input className="search-field" type="text" onInput={searchByTerms} />
            </span>
          </span>
        </div>
      </nav>
    )
  }
})

export default Navigation