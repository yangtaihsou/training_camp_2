const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("TeacherController", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        const TeacherController = await ethers.getContractFactory("TeacherController");
        const teacherController = await TeacherController.deploy();
        await teacherController.deployed();
        console.log("teacherController contract address:", teacherController.address);
        return { teacherController, owner, otherAccount };
    }



    it("deploy", async function () {
        
        const { teacherController, owner, otherAccount } = await loadFixture(init);
    });
})