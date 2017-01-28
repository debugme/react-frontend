import React from 'react'

const Header = (props) => {

  const { filtersActive, toggleMenu } = props
  const classes = `header-pane-filter-${filtersActive ? 'active' : 'inactive'} content icon`

  return (
    <header className="header-pane" >
      <span className="header-pane-logo">Video Channel</span>
      <a href="#" className="menu" onClick={toggleMenu}><i className={classes}></i></a>
      <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
      <span className="name">Asad</span>
      <span className="name"> Razvi</span>
    </header >
  )
}

export default Header