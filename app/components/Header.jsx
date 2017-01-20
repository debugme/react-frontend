import React from 'react'

const Header = React.createClass({

  render: function () {

    const { filtersActive, toggleMenu } = this.props
    const classes = filtersActive ? 'filter-active content icon' : 'filter-inactive content icon'

    return (
      <header className="header-pane">
        <span className="logo">Video Channel</span>
        <span>
          <a href="#" className="menu" onClick={toggleMenu}><i className={classes}></i></a>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
          <span className="name">Asad Razvi</span>
        </span>
      </header>
    )
  }
})

export default Header