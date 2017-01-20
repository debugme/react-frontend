const React = require('react')

const Header = React.createClass({
  render: function () {
    const classes = this.props.filtersActive ? 'filter-active content icon' : 'filter-inactive content icon'
    return (
      <header className="header-pane">
        <span className="logo">Video Channel</span>
        <span>
          <a href="#" className="menu"><i className={classes}></i></a>
          <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
          <span className="name">Asad Razvi</span>
        </span>
      </header>
    )
  }
})

module.exports = Header