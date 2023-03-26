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

        const ScoreStore = await ethers.getContractFactory("ScoreStore");
        const scoreStore = await ScoreStore.deploy();
        await scoreStore.deployed();

        return { teacherController, owner, otherAccount, scoreStore };
    }



    it("verify deploy ScoreStore", async function () {

        const { teacherController, owner, otherAccount } = await loadFixture(init);
    });

    it("add a teacher", async function () {

        const { teacherController, owner, otherAccount } = await loadFixture(init);

        await teacherController.connect(owner).addTeacher(otherAccount.address);

        expect(await teacherController.connect(owner).getTeacher(otherAccount.address))
            .equal(otherAccount.address);
    });

    it("setStudentScore", async function () {
        const { teacherController, owner, otherAccount, scoreStore } = await loadFixture(init);

        await teacherController.connect(owner).addTeacher(otherAccount.address);

        const studentAddress = "0x032df3014aA46cAa53D324fB006b39eDd163e27d";
        await teacherController.connect(otherAccount).setStudentScore(
            studentAddress, "math",
            90);

        //通过老师控制器查询学生分数。老师控制器部署分数合约
        expect(await teacherController.connect(otherAccount).getStudentScore(studentAddress, "math"))
            .equal(90);


        const scoreStoreAddress = await teacherController.connect(otherAccount).getScoreStoreAddress();
        console.log("ScoreStore contract address:%s", scoreStoreAddress);
        //通过分数合约scoreStore，直接连接合约地址，数据为空。待咨询
        expect(await scoreStore.connect(scoreStoreAddress).getScoreByStudent(studentAddress, "math"))
            .equal(0);

       /* const provider = ethers.provider;
        const abi = ["function getScoreByStudent(address student,string) external view returns (uint8)"];
        const contract = ethers.Contract(scoreStoreAddress, abi, provider);
        expect(await contract.getScoreByStudent(studentAddress, "math")).equal(0);*/


    });


})