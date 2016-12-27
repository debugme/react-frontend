var Filter = React.createclassName({
  render: function () {
    return (
      <div>
        <div className="ui raised segments">
          <div className="ui segment">
            <i className="red search icon"></i>
            <span className="ui input small search-box">
              <input id="filter-input" type="text" placeholder="Type to refine results ...">
            </span>
           </div>
            <div className="ui segment">
              <i className="red unhide icon"></i>
              <span className="small-text">Show</span>
              <div className="ui inline dropdown">
                <span className="text small-text">10</span>
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="active item" data-text="10"><span className="drop-down">10</span></div>
                  <div className="item" data-text="25"><span className="drop-down">25</span></div>
                  <div className="item" data-text="50"><span className="drop-down">50</span></div>
                </div>
                <span className="small-text">videos on page</span>
              </div>
            </div>
            <div className="ui segment">
              <i className="red filter icon filter-icon"></i>
              <span className="small-text">Filter by popular users?</span>
              <div className="ui inline dropdown">
                <span className="text drop-down">No</span>
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="active item" data-text="No"><span className="drop-down">No</span></div>
                  <div className="item" data-text="Yes"><span className="drop-down">Yes</span></div>
                </div>
              </div>
            </div>
          </div>
          )
  }
});

ReactDOM.render(
  <Filter />,
  document.getElementByTagName('aside')
)