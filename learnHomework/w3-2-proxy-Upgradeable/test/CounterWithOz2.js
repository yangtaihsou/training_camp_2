const { expect } = require('chai');
let contract;
let owner;
let otherAccount;

describe("CounterWithOz2", function () {
    beforeEach(async function () {
        [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        const ContractFactory = await ethers.getContractFactory("CounterWithOz2");
        contract = await ContractFactory.deploy();
        await contract.deployed();
        console.log("contract address:", contract.address);

        return { contract, owner, otherAccount };
    })

    // Test case
    it('get', async function () {
        expect(await contract.get()).to.equal(0);
    });


    it('add', async function () {
        await contract.add(10);
        expect(await contract.get()).to.equal(10);
    });

    it('increase', async function () {
        await contract.increase();
        expect(await contract.get()).to.equal(1);
    });

})