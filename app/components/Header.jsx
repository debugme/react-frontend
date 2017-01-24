import React from 'react'

const Header = (props) => {

  const { filtersActive, toggleMenu } = props
  const classes = filtersActive ? 'filter-active content icon' : 'filter-inactive content icon'

  return (
    <header className="header-pane" >
      <span className="logo">Video Channel</span>
      <span>
        <a href="#" className="menu" onClick={toggleMenu}><i className={classes}></i></a>
        <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
        <span className="name">Asad</span>
        <span className="name"> Razvi</span>
      </span>
    </header >
  )
}

export default Header