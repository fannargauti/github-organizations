import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getContributors } from '../../utils/requests';
import RepoIcon from '../RepoIcon';
import RepoDrawer from '../RepoDrawer';
import { ReactComponent as Arrow } from './arrow.svg';
import { ReactComponent as Fork } from './fork.svg';
import { ReactComponent as Star } from './star.svg';
import './Repo.css';

class Repo extends Component {
  state = {
    contributors: [],
    showContributors: false,
    isLoading: false,
    hasFetched: false,
    isVisible: false,
  };

  componentDidMount() {
    const { index } = this.props;
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, index * 100);
  }

  async fetchContributors() {
    const { repo, organization } = this.props;
    const { name } = repo;
    this.setState({ showContributors: true, isLoading: true });
    const contributors = await getContributors(organization, name);
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
    const {
      contributors,
      showContributors,
      isLoading,
      hasFetched,
      isVisible,
    } = this.state;
    const { repo } = this.props;

    return (
      <div className={classNames('Repo', { 'Repo-visible': isVisible })}>
        <div className="Repo__main">
          <img
            className="Repo__ownerImage"
            alt={repo.owner.login}
            src={repo.owner.avatar_url}
          ></img>
          <a className="Repo__url" href={repo.html_url}>
            {repo.name}
          </a>
          <div className="Repo__endContainer">
            <div className="Repo__stats">
              <RepoIcon language={repo.language}></RepoIcon>
              <span className="Repo__stat">
                <Fork /> {repo.forks_count}
              </span>
              <span className="Repo__stat">
                <Star /> {repo.stargazers_count}
              </span>
            </div>
            <button
              className="Repo__contributorsToggle"
              onClick={() => this.toggleContributors()}
            >
              view contributors
              <Arrow
                className={classNames('Repo__toggleArrow', {
                  'Repo__toggleArrow-flip': showContributors,
                })}
              />
            </button>
          </div>
        </div>
        <RepoDrawer
          isVisible={showContributors}
          isLoading={isLoading}
          hasFetched={hasFetched}
          contributors={contributors}
        ></RepoDrawer>
      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.object.isRequired,
  organization: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Repo;
