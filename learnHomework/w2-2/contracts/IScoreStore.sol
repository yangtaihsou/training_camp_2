// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title 考试分数存储合约
 * @author
 * @notice
 */
interface IScoreStore {
       /**
     * 设置学生的课程分数
     * @param student 学生地址
     * @param course 课程名字
     * @param score 分数
     */
    function setScore(address student,  string  memory course, uint8 score) external;

    /**
     * 查询调用者的课程分数
     * @param course 课程名字
     */
    function getScore(string memory course) external view returns (uint8);

    /**
     * 查询具体学生的课程分数
     * @param student 学生地址
     * @param course 课程名字
     */
    function getScoreByStudent(
        address student,
         string memory course
    ) external view returns (uint8);

    
    /**
     * 查询当前合约部署者
     */
    function getDeployedAddress() external view returns (address);
}