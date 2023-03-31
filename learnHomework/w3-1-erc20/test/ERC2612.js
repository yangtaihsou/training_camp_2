const { ethers } = require("hardhat");
const { expect } = require("chai");


const { ethers2 = ethers } = require("ethers");

let privateKey;// 用户私钥
let owner;
let otherAccount;
let contract;
let sigUtilsContract;

describe("ERC2612", function () {
    async function init() {
        [owner, otherAccount] = await ethers.getSigners();
        const ContractFactory = await ethers.getContractFactory("ERC2612");
        contract = await ContractFactory.deploy();
        await contract.deployed();

        const SigUtilsContractFactory = await ethers.getContractFactory("SigUtils");
        sigUtilsContract = await SigUtilsContractFactory.deploy(contract.DOMAIN_SEPARATOR());
        await sigUtilsContract.deployed();


        privateKey = owner.privateKey;
        return { contract, owner, otherAccount };
    }

    before(async function () {
        await init();
    });


    it("permit2", async function () {

        // // 设置允许授权的金额
        const amount = ethers.utils.parseEther("10");
        const deadline = ethers.constants.MaxUint256;
        const digest = await sigUtilsContract.getTypedDataHash(
            {
                owner: owner.address,
                spender: otherAccount.address,
                value: amount,
                nonce: 0,
                deadline: deadline
            }
        );

        console.log("digest----------", digest);
        const signature = await owner.signMessage(digest);
        console.log("signature----------", signature);
        const { v, r, s } = await getRSV(signature);
        console.log("v:%s,r:%s,s:%s", v, r, s);
        await contract.connect(otherAccount).permit(
            owner.address, otherAccount.address, amount, deadline, v, r, s);
    })

    it("permit1", async function () {
        // 获取当前 Block Number 来用于 nonce
        const latestBlockNumber = await ethers.provider.getBlockNumber()

        // // 设置允许授权的金额
        const amount = ethers.utils.parseEther("10");

        // // 调用 permit 函数以获得签名
        const deadline = ethers.constants.MaxUint256;

        const message = { "test": "123456" }; // 要签名的消息
        const signature = await signMessage(message);
        const { v, r, s } = await getRSV(signature);

        console.log("v:%s,r:%s,s:%s", v, r, s);
        await contract.connect(otherAccount).permit(
            owner.address, otherAccount.address, amount, deadline, v, r, s);
    })



    async function signMessage(message) {
        //privateKey暂时无法获得
        //const signingKey = new ethers2.utils.SigningKey(privateKey);
        //signingKey.signDigest( digest ) 
        const digest = ethers2.utils.arrayify(ethers2.utils.keccak256(ethers2.utils.toUtf8Bytes(message)));
        console.log("digest----------", digest);
        const signature = await owner.signMessage(digest);
        console.log("signature----------", signature);
        return signature;
    }

    function getRSV(signature) {
        const serializedSignature = signatureToRSV(signature);

        const signedMessage = {
            v: serializedSignature.v,
            r: serializedSignature.r,
            s: serializedSignature.s
        };

        return signedMessage;
    }

    function signatureToRSV(signature) {
        const { v, r, s } = ethers2.utils.splitSignature(signature);
        return {
            v: v,
            r: r.toString("hex"),
            s: s.toString("hex")
        };
    }


});