const React = require('react')
const VideoInfo = require('VideoInfo')

const Content = React.createClass({

  buildVideo: function (video) {
    return <VideoInfo key={video.uri} {...video} />
  },

  render: function () {
    const videos = this.props.videos.map(this.buildVideo)
    return (
      <main className="content-pane">
        {videos}
      </main>)
  }
})

module.exports = Content