// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SelectorPrint {
    function myFunction(
        uint256 value,
        string memory text
    ) external pure returns (bool) {
        // Function code goes here
    }

    function getSelector() external pure returns (bytes4) {
        //等同于bytes4(keccak256(。。。，内部使用方便，但在其他合约用，比较麻烦
        return SelectorPrint.myFunction.selector;
    }

    function getSelector2() external pure returns (bytes4) {
        return bytes4(keccak256("myFunction(uint256,string)"));
    }
}
