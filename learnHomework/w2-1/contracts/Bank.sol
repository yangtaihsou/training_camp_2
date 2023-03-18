// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
contract Bank {
    mapping (address => uint) public depositMapping;
    address public bankOwner;
    constructor() {
        bankOwner = msg.sender;
    }
    
    receive() external payable {
        depositMapping[msg.sender] += msg.value;
    }

    function depositEth(uint _amount) public payable {
        //require(msg.value == _amount);
        depositMapping[msg.sender] += _amount;
    }

   function getBalanceOfEth() public view returns(uint){
    
       console.log("account:%s ,balance is %s ",msg.sender, depositMapping[msg.sender]);
       return depositMapping[msg.sender];
    }

    function withdrawEth(uint _amount) public  {
        require(_amount < depositMapping[msg.sender]);
        depositMapping[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function withdrawEthCall(uint _amount) public {
        require(_amount < depositMapping[msg.sender]);
        depositMapping[msg.sender] -= _amount;
        (bool result,) = msg.sender.call{value: _amount}(new bytes(0));
        require(result, 'Eth transfer is failed');
    }

    modifier onlyOwner {
        require(msg.sender==bankOwner,"Sender is not owner");
        _;
    }

    function bankOwnerWithdraw() public onlyOwner{
        uint balance = address(this).balance;
        payable(bankOwner).transfer(balance);
    }

    function getOwnerBalance() public view returns(uint) {
        
       console.log("bank account:%s ,balance is %s ",address(this), address(this).balance);
        return address(this).balance;
    }
}