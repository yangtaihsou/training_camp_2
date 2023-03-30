const { ethers } = require("hardhat");
async function main(){
    const ContractFactory = await ethers.getContractFactory("MyErc20Token");
    const Contract = await ContractFactory.deploy();
    await Contract.deployed();
    console.log("contract address:", Contract.address);
    const ERC20VaultFactory = await ethers.getContractFactory("ERC20Vault");
    const ERC20Vault = await ERC20VaultFactory.deploy(Contract.address);
    await ERC20Vault.deployed();
    console.log("ERC20Vault contract address:", ERC20Vault.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });