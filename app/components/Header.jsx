import React from 'react'

const Header = (props) => {

  const { filtersActive, toggleMenu } = props
  const classes = `header-pane-filter-${filtersActive ? 'active' : 'inactive'} icon`

  return (
    <header className="header-pane">
      <span className="header-pane-logo">VIDEO CHANNEL</span>
      <a href="#" className="header-pane-menu" onClick={toggleMenu}><i className={classes}>&#xf0c9;</i></a>
      <img className="header-pane-avatar" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
      <span className="header-pane-name">Asad</span>
      <span className="header-pane-name"> Razvi</span>
    </header >
  )
}

export default Header
