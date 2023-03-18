const { ethers } = require("hardhat");
async function main(){
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    await bank.deployed();
    console.log("bank contract address:", bank.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });