import Web3 from 'web3';

// rip out older web3 that Metamask uses
const web3 = new Web3(window.web3.currentProvider);

export default web3;