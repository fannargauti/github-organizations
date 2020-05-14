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
        <h1>Enter a organization to get started</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="org"
            placeholder="futurice"
            value={organization}
            onChange={(event) => this.handleChange(event)}
          ></input>
          <button type="submit">get repos</button>
        </form>
        {repos && (
          <div className="App__repos">
            {repos.map((repo) => (
              <Repo
                key={repo.id}
                organization={organization}
                repo={repo}
              ></Repo>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
