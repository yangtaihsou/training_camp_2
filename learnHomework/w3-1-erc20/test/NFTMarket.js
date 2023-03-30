const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require("@ethersproject/bignumber");

describe("NFTMarket", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        //部署erc20 
        const ContractFactory = await ethers.getContractFactory("MyErc20Token");
        const MyErc20Token = await ContractFactory.deploy();
        await MyErc20Token.deployed();
        console.log("MyErc20Token contract address:", MyErc20Token.address);

        const MyERC721Factory = await ethers.getContractFactory("MyERC721");
        const NFTContract = await MyERC721Factory.deploy();
        await NFTContract.deployed();
        console.log("NFTContract contract address:", NFTContract.address);


        const NFTMarketFactory = await ethers.getContractFactory("NFTMarket");
        const NFTMarket = await NFTMarketFactory.deploy(MyErc20Token.address, NFTContract.address);
        await NFTMarket.deployed();
        console.log("NFTMarket contract address:", NFTMarket.address);

        return { MyErc20Token, owner, otherAccount, NFTContract, NFTMarket };
    }



    it("list and buy", async function () {
        const { MyErc20Token, owner, otherAccount, NFTContract, NFTMarket } = await loadFixture(init);
        //建造一个nft
        let tokenId = await NFTContract.connect(owner).mint(
            owner.address, "ipfs://QmPWXj3xcm8VuVuf9CFYjnCpDp7dy2KHEJhQkxebCu8V7p");


        expect(await NFTContract.connect(otherAccount).ownerOf(0)).equal(owner.address);
        //将owner的nft授权给nft托管合约
        await NFTContract.connect(owner).approve(NFTMarket.address, 0);

        //将owner的nft，转给nft托管合约并设置价格。上架成功
        await NFTMarket.connect(owner).list(0, ethers.utils.parseEther('2.1'));

        expect(await NFTContract.connect(otherAccount).ownerOf(0)).equal(NFTMarket.address);

        //给otherAccount mint一些MyErc20Token
        await MyErc20Token.connect(owner).mint(
            otherAccount.address, ethers.utils.parseEther('2.9'));

        //mint后，otherAccount给NFTMarket账户授权erc20额度
        await MyErc20Token.connect(otherAccount).approve(
            NFTMarket.address, ethers.utils.parseEther('2.7'))



        //otherAccount授权erc20token额度后，去购买nft。按照原价2.1扣款
        await NFTMarket.connect(otherAccount).buy(0, ethers.utils.parseEther('2.2'));

        //otherAccount剩余的erc20 token。2.9-2.1=0.8
        expect(await MyErc20Token.connect(otherAccount).balanceOf(
            otherAccount.address)).equal(ethers.utils.parseEther('0.8'));


        //otherAccount给NFTMarket账户授权剩余的erc20额度。2.7-2.1=06
        expect(await MyErc20Token.connect(otherAccount).allowance(otherAccount.address,
            NFTMarket.address)).equal(ethers.utils.parseEther('0.6'));

        //NFT已经转给了otherAccount账户
        expect(await NFTContract.connect(owner).ownerOf(0)).equal(otherAccount.address);
    })
})