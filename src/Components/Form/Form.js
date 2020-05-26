import React, { Component } from 'react';
import classNames from 'classnames';
import { getRepos } from '../../utils/requests';
import AnimationInput from '../AnimationInput';
import Repos from '../Repos';
import './Form.css';

class Form extends Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { organization } = this.state;
    this.fetchOrganization(organization);
  };

  async fetchOrganization(organization) {
    if (!organization) {
      return this.setState({
        error: 'Please enter an organization',
      });
    }
    const { repos, error } = await getRepos(organization);

    this.setState({ repos, error });
  }
  render() {
    const {
      repos,
      error,
      organization,
      headerAnimationFinished,
      formAnimationFinished,
    } = this.state;
    return (
      <div className="FormContainer">
        <h1
          className={classNames('Form__header', {
            'Form__header-visible': headerAnimationFinished,
          })}
        >
          Enter a GitHub organization
        </h1>
        <form
          className={classNames('Form', {
            'Form-visible': formAnimationFinished,
          })}
          onSubmit={this.handleSubmit}
        >
          <AnimationInput value={organization} onChange={this.handleChange} />
          <button className="Form__button" type="submit">
            let's go
          </button>
        </form>
        {error && <p className="Form__error">{error}</p>}
        {repos && <Repos repos={repos} organization={organization} />}
      </div>
    );
  }
}

export default Form;
