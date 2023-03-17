//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";
contract Counter {
    uint counter;
    constructor() {
        counter = 0;
    }

    function count() public{
        counter = counter+1;
        
        console.log("counter is %s ", counter);
    }

    function get() public view   returns (uint) {
        return counter;
    }
}