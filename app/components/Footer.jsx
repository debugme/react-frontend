import React from 'react'

const Footer = React.createClass({
  render: function () {
    return (
      <footer className="footer-pane">
        <span className="social-links">
          <a href="mailto:debugme@hotmail.com">
            <i className="send icon"></i>
            <span className="text">E-Mail</span>
          </a>
          <a href="https://uk.linkedin.com/in/debugme" target="_blank">
            <i className="linkedin square icon"></i>
            <span className="text">LinkedIn</span>
          </a>
          <a href="https://github.com/debugme" target="_blank">
            <i className="github icon"></i>
            <span className="text">GitHub</span>
          </a>
          <a href="https://debugme.wordpress.com/" target="_blank">
            <i className="wordpress icon"></i>
            <span className="text">WordPress</span>
          </a>
          <span className="view">
            <span className="small">
              <i className="red tablet icon"></i>
              <span className="text">Small</span>
            </span>
            <span className="medium">
              <i className="red laptop icon"></i>
              <span className="text">Medium</span>
            </span>
            <span className="large">
              <i className="red desktop icon"></i>
              <span className="text">Large</span>
            </span>
          </span>
        </span>
      </footer>
    )
  }
})

export default Footer