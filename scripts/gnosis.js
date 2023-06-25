// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MateBook = await ethers.getContractFactory("MateBook");
  // Mumbai: weth, opv3
  const mateBook = await MateBook.deploy(
    "0xE03CFC9e275BD1298E77eA26d643feD7cd1AdBE2",
    "0x263351499f82C107e540B01F0Ca959843e22464a"
  );

  await mateBook.deployed();

  console.log("MateBook address:", await mateBook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
