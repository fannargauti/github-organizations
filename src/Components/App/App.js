import React, { Component } from 'react';
import classNames from 'classnames';
import { getRepos } from '../../utils/requests';
import Repo from '../Repo';
import AnimationInput from '../AnimationInput';
import './App.css';

class App extends Component {
  state = {
    repos: [],
    error: '',
    organization: '',
    headerAnimationFinished: false,
    formAnimationFinished: false,
  };

  stateAnimations = [
    { name: 'headerAnimationFinished', delay: 600 },
    { name: 'formAnimationFinished', delay: 1000 },
  ];

  componentDidMount() {
    this.stateAnimations.forEach((animation) =>
      setTimeout(() => {
        let newState = {};
        newState[animation.name] = true;
        this.setState(newState);
      }, animation.delay)
    );
  }

  handleChange = (e) => {
    this.setState({ organization: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { organization } = this.state;

    if (!organization) {
      return this.setState({
        error: 'Please enter an organization',
      });
    }
    const { repos, error } = await getRepos(organization);

    this.setState({ repos, error });
  };

  render() {
    const {
      repos,
      error,
      organization,
      headerAnimationFinished,
      formAnimationFinished,
    } = this.state;
    return (
      <div className="App">
        <div className="App__formContainer">
          <h1
            className={classNames('App__header', {
              'App__header-visible': headerAnimationFinished,
            })}
          >
            Enter a GitHub organization
          </h1>
          <form
            className={classNames('App__form', {
              'App__form-visible': formAnimationFinished,
            })}
            onSubmit={this.handleSubmit}
          >
            <AnimationInput value={organization} onChange={this.handleChange} />
            <button className="App__button" type="submit">
              let's go
            </button>
          </form>
          {error && <p className="App__error">{error}</p>}
        </div>
        <div className="App__repos">
          {repos.map((repo, index) => (
            <Repo
              key={repo.id}
              organization={organization}
              repo={repo}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
