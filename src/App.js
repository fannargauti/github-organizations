import React, { Component } from 'react';
import { getRepos } from './requests';
import './App.css';

class App extends Component {
  state = { data: {}, inputValue: 'futurice' };

  async componentDidMount() {
    const data = await getRepos('futurice');
    this.setState({ data });
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    const data = await getRepos(inputValue);
    this.setState({ data });
  };

  render() {
    const { data, inputValue } = this.state;
    return (
      <div className="App">
        <h1>Enter a organization to get started</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="org"
            placeholder="futurice"
            value={inputValue}
            onChange={(event) => this.handleChange(event)}
          ></input>
          <button type="submit">get repos</button>
        </form>
      </div>
    );
  }
}

export default App;
