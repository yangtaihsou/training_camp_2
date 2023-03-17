require("@nomicfoundation/hardhat-toolbox");

// 填入自己的私钥或助记词，
const PRIVATE_KEY1 = "";
const PRIVATE_KEY2 = "";
const Mnemonic = "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.api.onfinality.io/public",
      accounts: ['',PRIVATE_KEY2],
      chainId: 5,
    },
    
     mumbai: {
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      accounts: {
        mnemonic: Mnemonic,
      },
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: ""
  }
};
