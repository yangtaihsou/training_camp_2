// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./ScoreStore.sol";

import "hardhat/console.sol";

/**
 * @title 老师打分控制器
 * @author
 * @notice
 */
contract TeacherController {
    // 分数存储合约的地址
    address public scoreStoreAddress;
    //合约部署者
    address public owner;
    //老师信息
    mapping(address => address) public teachers;

    constructor() {
        owner = msg.sender;
        //部署分数存储的合约
        ScoreStore scoreStore = new ScoreStore();
        scoreStoreAddress = address(scoreStore);
        console.log("ScoreStore contract address:%s", scoreStoreAddress);
        console.log("%s deployed ScoreStore contract",  IScoreStore(scoreStoreAddress).getDeployedAddress());
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender is not owner");
        _;
    }

    modifier onlyTeacher() {
        address teacher = teachers[msg.sender];
        require(teacher != address(0), "Sender is not a teacher");
        _;
    }


    function addTeacher(address teacher) public onlyOwner {
        teachers[teacher] = teacher;
    }


    function setStudentScore(
        address student,
         string memory course,
        uint8 score
    ) public onlyTeacher {
        require(score < 100, "score should be less than 100");
        console.log("ScoreStore contract address:%s", scoreStoreAddress);
        IScoreStore(scoreStoreAddress).setScore(student,course,score);
    }
}
