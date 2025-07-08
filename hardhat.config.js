require("@nomicfoundation/hardhat-toolbox");
require("@fhenixprotocol/hardhat-plugin");

module.exports = {
  solidity: "0.8.20",
  fhe: {
    version: "latest"
  },
  networks: {
    fhenix: {
      url: "https://devnet.fhenix.zone",
      chainId: 5555,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
