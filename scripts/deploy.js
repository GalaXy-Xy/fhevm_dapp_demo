const hre = require("hardhat");

async function main() {
  const FHEStorage = await hre.ethers.getContractFactory("FHEStorage");
  const contract = await FHEStorage.deploy();
  await contract.waitForDeployment();

  console.log("FHEStorage deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
