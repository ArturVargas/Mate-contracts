require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.8.16",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  networks: {
    goerli: {
      url: `https://frosty-side-fog.ethereum-goerli.discover.quiknode.pro/${process.env.QUICKNODE_KEY}/`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    gnosis: {
      url: `https://blissful-fragrant-water.xdai.quiknode.pro/${process.env.QUICKNODE_GNO_KEY}/`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    mainnet: {
      url: `https://smart-still-county.quiknode.pro/${process.env.QUICKNODE_ETH_KEY}/`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    mumbai: {
      url: `https://compatible-solitary-grass.matic-testnet.quiknode.pro/${process.env.QUICKNODE_MUMB_KEY}/`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.GOERLI_SCAN_KEY,
      gnosis: process.env.GNOSIS_SCAN_KEY,
      mainnet: process.env.ETHER_SCAN_KEY,
      mumbai: process.env.POLYGON_SCAN_KEY,
    },
  },
};
