var Videos = React.createClass({
  render: () => {
    return (
      <div className="ui feed">
        <div className="event">
          <div className="label">
            <img src="http://semantic-ui.com/images/avatar/small/elliot.jpg" />
          </div>
          <div className="content">
            <div className="summary">
              <a className="user">
                Elliot Fu
            </a> added you as a friend
          <div className="date">
                1 Hour Ago
          </div>
            </div>
            <div className="meta">
              <a className="like">
                <i className="like icon"></i> 4 Likes
          </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
})

// ReactDOM.render(
//   <Videos />,
//   document.getElementById('videos')
// )