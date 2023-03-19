require("@nomicfoundation/hardhat-toolbox");
require("./task/balance.js");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.api.onfinality.io/public",
      accounts: ['你的私钥'],
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
