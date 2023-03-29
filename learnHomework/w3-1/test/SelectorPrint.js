const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("MyERC721", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        const ContractFactory = await ethers.getContractFactory("SelectorPrint");
        const contract = await ContractFactory.deploy();
        await contract.deployed();
        console.log("contract address:", contract.address);


        return { contract, owner, otherAccount };
    }


    it("getSelector", async function () {
        const { contract, owner, otherAccount } = await loadFixture(init); 

        expect(  await contract.connect(owner).getSelector()).equal("0xafac276d");
        expect(  await contract.connect(owner).getSelector2()).equal("0xafac276d");
    })
});