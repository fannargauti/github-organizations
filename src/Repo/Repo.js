import React, { Component } from 'react';
import classNames from 'classnames';
import { getcontributors } from '../requests';
import RepoIcon from '../RepoIcon';
import Contributor from '../Contributor';
import RepoDrawer from '../RepoDrawer';
import { ReactComponent as Arrow } from './arrow.svg';
import './Repo.css';

class Repo extends Component {
  state = {
    contributors: [],
    showContributors: false,
    isLoading: false,
    hasFetched: false,
  };

  async fetchContributors() {
    const { repo, organization } = this.props;
    const { name } = repo;
    this.setState({ showContributors: true, isLoading: true });
    // try catch?
    const contributors = await getcontributors(organization, name);
    this.setState({ contributors, isLoading: false, hasFetched: true });
  }

  toggleContributors() {
    const { hasFetched } = this.state;

    // Flip the showContributors to toggle the drawer
    this.setState((prevState) => {
      return { showContributors: !prevState.showContributors };
    });
    // Only fetch contributors if we haven't before
    if (!hasFetched) {
      this.fetchContributors();
    }
  }

  render() {
    const { contributors, showContributors, isLoading } = this.state;
    const { repo } = this.props;
    console.log(contributors);
    return (
      <div className="Repo">
        <div className="Repo__main">
          <img
            className="Repo__ownerImage"
            alt={repo.owner.login}
            src={repo.owner.avatar_url}
          ></img>
          {repo.name}
          <RepoIcon language={repo.language}></RepoIcon>
          <button
            className="Repo__contributorsToggle"
            onClick={() => this.toggleContributors()}
          >
            toggle contributors
            <Arrow
              className={classNames('Repo__toggleArrow', {
                'Repo__toggleArrow-flip': showContributors,
              })}
            />
          </button>
        </div>
        <RepoDrawer isVisible={showContributors} isLoading={isLoading}>
          {contributors.map((contributor) => (
            <Contributor contributor={contributor}></Contributor>
          ))}
        </RepoDrawer>
      </div>
    );
  }
}

export default Repo;
