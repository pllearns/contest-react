import React, { Component } from 'react';
import './App.css';
import web3 from './web3'
import contest from './contest'

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };

  async componentDidMount() {
    const manager = await contest.methods.manager().call();
    const players = await contest.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(contest.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div> 
        <h2>Contest Contract</h2>
        <p>
          This contract is managed by {this.state.manager}
          There are currently {this.state.players.length} competing to 
          win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
          </p>
      </div>
    );
  }
}

export default App;
