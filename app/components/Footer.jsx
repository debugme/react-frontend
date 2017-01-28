import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-pane">
      <a href="mailto:debugme@hotmail.com">
        <i className="send icon"/>
        <span className="footer-pane-text">E-Mail</span>
      </a>
      <a href="https://uk.linkedin.com/in/debugme" target="_blank">
        <i className="linkedin square icon"/>
        <span className="footer-pane-text">LinkedIn</span>
      </a>
      <a href="https://github.com/debugme" target="_blank">
        <i className="github icon"/>
        <span className="footer-pane-text">GitHub</span>
      </a>
      <a href="https://debugme.wordpress.com/" target="_blank">
        <i className="wordpress icon"/>
        <span className="footer-pane-text">WordPress</span>
      </a>
      <span className="footer-pane-view-small">
        <i className="red tablet icon"/>
        <span className="footer-pane-text">Small</span>
      </span>
      <span className="footer-pane-view-medium">
        <i className="red laptop icon"/>
        <span className="footer-pane-text">Medium</span>
      </span>
      <span className="footer-pane-view-large">
        <i className="red desktop icon"/>
        <span className="footer-pane-text">Large</span>
      </span>
    </footer>
  )
}

export default Footer