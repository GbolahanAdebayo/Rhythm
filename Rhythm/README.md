# Rhythm Protocol Dapp

> ## Table of contents
- [Overview](#overview)
- [Project Features](#project-features)
- [Technologies](#technologies)
- [Repo Setup](#repo-setup)
- [Requirements](#requirements)
- [Setup the Project](#setup-the-project)
  - [Install Hardhat](#install-hardhat)
  - [Env Setup](#env-setup)
  - [Setup Hardhat.config](#setup-hardhatconfig)
- [Create the SmartContract](#create-the-smartcontract)
  - [Compile](#compile)
  - [Deploy](#deploy)
  - [Verify](#verify)
- [Setup the Frontend](#setup-the-frontend)
  - [Install Dependencies](#install-dependencies)
  - [Start Server](#start-server)
  - [Build the Frontend](#build-the-frontend)
- [Testing the Smartcontract](#testing-the-smartcontract)
- [Rhythm Protocol Contract Address](#nestdrive-contract-address)
- [Live Link](#live-link)
- [Contributors](#contributors)
- [Contributing to the project](#contributing-to-the-project)
#
> ## Overview
<p align="justify">
Rhythm is an insurance Liquidity Protocol.
</p>

<p align="justify">
We are building an insurance plus lending protocol that provides protection for crypto investors against financial loss on-chain.
</p>

<p align="justify">

</p>

#
> ## Project Features

- Insurance against on-chain financial losses.

- Control of premiums even while locked to either approve its use for lending to help other people's financial needs or keep it locked up in the protocol.

- Generous policy holders receive incentives from interest generated on borrowed assets.

- Validators assess and validate insurance applications, assessments and insurance claims.

- Extends the liquidity provider market for both decent crypto investors and borrowers with financial needs.

- Policyholders secure themselves against on-chain financial losses while still earning passive incomes from their premiums. 

</p>

#
> ## Technologies
| <b><u>Stack</u></b> | <b><u>Usage</u></b> |
| :------------------ | :------------------ |
| **`Solidity`**      | Smart contract      |
| **`React JS`**      | Frontend            |

#
> ## Repo Setup

<p align="justify">
To setup the repo, first fork the StreetMain Lab Rhythm repo, then clone the forked repository to create a copy on the local machine.
</p>

    $ git clone https://github.com/GbolahanAdebayo/Rhythm.git

<p align="justify">
Change directory to the cloned repo and set the original Rhythm repository as the "upstream" and your forked repository as the "origin" using gitbash.
</p>

    $ git remote add upstream https://github.com/StreetMain-Lab/Rhythm.git

#

> ## Requirements
#
- Hardhat
- Alchemy key
- Metamask key
- Etherscan.io API Url
- Node JS
#
> ## Setup the Project
**`*Note:`**

<p align="justify">
This project was setup on a windows 10 system using the gitbash terminal. Some of the commands used may not work with the VScode terminal, command prompt or powershell.
</p>

The steps involved are outlined below:-
#
> ### Install Hardhat
The first step involves cloning and installing hardhat.
```shell
$ cd NestDrive

$ npm i -D hardhat

$ npm install

$ npm install --save-dev "@nomiclabs/hardhat-waffle" "ethereum-waffle" "chai" "@nomiclabs/hardhat-ethers" "ethers" "web3" "@nomiclabs/hardhat-web3" "@nomiclabs/hardhat-etherscan" "@openzeppelin/contracts" "dotenv"

# If you encounter errors installing the dependencies above, delete the old package-lock.json and run the `npm install --save-dev` command again
```
> ### Env Setup
 Next create a `.env` file by using the sample.env. Retrieve your information from the relevant sites and input the information where needed in the `.env` file.

`To retrieve your metamask private key.`
- Open your account details by clicking on the three dots on the metamask extension on your chrome browser
- Click on export private key
- Verify your password
- Copy your private key and place it in the .env file

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1oDl0IbicD7LhNOcYUbGzBYTJdduWim1t" alt="metamask"/>
</p>

#
`To retrieve your alchemy key.`
- Login to your account on https://www.alchemy.com/
- Once youre redirected to your [dashboard](https://dashboard.alchemyapi.io/), click on create app.
- Fill in the relevant details especially the chain and network
- Once the app has been created, click on view key.
- Copy the HTTP and place it in the .env file.

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1vPvT5LJRJy6B8hSi_3mPo16wC4u6MnEK" alt="alchemy"/>
</p>

#
`To retrieve your etherscan key.`
- Login to [etherscan](https://etherscan.io/) and hover over the dropdown arrow for your profile on the navbar.
- Click on API keys and add to create a new project (optional step).
- Once the project has been created, click on the copy button to copy the API key.
- Paste it in the .env file

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1Gq-hPuwjwb3TOCH2dqUA93VxfyrbUDN6" alt="etherscan key"/>
</p>

#
> ### Setup Hardhat.config


Below is the setup for the hardhat.config.json

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1Wmc2o2DnF5K6Q5y0CTCjVUfUIoLVm2ei" alt="hardhat"/>
</p>

#
> ## Create the SmartContract
  - First write the Smartcontract codes within the contracts folder.
  - The next step involves the compilation, deployment and verification of the contract on the testnet.

> ### Compile
- To compile the smartcontract before deployment:
```
$ npx hardhat compile
```
#
> ### Deploy
- To deploy the smartcontract:
```
$ npx hardhat run scripts/deploy.js --network (rinkeby) - Let's use Polygon Mumbai
```
#
> ### Verify
- To verify the smartcontract:
```
$ npx hardhat verify ***** --network (rinkeby) - Let's use Polygon Mumbai
```

#
> ## Setup the Frontend
- First run the frontend on your local server to ensure it's fully functional before building for production.
#
> ### Install Dependencies
- Setup and install dependencies

```shell
$ cd frontend

$ npm install

$ npm install react-scripts@latest
```
#
> ### Start Server
- Start the server on localhost
```
$ npm run start
```
#
> ### Build the Frontend
- Create an optimized production build, which can be hosted on sites like Heroku, Netlify, Surge etc.
```
$ npm run build
```
#
> ## Testing the Smartcontract

- Coverage is used to view the percentage of the code required by tests and unittests were implemented to ensure that the code functions as expected
#
**`Coverage Test`**
- To test the smartcontract, first open a terminal and run the following command:

- First install Solidity Coverage
```
  $ npm i solidity-coverage
```
- Add `require('solidity-coverage')` to hardhat.config.json

- Install Ganache
``` 
  $ npm i ganache-cli
``` 
- Run coverage
```
$ npx hardhat coverage --network localhost

# if you get errors and you want to trace the error in the terminal
$ npx hardhat coverage --network localhost --show-stack-traces
```
#

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1tMhIUrDVPcIsMxTd4FAzapB04_R93Rcc" alt="coverage tests"/>
</p>

#
> ## Rhythm Protocol Contract Address

- ****

#  
> ## Live Link
  
- ******
#


> ###### README Created by `MAINSTREET TEAM` for Rhythm Protocol 