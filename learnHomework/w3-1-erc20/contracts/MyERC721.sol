// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//NFT 
contract MyERC721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721(unicode"户外游玩俱乐部", "huachuan") {}

//ipfs://QmPWXj3xcm8VuVuf9CFYjnCpDp7dy2KHEJhQkxebCu8V7p
    function mint(
        address student,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 newTokenId = _tokenIds.current();
        _mint(student, newTokenId);
        _setTokenURI(newTokenId, tokenURI); 
        _tokenIds.increment();
        return newTokenId;
    }
}
