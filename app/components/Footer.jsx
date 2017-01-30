import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-pane">
      <a href="mailto:debugme@hotmail.com">
        <i className="icon">&#xf1d8;</i>
        <span className="footer-pane-text">E-Mail</span>
      </a>
      <a href="https://uk.linkedin.com/in/debugme" target="_blank">
        <i className="icon">&#xf0e1;</i>
        <span className="footer-pane-text">LinkedIn</span>
      </a>
      <a href="https://github.com/debugme" target="_blank">
        <i className="icon">&#xf09b;</i>
        <span className="footer-pane-text">GitHub</span>
      </a>
      <a href="https://debugme.wordpress.com/" target="_blank">
        <i className="icon">&#xf19a;</i>
        <span className="footer-pane-text">WordPress</span>
      </a>
      <span className="footer-pane-view-small">
        <i className="red icon">&#xf10a;</i>
        <span className="footer-pane-text">Small</span>
      </span>
      <span className="footer-pane-view-medium">
        <i className="red icon">&#xf109;</i>
        <span className="footer-pane-text">Medium</span>
      </span>
      <span className="footer-pane-view-large">
        <i className="red icon">&#xf108;</i>
        <span className="footer-pane-text">Large</span>
      </span>
    </footer>
  )
}

export default Footer