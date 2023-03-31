# w4-1-ethers-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 创建项目
执行`npm init vue@latest`，一步步往下执行，可以修改默认项目名字

## 合约部署
使用`w3-1-erc20`中的合约，部署token：erc2612合约、bank合约

```
npx hardhat run scripts/deploy_2612_bank.js --network dev 

```

若使用默认的助记词，则生成的ERC2612的地址是：0x5FbDB2315678afecb367f032d93F642f64180aa3
Bank地址是：0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

`npx hardhat node`启动的本地网络，部署合约地址，默认使用第一个账户1`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`进行部署
ERC2612合约会默认给账户1初始化2612个token。
````
  constructor() ERC20("ERC2612", "ERC2612") ERC20Permit("ERC2612") {
        _mint(msg.sender, 2612 * 10 ** 18);
    }
````

所以连接钱包地址后，

若你部署后的地址不一样，请修改 /deployments/dev/ERC2612.json 及  /deployments/dev/Bank.json

## 使用ethers实践
安装`npm i ethers`如果有问题，
请导入`import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.6.9.esm.min.js";`
* ethers连接钱包
  > new ethers.providers.Web3Provider(window.ethereum)
* 查询钱包地址
  ````
        this.accounts = await this.provider.send("eth_requestAccounts", []);
        console.log("accounts:" + this.accounts);
        this.account = this.accounts[0];
  ````
* 获得钱包签名对象，可以发起tx
   > this.signer = this.provider.getSigner()
* 创建合约对象
  ````
     this.erc20Token = new ethers.Contract(erc2612Addr.address,
        erc2612Abi, this.signer);

    this.bank = new ethers.Contract(bankAddr.address,
        bankAbi, this.signer);
  ````
  * 查询钱包的eth余额
  ````
      this.provider.getBalance(this.account).then((r) => {
        this.ethbalance = ethers.utils.formatUnits(r, 18);
      });
  ````
  * 调用合约的方法

  ````
     读方法
      this.erc20Token.totalSupply().then((r) => {
        this.supply = ethers.utils.formatUnits(r, 18);
      })

      this.erc20Token.balanceOf(this.account).then((r) => {
        this.balance = ethers.utils.formatUnits(r, 18);
      })
  ````
  ````
    写方法
      this.erc20Token.allowance(this.account, this.bankAddress).then((r) => {
        this.approved = ethers.utils.formatUnits(r, 18);
      })
  ````

* 离线签名

 ````
      const signature = await this.signer._signTypedData(domain, types, message);
      console.log(signature);
      const { v, r, s } = ethers.utils.splitSignature(signature);
 ````


## 问题
### 授权额度问题
普通授权后，离线授权存款会将授权额度清零

