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

* 发⾏⼀个 ERC721 Token（⽤⾃⼰的名字）
  * 铸造 ⼀个 NFT，在测试⽹上发⾏，在 Opensea 上查看
  * 编写⼀个合约：使⽤⾃⼰发⾏的ERC20 Token 来买卖NFT：
  * NFT 持有者可上架 NFT（list 设置价格 多少个 TOKEN 购买 NFT ）
  * 编写购买NFT ⽅法，转⼊对应的TOKEN，获取对应的 NFT

## 合约部署的地址
* Erc20Token： https://goerli.etherscan.io/address/0x57B6d8025bb5790E1b3aA54546fE4F092F473360#code
* MyErc20Token：https://goerli.etherscan.io/address/0x7567c1E4980f3Dd6AbC0A94C7a6393d7A1e5E723#code
* nft MyERC721: https://goerli.etherscan.io/address/0x650896355724Edf3C4cE1615a81435174543D4a6#code

## nft查看
由于部署在goerli，需要在opensea的testnets上查看

https://testnets.opensea.io/zh-CN/account/created

具体NFT链接

https://testnets.opensea.io/zh-CN/assets/goerli/0x650896355724edf3c4ce1615a81435174543d4a6/0


## 注意问题
>安装bignumber ` npm install --save-dev @ethersproject/bignumber`

### 上传ERC20Vault合约代码
需要添加初始化参数
` npx hardhat verify 0x7567c1E4980f3Dd6AbC0A94C7a6393d7A1e5E723  --network goerli "0x57B6d8025bb5790E1b3aA54546fE4F092F473360" `