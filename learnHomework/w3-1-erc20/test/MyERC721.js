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
        const ContractFactory = await ethers.getContractFactory("MyERC721");
        const contract = await ContractFactory.deploy();
        await contract.deployed();
        console.log("contract address:", contract.address);


        return { contract, owner, otherAccount };
    }


    it("mint", async function () {
        const { contract, owner, otherAccount } = await loadFixture(init);
        const tokenId = await contract.connect(owner).mint(
            otherAccount.address, "ipfs://QmPWXj3xcm8VuVuf9CFYjnCpDp7dy2KHEJhQkxebCu8V7p");

        console.log("tokenId:" + tokenId.toString());
       // expect(tokenId ).equal(0);
       
        
        expect(await contract.connect(owner).tokenURI(0)).equal("ipfs://QmPWXj3xcm8VuVuf9CFYjnCpDp7dy2KHEJhQkxebCu8V7p");
        
        expect(await contract.connect(owner).balanceOf( otherAccount.address)).equal(1);
        expect(await contract.connect(owner).ownerOf(0)).equal(otherAccount.address);
        
    });

})
