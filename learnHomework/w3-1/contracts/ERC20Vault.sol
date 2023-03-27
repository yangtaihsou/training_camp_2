// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./IERC20.sol";

contract ERC20Vault {
    address public immutable erc20Token;
    mapping(address => uint256) balance;

    constructor(address _erc20Token) {
        erc20Token = _erc20Token;
    }

    function deposit(uint256 amount) public {
        address user = msg.sender;
        IERC20(erc20Token).transferFrom(msg.sender, address(this), amount);
        balance[user] = balance[user] + amount;
    }

    function withdraw(uint256 amount) public {
        address user = msg.sender;
        IERC20(erc20Token).transferFrom(address(this), msg.sender, amount);
        balance[user] = balance[user] - amount;
    }

    function balanceOf()  public view  returns(uint256){
        return balance[msg.sender];
    }
}
