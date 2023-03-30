// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "hardhat/console.sol";

contract NFTMarket is IERC721Receiver {
    //nft价格
    mapping(uint => uint) nftPrice;
    // erc20 token地址，这里是MyErc20Token合约部署的地址
    address public immutable token;
    //nft地址，这里是MyERC721合约部署的地址
    address public immutable nftToken;

    constructor(address _token, address _nftToken) {
        token = _token;
        nftToken = _nftToken;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /**
     * 上架售卖token。
     * @param tokenId 售卖的token
     * @param amount  token的价格
     */
    function list(uint tokenId, uint amount) public {
        //将nft上架，托管给交易所合约。在托管前，应该授权?
        //safeTransferFrom 应该添加onERC721Received方法
        IERC721(nftToken).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            ""
        );
        nftPrice[tokenId] = amount;
    }

    function buy(uint tokenId, uint amount) external {
        require(amount >= nftPrice[tokenId], "low price");

        require(
            IERC721(nftToken).ownerOf(tokenId) == address(this),
            "aleady selled"
        );

        IERC20(token).transferFrom(
            msg.sender,
            address(this),
            nftPrice[tokenId]
        );
        IERC721(nftToken).transferFrom(address(this), msg.sender, tokenId);
    }
}
