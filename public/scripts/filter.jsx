var Filter = React.createClass({
  render: function () {
    return (
      <div>
        <div className="ui inverted menu">
          <a className="active item" href="http://www.schibsted.com" alt="Schibsted Logo">S C H I B S T E D</a>
        </div>

        <div className="mini ui buttons" styleName="{marginLeft:8em}">
          <div className="mini ui basic grey button">
            <i className="red file video outline icon"></i>
            <span>Videos per page</span>
          </div>
          <button className="ui grey basic button">10</button>
          <button className="ui grey basic button">25</button>
          <button className="ui grey basic button">50</button>
          <button className="mini ui basic grey toggle button">
            <i className="red heart toggle outline icon" styleName="{marginRight:0.5em}"></i>10+ likes
    </button>
          <button className="ui grey basic button">Next</button>
        </div>
      </div>
    )
  }
});

// ReactDOM.render(
//   <Filter />,
//   document.getElementById('filter')
// );