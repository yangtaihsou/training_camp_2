const { ethers, upgrades } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

async function main() {


  // Upgrading
  const CounterWithOz2 = await ethers.getContractFactory("CounterWithOz2");
  const upgraded = await upgrades.upgradeProxy("0xa520B8e8aaa6181f811cf33b34E2B66bB1081Dc7", CounterWithOz2);

  let currentImplAddress = await getImplementationAddress(ethers.provider, upgraded.address);
  console.log(`Please verify AppController: npx hardhat verify ${currentImplAddress} `);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });