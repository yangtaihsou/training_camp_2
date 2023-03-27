// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./Erc20Token.sol";
import "hardhat/console.sol";

contract MyErc20Token is Erc20Token {
    uint256 private maxTotalSupply;
    address owner;

    constructor() Erc20Token("A", "A1", 18, 1000000 * 10 ** 18) {
        owner = msg.sender;
    }

    function burn(address account, uint256 value) public onlyOwner {
        _burn(account, value);
    }

    function mint(address account, uint256 value) public onlyOwner {
         require(maxTotalSupply + value <= _totalSupply,"minted amount is more than totalSupply");
         maxTotalSupply = maxTotalSupply + value;
        _mint(account, value);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender is not owner");
        _;
    }

    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {}
}
