const { expect } = require('chai');
const { ethers, upgrades } = require("hardhat");
let CounterWithOz;
let CounterWithOz2;
let counterWithOz;
let counterWithOz2;
let otherAccount;
let owner;
describe('CounterWithOz2 (proxy)', function () {
    beforeEach(async function () {
        CounterWithOz = await ethers.getContractFactory("CounterWithOz");
        CounterWithOz2 = await ethers.getContractFactory("CounterWithOz2");

        counterWithOz = await upgrades.deployProxy(CounterWithOz, [42], { initializer: 'initialize' });
        console.log("counterWithOz proxy：%s", counterWithOz.address);
        counterWithOz2 = await upgrades.upgradeProxy(counterWithOz.address, CounterWithOz2);
        //counterWithOz2和counterWithOz相等
        console.log("counterWithOz2 proxy： %s", counterWithOz2.address);


        [owner, otherAccount] = await ethers.getSigners();
    });

    // Test case
    it('get', async function () {
        expect(await counterWithOz2.get()).to.equal(42);
    });

    it('add', async function () {
        await counterWithOz2.add(10);
        expect(await counterWithOz2.get()).to.equal(52);
    });

    // 另外可以用 counterWithOz.increase()证明没有代理increase方法
    it('increase', async function () {
        
        await counterWithOz2.increase();
        expect(await counterWithOz2.get()).to.equal(43);
    });


    /**
     * 通过构造tx数据，进行测试。验证走的fallback
     */
    it('increase002', async function () {
        //counterWithOz2 otherAccount 这里地址随意
        const contractAddress = owner.address;
        const contractABI = ["function increase() public"];
        //第三个参数必须owner或者otherAccount，从ethers.getSigners()得到
        const contract = new ethers.Contract(contractAddress, contractABI, owner);
        const functionData = contract.interface.encodeFunctionData("increase");

        //to是代理合约，其实不存在increase方法
        const tx = { data: functionData, to: counterWithOz2.address };
        //直接给地址转账
        const receipt = await otherAccount.sendTransaction(tx);
        await receipt.wait();//等待链上确认交易
        expect(await counterWithOz2.get()).to.equal(43);
    });
});