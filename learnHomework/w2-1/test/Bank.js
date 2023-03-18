const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Bank", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        //ethers.js中的ContractFactory是用于部署新智能合约的抽象，因此此处的Counter是用来实例合约的工厂。
        const Bank = await ethers.getContractFactory("Bank");
        //在ContractFactory上调用deploy()将启动部署，并返回解析为Contract的Promise。 该对象包含了智能合约所有函数的方法。
        const bank = await Bank.deploy();
        await bank.deployed();
        //bank合约地址
        console.log("bank contract address:" + bank.address)
        return { bank, owner, otherAccount };
    }



    it("deposit 100 to bank and verify", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        //{ value: 100 }表示tx的value，即msg.value。想让合约有余额，必须这样写
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(100);
    });

    
    it("getAllBalanceEth", async function () {
        const { bank, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        expect(await bank.connect(otherAccount).getAllBalanceEth()).to.equal(200);
    });

    it("getAllBalanceEth002", async function () {
        
        const { bank, owner, otherAccount } = await loadFixture(init);
        const amount = ethers.utils.parseEther("1");
        const tx = {value:amount,to: bank.address};
        const receipt = await otherAccount.sendTransaction(tx);
        await receipt.wait();//等待链上确认交易
         
        let bankcontract = await ethers.getContractAt("Bank",
        "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        
        expect(await bank.connect(otherAccount).getAllBalanceEth()).to.equal(ethers.utils.parseEther("1"));

    });
    

    it("transfer:deposit 100 to bank and withdraw 100 success", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).withdrawEth();
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(0);

    });

    it("transfer,set withdraw amount:deposit 100 to bank and withdraw 100 success", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).withdrawEth001(10);
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(90);

    });

    it("call:deposit 100 to bank and withdraw 100 success", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).withdrawEthCall(100);
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(0);

    });
})