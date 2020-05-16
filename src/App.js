import React, { Component } from 'react';
import { getRepos } from './requests';
import Repo from './Repo';
import AnimationInput from './AnimationInput';
import './App.css';

class App extends Component {
  state = {
    repos: [],
    error: '',
    organization: '',
  };

  async componentDidMount() {
    const data = await getRepos('futurice');
    this.setState({ data });
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
    const { repos, error, organization } = this.state;
    console.log(repos);
    return (
      <div className="App">
        <div className="App__formContainer">
          <h1 className="App__header">Enter a GitHub organization</h1>
          <form className="App__form" onSubmit={this.handleSubmit}>
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
