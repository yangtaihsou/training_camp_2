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

## 题目
* 发行一个 erc20 token
* 编写token的金库valut合约
  * 编写deposit方法，实现erc20存入valut，并记录每个用户存款金额
  * 编写withdraw方法，提取用户自己的存款
* 进阶练习
   * 使用ERC2612标准token，使用签名方法deposit


## 注意问题
>安装bignumber ` npm install --save-dev @ethersproject/bignumber`