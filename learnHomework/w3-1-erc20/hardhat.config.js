require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
};


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.api.onfinality.io/public",
      accounts: [''],
      chainId: 5,
    },
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: ""
  }
};