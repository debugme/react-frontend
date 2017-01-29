import React from 'react'

const Navigation = (props) => {

  const { moveToNextPage, togglePopularUsers, togglePageCount, triggerSearch, popularUsers, pageCount, showFilters, rawSearch } = props
  const currentPage = props.index + 1
  const totalPages = props.pages.length
  const pageMessage = totalPages === 1 ? currentPage : `${currentPage} / ${totalPages}`
  const classes = popularUsers === true ? 'red heart icon' : 'heart outline icon'
  const style = { display: showFilters ? 'flex' : 'none' }
  const searchByTerms = ({target}) => triggerSearch(target.value)

  return (
    <nav className="navigation-pane" style={style}>

      <a className="navigation-pane-filter" onClick={moveToNextPage}>
        <span className="navigation-pane-filter-text">Page</span>
        <span className="navigation-pane-filter-text">{pageMessage}</span>
      </a>

      <a className="navigation-pane-filter" onClick={togglePageCount}>
        <span className="navigation-pane-filter-text">Page Count</span>
        <span className="navigation-pane-filter-text">{pageCount}</span>
      </a>

      <a className="navigation-pane-filter" onClick={togglePopularUsers}>
        <span className="navigation-pane-filter-text">Popular Users</span>
        <span className="navigation-pane-filter-text"><i className={classes} /></span>
      </a>

      <span className="navigation-pane-filter">
        <i className="navigation-pane-filter-search-icon search icon" />
        <input className="navigation-pane-filter-search-box" type="text" onInput={searchByTerms} value={rawSearch} />
      </span>

    </nav>
  )
}

export default Navigation
