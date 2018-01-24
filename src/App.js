import React, { Component } from 'react';
import './App.css';
import web3 from './web3'
import contest from './contest'

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await contest.methods.manager().call();
    const players = await contest.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(contest.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ message: 'waiting on successful entry!'})

    const accounts = await web3.eth.getAccounts();
    await contest.methods.enter().send({ 
      value: web3.utils.toWei(this.state.value, 'ether'), 
      from: accounts[0]
    });

    this.setState({ message: 'You are entered!'})
  };

  onClick = async () => {

    this.setState({message: 'waiting on a winner!'});
    
    const accounts = await web3.eth.getAccounts();
    await contest.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({message: 'we have a winner!'})
  }

  render() {
    return (
      <div> 
        <h2>Contest Contract</h2>
        <p>
          This contract is managed by {this.state.manager}
        </p>
        <p>
          There are currently {this.state.players.length} competing to 
          win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
          
          <hr />
          <form onSubmit={this.onSubmit}>
            <h4>Enter the contest!</h4>
            <div>
              <label>How much ether?</label>
              <input 
                value={this.state.value}
                onChange={ event => this.setState({ value: event.target.value})}
              />
            </div>
            <button>Enter!</button>
          </form>
          <hr />

          <h4>Let's pick a winner!</h4>
          <button onClick={this.onClick}>Pick a winner</button>
          <hr />
          <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
