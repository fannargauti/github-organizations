import React, { Component } from 'react';
import './RepoIcon.css';

class RepoIcon extends Component {
  getRepoIconSrc(language) {
    const { PUBLIC_URL } = process.env;
    switch (language) {
      case 'Java':
        return `${PUBLIC_URL}/icons/java.png`;
      case 'JavaScript':
        return `${PUBLIC_URL}/icons/javascript.png`;
      case 'Python':
        return `${PUBLIC_URL}/icons/python.png`;
      case 'CSS':
        return `${PUBLIC_URL}/icons/css.svg`;
      case 'Ruby':
        return `${PUBLIC_URL}/icons/ruby.png`;
      default:
        break;
    }
  }
  render() {
    const { language } = this.props;
    const src = this.getRepoIconSrc(language);
    if (!src) {
      return <span className="RepoIcon__fallback">{language}</span>;
    }
    return <img alt={language} className="RepoIcon" src={src}></img>;
  }
}

export default RepoIcon;
