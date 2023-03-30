const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require("@ethersproject/bignumber");

describe("MyErc20Token", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        const ContractFactory = await ethers.getContractFactory("MyErc20Token");
        const contract = await ContractFactory.deploy();
        await contract.deployed();
        console.log("contract address:", contract.address);


        return { contract, owner, otherAccount };
    }



    it("erc20 metadata", async function () {
        const { contract, owner, otherAccount } = await loadFixture(init);
        expect(await contract.connect(otherAccount).name()).equal("A");
        expect(await contract.connect(otherAccount).decimals()).equal(18);
        expect(await contract.connect(otherAccount).symbol()).equal("A1");
        console.log("token totalSupply:", await contract.connect(otherAccount).totalSupply());
        expect(await contract.connect(otherAccount).totalSupply()).equal("1000000000000000000000000");
    });



    it("erc20 approve", async function () {
        const { BigNumber } = require("@ethersproject/bignumber");
        const { contract, owner, otherAccount } = await loadFixture(init);
        await contract.connect(owner).approve(
            otherAccount.address, BigNumber.from("100000000000000000000"))

        expect(await contract.connect(otherAccount).allowance(owner.address,
            otherAccount.address)).equal("100000000000000000000");
    });


    it("increaseAllowance", async function () {
        const { contract, owner, otherAccount } = await loadFixture(init);
        await contract.connect(owner).approve(
            otherAccount.address, BigNumber.from("100000000000000000000"));
        await contract.connect(owner).increaseAllowance(
            otherAccount.address, BigNumber.from("100000000000000000000"));

        expect(await contract.connect(otherAccount).allowance(owner.address,
            otherAccount.address)).equal("200000000000000000000");
    });


    it("decreaseAllowance", async function () {
        const { BigNumber } = require("@ethersproject/bignumber");
        const { contract, owner, otherAccount } = await loadFixture(init);
        await contract.connect(owner).approve(
            otherAccount.address, BigNumber.from("100000000000000000000"));
        await contract.connect(owner).decreaseAllowance(
            otherAccount.address, BigNumber.from("50000000000000000000"));

        expect(await contract.connect(otherAccount).allowance(owner.address,
            otherAccount.address)).equal("50000000000000000000");
    });



    it("mint and balanceOf", async function () {
        const { BigNumber } = require("@ethersproject/bignumber");
        const { contract, owner, otherAccount } = await loadFixture(init);
        //使用owner连接
        await contract.connect(owner).mint(
            otherAccount.address, BigNumber.from("1000000000000000000000000"));

        expect(await contract.connect(otherAccount).balanceOf(
            otherAccount.address)).equal("1000000000000000000000000");
    });

    it("transfer", async function () {
        const { BigNumber } = require("@ethersproject/bignumber");
        const { contract, owner, otherAccount } = await loadFixture(init);
        await contract.connect(owner).mint(
            owner.address, BigNumber.from("900000000000000000000000"));
        await contract.connect(owner).mint(
            otherAccount.address, BigNumber.from("300000000000000000000000"));
        //从owner转2到otherAccount
        await contract.connect(owner).transfer(
            otherAccount.address, BigNumber.from("200000000000000000000000"));

        expect(await contract.connect(owner).balanceOf(
            owner.address)).equal("700000000000000000000000");
        expect(await contract.connect(owner).balanceOf(
            otherAccount.address)).equal("500000000000000000000000");
    });



    it("transferFrom", async function () {
        const { BigNumber } = require("@ethersproject/bignumber");
        const { contract, owner, otherAccount } = await loadFixture(init);
        await contract.connect(owner).mint(
            owner.address, BigNumber.from("900000000000000000000000"));
        await contract.connect(owner).mint(
            otherAccount.address, BigNumber.from("300000000000000000000000"));
        //从owner转2到otherAccount
        await contract.connect(owner).transfer(
            otherAccount.address, BigNumber.from("200000000000000000000000"));

        expect(await contract.connect(owner).balanceOf(
            owner.address)).equal("700000000000000000000000");
        expect(await contract.connect(owner).balanceOf(
            otherAccount.address)).equal("500000000000000000000000");
    });

})