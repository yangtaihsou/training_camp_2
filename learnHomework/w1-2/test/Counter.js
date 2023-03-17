const { ethers } = require("hardhat");
const { expect } = require("chai");
let counter;

describe("Counter",function(){
    async function init(){
        const [owner, otherAccount]  =  await ethers.getSigners(); 
        
        console.log("owner:"+ owner)
        console.log("otherAccount:"+ otherAccount)
        //ethers.js中的ContractFactory是用于部署新智能合约的抽象，因此此处的Counter是用来实例合约的工厂。
        const Counter = await ethers.getContractFactory("Counter");
        //在ContractFactory上调用deploy()将启动部署，并返回解析为Contract的Promise。 该对象包含了智能合约所有函数的方法。
        counter = await Counter.deploy();
        await counter.deployed();
        console.log("counter:"+ counter.address)
    }

    before(async function(){
        await init();
    });

    it("init equal 0",async function(){
        expect(await counter.get()).to.equal(0);
    });

    it("add 1 equal 1",async function(){
        //在counter 上调用合约方法， 并等待交易执行完毕。
        let tx = await counter.count();
        await tx.wait();
        expect(await counter.get()).to.equal(1);
    });
})