const React = require('react')
const VideoInfo = require('VideoInfo')

const Content = React.createClass({

  render: function () {
    const videoList = this.props.videos.map(video => <VideoInfo key={video.uri} {...video} />)
    return (
      <main className="content-pane">
        {videoList}
      </main>)
  }
})

module.exports = Content