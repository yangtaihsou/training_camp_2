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
      accounts: ['9e4d2a2304620cc73f950c39d4bb0898ad8629c1846cfd492435f69e1c7ddd63'],
      chainId: 5,
    },
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: "VPH2RRTCS5WS3V1FIEE818J7MDT4A1SZT5"
  }
};