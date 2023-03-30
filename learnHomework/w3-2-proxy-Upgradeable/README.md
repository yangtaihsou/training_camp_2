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
npm install --save-dev @openzeppelin/contracts
npm install --save-dev @openzeppelin/contracts-upgradeable

## 部署代理合约
###部署第一版合约

`npx hardhat run scripts/deploy_countoz.js --network goerli`

owner：https://goerli.etherscan.io/address/0x6b108bd33842b49983c7c54c6c625387420bd661

会生成3个tx，部署3个合约

* 逻辑合约地址，也可在代理合约的tx列表，浏览器的`Internal Transactions`，找到第一条tx的to地址
https://goerli.etherscan.io/address/0x2322f9296119615a32a766fdd0c04db5f13300fc#code
   * 部署逻辑合约源码
   ` npx hardhat verify 0x2322f9296119615a32a766fdd0c04db5f13300fc --network goerli`
* 代理管理员合约 ProxyAdmin，账户0x6b108bd33842b49983c7c54c6c625387420bd661可以操作
https://goerli.etherscan.io/address/0x700ddccb5ba669da6d0890120cb3706d3c7aadb5#code
* 代理合约地址 TransparentUpgradeableProxy
https://goerli.etherscan.io/address/0xa520B8e8aaa6181f811cf33b34E2B66bB1081Dc7

###升级合约
deploy_countoz2的代理合约地址设置为：`0xa520B8e8aaa6181f811cf33b34E2B66bB1081Dc7`
`npx hardhat run scripts/deploy_countoz2.js --network goerli`升级产生两个tx
* 部署CounterWithOz2.sol合约
  https://goerli.etherscan.io/address/0x4c42db614a2f7cf2c44e13983f4a32fe1b1e2477#code
  
   * 部署逻辑合约源码
   ` npx hardhat verify 0x4c42db614a2f7cf2c44e13983f4a32fe1b1e2477 --network goerli`
* 升级新合约
  https://goerli.etherscan.io/tx/0x6654d7a9e54227a24a7fa5f91562bdc647bd04a223e0b39b7fea7a6df8f65645
  调用代理0xa520B8e8aaa6181f811cf33b34E2B66bB1081Dc7，更新逻辑合约为0x4C42db614A2F7CF2C44e13983f4a32Fe1B1E2477
   `````
   Function: upgrade(address proxy, address implementation) ***
   MethodID: 0x99a88ec4
   0	proxy	address	0xa520B8e8aaa6181f811cf33b34E2B66bB1081Dc7
   1	implementation	address	0x4C42db614A2F7CF2C44e13983f4a32Fe1B1E2477
   `````
## 代理合约的原理
  利用fallback，再利用汇编
   当代理合约收到自身无法处理的函数调用时，将调用代理合约的 fallback 函数来处理该函数调用。代理合约在其 fallback 函数中使用自定义逻辑将调用发送到逻辑合约。
   https://blog.chain.link/upgradable-smart-contracts-zh/
   验证的测试case，见`CounterWithOz2.proxy.js`的increase002
   
   见`CounterFallback.sol`，參考`@openzeppelin/contracts/proxy/Proxy.sol`方法_delegate
## 注意问题
* 函数碰撞
* 自己写代理合约，注意slot槽问题
