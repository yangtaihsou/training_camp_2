const { ethers } = require("hardhat");
async function main(){
    const ContractFactory = await ethers.getContractFactory("MyErc20Token");
    const Contract = await ContractFactory.deploy();
    await Contract.deployed();
    console.log("contract address:", Contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });