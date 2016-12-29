const PageNav = React.createClass({

  componentDidMount: function() {
    const { move } = this.props
    const refName = `move-${move}`
    const anchor = this.refs[refName]

    $(anchor).on('click', function(event) {
      console.log('clicked', event.target);
    })
  },

  render: function() {
    const { move } = this.props
    const iconClass = `${move} arrow icon`
    const placement = move === 'left' ? {left: '0.35em'} : {right: '0.35em'}
    const refName = `move-${move}`

    return (
      <div className="page" style={placement}>
        <a ref={refName} className="ui circular label">
          <i className={iconClass}></i>
        </a>
      </div>
    )
  }

})      <a className="ui label">
        <i className="chevron circle right black icon"></i> 1 / 5
      </a>




.content-pane .page {
  top: calc(100vh / 2.1 );
  position: fixed;
}

.content-pane .page a {
  padding: 0;
  background-color: #1B1C1D;
}

.content-pane .page a.ui.label:hover {
  background-color: #1B1C1D;
 }

.content-pane .page .ui.label>.icon {
  margin: 0;
  color: #4183C4;
}

.content-pane .page .ui.label>.icon:hover {
  margin: 0;
  color: #DB2828;
}

.content-pane .video-list {
  flex: 1;
  padding: 2em 2em 0em 2em;
}

.content-pane section {
  margin-bottom: 2em;
}