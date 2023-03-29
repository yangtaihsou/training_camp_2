const { ethers } = require("hardhat");
async function main(){
    const ContractFactory = await ethers.getContractFactory("MyERC721");
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