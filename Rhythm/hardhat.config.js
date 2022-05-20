require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
const dotenv - require("dotenv");

dotenv.config();
const defaultNetwork = "rinkeby"


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork,
  networks: {
    localhost: {
      url: "https://localhost:8545",

      /*no mnemonic here... It'll use the account 0 of the hardhat 
      node to deploy (you can put in a mnemonic here to set the deployer locally).*/
    },
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.METAMASK_KEY],
    },
  },
  etherscan: {
    apikey: process.env.ETHERSCAN KEY,
  },
  };
