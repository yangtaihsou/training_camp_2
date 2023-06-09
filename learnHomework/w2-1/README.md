# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## 作业题目
• 编写⼀个Bank合约

• 通过 Metamask 向Bank合约转账ETH

• 在Bank合约记录每个地址转账⾦额

• 编写 Bank合约withdraw(), 实现提取出所有的 ETH
## 启动本地区块链节点

`` npx hardhat node``


<datails>
<summary>控制台打印日志，得到私钥和余额</summary>
<pre><code> 
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

Account #6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000 ETH)
Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

Account #8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000 ETH)
Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

Account #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000 ETH)
Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Account #10: 0xBcd4042DE499D14e55001CcbB24a551F3b954096 (10000 ETH)
Private Key: 0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897

Account #11: 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 (10000 ETH)
Private Key: 0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82

Account #12: 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a (10000 ETH)
Private Key: 0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1

Account #13: 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec (10000 ETH)
Private Key: 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd

Account #14: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 (10000 ETH)
Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa

Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61

Account #16: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30 (10000 ETH)
Private Key: 0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0

Account #17: 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E (10000 ETH)
Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd

Account #18: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0 (10000 ETH)
Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0

Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST. 

 </code></pre>
</datails>

## 部署bank到本地区块链

需要在`hardhat.config.js`增加网络配置

``npx hardhat run scripts/deployBank.js --network dev``

部署bank后得到合约地址（可能需要执行两次）
>bank contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3

查询上面bank合约地址的eth余额，balance的task已经提前写好

``npx hardhat balance --account 0x5FbDB2315678afecb367f032d93F642f64180aa3 --network dev``

bank里金额是`0.0 ETH`

### 在metamask钱包连接本地网络
> metamask添加本地网络 http://127.0.0.1:8545/

> metamask导入本地节点的任一私钥，账户余额10000个eth

> metamask给bank合约`0x5FbDB2315678afecb367f032d93F642f64180aa3`转入金额，使用
`npx hardhat balance...`验证

node控制台打印交易
>>![avatar](img/给bank合约转账.png)

### 单元测试
test/Bank.js

需要注意的

1. 合约如果想接收到以太坊金额，需要发送方法，构造tx，即{value:value,from:from}，这里主要是value。见测试`deposit 100 to bank and verify`

    ``.depositEth(100, { value: 100 })``

或者直接调用receive，见测试`getAllBalanceEth002`

````
const tx = { value: amount, to: bank.address };
        const receipt = await otherAccount.sendTransaction(tx);
````

2. 单元测试里，无法直接通过address.balance查询余额（不在区块里）

在合约里调用ddress.balance查询
````
    function getbankOwnerBalanceEth() public view returns (uint) {
        return bankOwner.balance;
    }
````
或者通过ethers命令查询，参考task/balance.js。provider操作rpc
````
 const balance = await ethers.provider.getBalance(address);
````

### 部署合约到goerli网络
https://goerli.etherscan.io/address/0xc038E333Db4Cc5572ffB9E80AAC283696E8a05BC#code

仍然有后门，合约的ether全部转移后，储户可以查询到账户金额，但无法提现了。

### 需要留意的问题
hardhat-toolbox 需要在工程目录下重新安装
````
npm install --save-dev @nomicfoundation/hardhat-toolbox
````