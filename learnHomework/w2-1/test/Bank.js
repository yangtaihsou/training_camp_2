const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Bank",function(){
    async function init(){
        const [owner, otherAccount]  =  await ethers.getSigners(); 
        //部署合约的作者地址
        console.log("deloyed owner address:"+ owner.address)
        //随意生成的一个地址
        console.log("otherAccount:"+ otherAccount.address)
        //ethers.js中的ContractFactory是用于部署新智能合约的抽象，因此此处的Counter是用来实例合约的工厂。
        const Bank = await ethers.getContractFactory("Bank");
        //在ContractFactory上调用deploy()将启动部署，并返回解析为Contract的Promise。 该对象包含了智能合约所有函数的方法。
        const bank = await Bank.deploy();
        await bank.deployed();
        //bank合约地址
        console.log("bank contract address:"+ bank.address)
        return {bank,owner, otherAccount};
    }

 

    it("init equal 100",async function(){
        const { bank, owner, otherAccount} =
        await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100);
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(100);

        const bankAddress = bank.address;
        console.log("bank address:"+ bankAddress)
        const ownerBalance =  bankAddress.balance;
        console.log("bank balance:"+ ownerBalance)
        
        //ownerBalance = await bank.connect(otherAccount).getOwnerBalance()
        console.log("bank balance:"+ await bank.connect(owner).getOwnerBalance())

        expect(await bank.totalSupply()).to.equal(ownerBalance);

    });

 
})