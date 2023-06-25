const { task } = require("hardhat/config");

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

task("checkDeposit", "Request an assert from the UMA oracle")
  .addParam("dataId", "the api indexer url")
  .addParam("data", "the result of this call")
  .addParam(
    "asserter",
    "the address that will receive bonds at resolution of the data assertion"
  )
  .setAction(async function (taskArguments, hre) {
    const { dataId, data, asserter } = taskArguments;

    const ethers = hre.ethers;
    const signer = await ethers.getSigner();

    const ooAddress = "0x263351499f82C107e540B01F0Ca959843e22464a";
    const optimisticOracleAbi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_defaultCurrency",
            type: "address",
          },
          {
            internalType: "address",
            name: "_optimisticOracleV3",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "dataId",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "bytes32",
            name: "data",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asserter",
            type: "address",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        name: "DataAsserted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "dataId",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "bytes32",
            name: "data",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asserter",
            type: "address",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        name: "DataAssertionResolved",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "dataId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "data",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "asserter",
            type: "address",
          },
        ],
        name: "assertDataFor",
        outputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        name: "assertionDisputedCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "assertionLiveness",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "assertedTruthfully",
            type: "bool",
          },
        ],
        name: "assertionResolvedCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        name: "assertionsData",
        outputs: [
          {
            internalType: "bytes32",
            name: "dataId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "data",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "asserter",
            type: "address",
          },
          {
            internalType: "bool",
            name: "resolved",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "defaultCurrency",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "defaultIdentifier",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        name: "getData",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "oo",
        outputs: [
          {
            internalType: "contract OptimisticOracleV3Interface",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    const requesterAbi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_defaultCurrency",
            type: "address",
          },
          {
            internalType: "address",
            name: "_optimisticOracleV3",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "balances",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "dataId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "data",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "asserter",
            type: "address",
          },
        ],
        name: "checkBalance",
        outputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "dataId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "data",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "asserter",
            type: "address",
          },
        ],
        name: "checkDeposit",
        outputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "dataAsserter",
        outputs: [
          {
            internalType: "contract DataAsserter",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "updateBalance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "updateDeposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const optimisticOracle = new ethers.Contract(
      ooAddress,
      optimisticOracleAbi,
      signer
    );
    const requesterContract = new ethers.Contract(
      requesterAddress,
      requesterAbi,
      signer
    );

    const identifierBytes = ethers.utils.formatBytes32String(identifier);
    const timestampBN = ethers.BigNumber.from(timestamp);
    const reward = ethers.utils.parseEther("0.1"); // Set the reward
    const bond = ethers.utils.parseEther("1");

    const customLiveness = 60 * 60;
  });
