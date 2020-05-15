import React, { Component } from 'react';
import { getRepos } from './requests';
import Repo from './Repo';
import './App.css';

class App extends Component {
  state = { repos: [], organization: 'futurice' };

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
    const repos = await getRepos(organization);
    this.setState({ repos });
  };

  render() {
    const { repos, organization } = this.state;
    return (
      <div className="App">
        <h1 className="App__header">Enter a GitHub organization</h1>
        <form className="App__form" onSubmit={this.handleSubmit}>
          <input
            className="App__input"
            type="text"
            name="org"
            placeholder="futurice"
            value={organization}
            onChange={(event) => this.handleChange(event)}
          ></input>
          <button className="App__button" type="submit">
            get repos
          </button>
        </form>
        {repos && (
          <div className="App__repos">
            {repos.map((repo, index) => (
              <Repo
                key={repo.id}
                organization={organization}
                repo={repo}
                index={index}
              ></Repo>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
