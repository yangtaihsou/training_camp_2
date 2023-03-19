const { ethers } = require("hardhat");
async function main(){
    const TeacherController = await ethers.getContractFactory("TeacherController");
    const teacherController = await TeacherController.deploy();
    await teacherController.deployed();
    console.log("teacherController contract address:", teacherController.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });