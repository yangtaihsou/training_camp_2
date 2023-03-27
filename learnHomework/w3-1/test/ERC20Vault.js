const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require("@ethersproject/bignumber");

describe("ERC20Vault", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        const ContractFactory = await ethers.getContractFactory("MyErc20Token");
        const MyErc20Token = await ContractFactory.deploy();
        await MyErc20Token.deployed();
        console.log("MyErc20Token contract address:", MyErc20Token.address);

        const ERC20VaultFactory = await ethers.getContractFactory("ERC20Vault");
        const ERC20Vault = await ERC20VaultFactory.deploy(MyErc20Token.address);
        await ERC20Vault.deployed();
        console.log("ERC20Vault contract address:", ERC20Vault.address);

        return { MyErc20Token, owner, otherAccount, ERC20Vault };
    }



    it("deposit", async function () {
        const { MyErc20Token, owner, otherAccount, ERC20Vault } = await loadFixture(init);

        //给owner mint一些erc20 token的额度
        await MyErc20Token.connect(owner).mint(
            owner.address, BigNumber.from("100000000000000000000"));

        //将owner的token存入vault合约
        await ERC20Vault.connect(owner).deposit(BigNumber.from("30000000000000000000"));

        //查询owner的剩余token
        expect(await MyErc20Token.connect(owner).balanceOf(
            owner.address)).equal("70000000000000000000");
        //查询owner在vault的存款
        expect(await ERC20Vault.connect(owner).balanceOf()).equal("30000000000000000000");
    })


    it("withdraw", async function () {
        const { MyErc20Token, owner, otherAccount, ERC20Vault } = await loadFixture(init);

        //给owner mint一些erc20 token的额度
        await MyErc20Token.connect(owner).mint(
            owner.address, BigNumber.from("100000000000000000000"));

        //将owner的token存入vault合约
        await ERC20Vault.connect(owner).deposit(BigNumber.from("30000000000000000000"));
        //owner从vault合约取出token
        await ERC20Vault.connect(owner).withdraw(BigNumber.from("10000000000000000000"));

        //查询owner的剩余token
        expect(await MyErc20Token.connect(owner).balanceOf(
            owner.address)).equal("80000000000000000000");
        //查询owner在vault的存款
        expect(await ERC20Vault.connect(owner).balanceOf()).equal("20000000000000000000");
    })
})