// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./IScoreStore.sol";

//import "hardhat/console.sol";
contract ScoreStore is IScoreStore {
    //学生分数
    mapping(address => mapping(string => uint8)) public studentScore;

    //合约部署者
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    /**
     * 设置学生的课程分数
     * @param student 学生地址
     * @param course 课程名字
     * @param score 分数
     */
    function setScore(
        address student,
        string memory course,
        uint8 score
    ) public {
        require(score < 100, "score should be less than 100");
        studentScore[student][course] = score;
    }

    /**
     * 查询调用者的课程分数
     * @param course 课程名字
     */
    function getScore(string memory course) public view returns (uint8) {
        return studentScore[msg.sender][course];
    }

 
    function getScoreByStudent(
        address student,
        string memory course
    ) public view returns (uint8) {
        return studentScore[student][course];
    }

    function getDeployedAddress() public view returns (address) {
        return owner;
    }
}
