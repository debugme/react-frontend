import React from 'react'
import VideoInfo from 'VideoInfo'

const Content = (props) => {
  const videoList = props.videos.map(video => <VideoInfo key={video.uri} {...video} />)
  return (
    <main className="content-pane">
      {videoList}
    </main>)
}

export default Content