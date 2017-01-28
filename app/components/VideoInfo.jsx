import React from 'react'
import moment from 'moment'
import { get, truncate } from 'lodash'

const VideoInfo = (props) => {

  const { user, name, link, description, modified_time, stats, metadata } = props
  const authorImage = get(user, 'pictures.sizes[0].link', 'http://semantic-ui.com/images/avatar/small/elliot.jpg')
  const authorName = get(user, 'name')
  const authorLink = get(user, 'link')
  const likes = get(metadata, 'connections.likes.total', '0')
  const comments = get(metadata, 'connections.comments.total', '0')
  const plays = get(stats, 'plays', '0')
  const lastModified = moment(modified_time).fromNow()
  const shortDescription = truncate(description, { length: 300, omission: '...' })

  return (
    <section>
      <div className="ui raised segment feed">
        <div className="event">
          <div className="label">
            <img src={authorImage} />
          </div>
          <div className="content">
            <div className="summary">
              <a className="user" href={authorLink} target="_blank">{authorName}</a>
              <div className="date">
                <span className="text">{lastModified}</span>
              </div>
            </div>
            <div className="video-title">
              <h3 className="ui header"><a className="user" href={link} target="_blank">{name}</a></h3>
            </div>
            <div className="short-description">
              {shortDescription}
            </div>
            <div className="description">
              {description}
            </div>
            <div className="meta">
              <span className="info"><i className="red play icon"></i>{plays}</span><span className="text">plays</span>
              <span className="info"><i className="red like icon"></i>{likes}</span><span className="text">likes</span>
              <span className="info"><i className="red comments icon"></i>{comments}</span><span className="text">comments</span>
              <a href={link} target="_blank"><i className="red linkify icon"></i><span className="infox">video</span><span className="text">link</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoInfo