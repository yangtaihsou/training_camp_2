<script>
//ethers本地安装有问题，可以直接使用远程的
//import { ethers } from 'ethers'

import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.6.9.esm.min.js";

import erc2612Addr from '../../deployments/dev/ERC2612.json'
import erc2612Abi from '../../deployments/abi/ERC2612.json'

import bankAddr from '../../deployments/dev/Bank.json'
import bankAbi from '../../deployments/abi/Bank.json'

export default {

  name: 'erc20',

  data() {
    return {
      account: null,
      recipient: null,
      amount: null,
      balance: null,
      ethbalance: null,
      balanceAccount: null,

      name: null,
      decimal: null,
      symbol: null,
      supply: null,

      stakeAmount: null,
      myDeposit: 0,
      approveTo: null,
      approveAmount: null,
      approved: null,
      bankAddress: bankAddr.address,
      erc2612Balance: null
    }
  },

  async created() {
  },

  methods: {
    async connect() {
      await this.initProvider()
      await this.initAccount()

      // 如果获取到了账号,进行合约初始化，并读取合约数据
      if (this.account) {
        this.initContract()
        this.readContract();
        this.getApproved();
      }
    },

    async initProvider() {
      if (window.ethereum) {
        if (typeof window.ethereum !== 'undefined') {
          this.provider = new ethers.providers.Web3Provider(window.ethereum);
        } else {
          // 如果 MetaMask 等 Web3 钱包未连接，则需要提示用户连接钱包
          console.error("Please install MetaMask or another Web3 wallet.");
        }

        let network = await this.provider.getNetwork()
        this.chainId = network.chainId;
        console.log("chainId:", this.chainId);

      } else {
        console.log("Need install MetaMask")
      }
    },

    async initAccount() {
      try {
        this.accounts = await this.provider.send("eth_requestAccounts", []);
        console.log("accounts:" + this.accounts);
        this.account = this.accounts[0];

        this.signer = this.provider.getSigner()
      } catch (error) {
        console.log("User denied account access", error)
      }
    },

    async initContract() {
      this.erc20Token = new ethers.Contract(erc2612Addr.address,
        erc2612Abi, this.signer);

      this.bank = new ethers.Contract(bankAddr.address,
        bankAbi, this.signer);

    },

    readContract() {
      //eth余额
      this.provider.getBalance(this.account).then((r) => {
        this.ethbalance = ethers.utils.formatUnits(r, 18);
      });

      this.erc20Token.name().then((r) => {
        this.name = r;
      })
      this.erc20Token.decimals().then((r) => {
        this.decimal = r;
      })
      this.erc20Token.symbol().then((r) => {
        this.symbol = r;
      })
      this.erc20Token.totalSupply().then((r) => {
        this.supply = ethers.utils.formatUnits(r, 18);
      })

      this.erc20Token.balanceOf(this.account).then((r) => {
        this.balance = ethers.utils.formatUnits(r, 18);
      })

      this.bank.deposited(this.account).then((r) => {
        this.myDeposit = ethers.utils.formatUnits(r, 18);
      })

    },

    getApproved() {
      this.erc20Token.allowance(this.account, this.bankAddress).then((r) => {
        this.approved = ethers.utils.formatUnits(r, 18);
      })
    },


    // async transferEth() {
    //   let tx = await this.signer.sendTransaction({
    //     to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    //     value: ethers.parseEther("1.0")
    //   });
    // },

    transfer() {
      if (!this.erc20Token) {
        alert("先链接钱包")
      }
      let amount = ethers.utils.parseUnits(this.amount, 18);

      this.erc20Token.transfer(this.recipient, amount).then((r) => {
        console.log(r);  // 返回值不是true
        this.readContract();
      }).catch(e => {
        alert("Error , please check the console log:", e)
      })

    },
    //授权
    async approve() {
      if (!this.erc20Token) {
        alert("先链接钱包")
      }

      try {
        let amount = ethers.utils.parseUnits(this.approveAmount, 18);
        let tx = await this.erc20Token.approve(this.approveTo, amount);
        await tx.wait();
        this.getApproved()
      }
      catch (e) {
        alert("Error , please check the console log:", e)
      }
    },

    //存入bank合约
    async deposit() {
      if (!this.bank) {
        alert("先链接钱包")
      }

      try {
        let amount = ethers.utils.parseUnits(this.approveAmount, 18);
        let tx = await this.bank.deposit(this.account, amount);
        await tx.wait();
        this.getApproved();
        this.readContract();
      }
      catch (e) {
        alert("Error , please check the console log:", e)
      }
    },

    async permitDeposit() {
      if (!this.erc20Token) {
        alert("先链接钱包")
      }

      let nonce = await this.erc20Token.nonces(this.account);
      this.deadline = Math.ceil(Date.now() / 1000) + parseInt(20 * 60);

      let amount = ethers.utils.parseUnits(this.stakeAmount).toString();

      const domain = {
        name: 'ERC2612',
        version: '1',
        chainId: this.chainId,
        verifyingContract: erc2612Addr.address
      }

      const types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" }
        ]
      }

      const message = {
        owner: this.account,
        spender: bankAddr.address,
        value: amount,
        nonce: nonce,
        deadline: this.deadline
      }

      const signature = await this.signer._signTypedData(domain, types, message);
      console.log(signature);

      const { v, r, s } = ethers.utils.splitSignature(signature);

      try {
        let tx = await this.bank.permitDeposit(this.account, amount, this.deadline, v, r, s);
        let receipt = await tx.wait();
        this.readContract();
      } catch (e) {
        alert("Error , please check the console log:", e)
      }

    },

    async withdraw() {
      if (!this.bank) {
        alert("先链接钱包")
      }

      let tx = await this.bank.withdraw();
      await tx.wait();
      this.readContract();
    },

    //查询地址的erc2612 token余额
    async balanceERC2612() {
      if (!this.bank) {
        alert("先链接钱包")
      }

      try {

        this.erc20Token.balanceOf(this.balanceAccount).then((r) => {

          this.erc2612Balance = ethers.utils.formatUnits(r, 18);
        })

      }
      catch (e) {
        alert("Error , please check the console log:", e)
      }
    }
  }
}


</script>

<template>
  <div>

    <button @click="connect"> 链接钱包 </button>
    <div>
      我的地址 : {{ account }}
    </div>
    <div class="block">
      Token 名称 : {{ name }} ,
      Token 符号 : {{ symbol }} ,
      Token 精度 : {{ decimal }}
      <br /> Token 发行量 : {{ supply }} , 我的 Token 余额 : {{ balance }}
      <br /> 我的ETH余额 : {{ ethbalance }}
    </div>

    <div class="block">
      <h3>普通转账:</h3>
      <div>
        转账到:
        <input type="text" v-model="recipient" />
        <br />转账金额
        <input type="text" v-model="amount" />
        <br />
        <button @click="transfer"> 转账 </button>
      </div>
    </div>
    <div class="block">
      <h3>授权 存款(两笔交易):</h3>
      Bank合约地址：{{ bankAddress }}
      <div v-if="approved">已授权额度: {{ approved }}</div>

      <div>
        <br />授权到:
        <input type="text" v-model="approveTo" />
        <button @click="approve"> 授权（需要填写金额） </button>
        <br />
        金额（默认存款到Bank合约地址：{{ bankAddress }}）
        <input type="text" v-model="approveAmount" />
        <button @click="deposit"> 存款 </button>
      </div>
    </div>

    <div class="block">
      <h3>离线授权存款（一笔交易）</h3>
      <div>
        <input v-model="stakeAmount" placeholder="输入质押量" />
        <button @click="permitDeposit">离线授权存款</button>
      </div>
    </div>

    <div class="block">
      <h3> 取款</h3>
      <div>
        我的存款：{{ myDeposit }}
        <button @click="withdraw">取款</button>
      </div>
    </div>


    <div class="block">
      <h3> ERC2612 余额查询</h3>
      <div>

        <input v-model="balanceAccount" placeholder="输入用户的地址" />
        我的存款：{{ erc2612Balance }}
        <button @click="balanceERC2612">查询</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.4rem;
  color: firebrick;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

div {
  font-size: 1.2rem;
}

.block {
  margin: 5px;
  padding: 5px;
  border-style: solid;
  border-width: 1px;
}
</style>
