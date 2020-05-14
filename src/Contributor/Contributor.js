import React, { Component } from 'react';
import './Contributor.css';

class Contributor extends Component {
  render() {
    const { contributor } = this.props;
    console.log(contributor);
    return (
      <div className="Contributor">
        <h4>{contributor.login}</h4>
        <img
          className="Contributor__avatar"
          alt={contributor.login}
          src={contributor.avatar_url}
        ></img>
      </div>
    );
  }
}

export default Contributor;
