import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import contest from './contest'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { manager: '' }
  }

  async componentDidMount() {
    const manager = await contest.methods.manager().call();
    this.setState({ manager });
  }

  render() {
    return (
      <div> 
        <h2>Contest Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
