//SPDX-Licenser-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/IERC20/ERC20.sol";

error Staking__TransferFailed;
contract Staking {
    address public RHYME;

    modifier rewardPerToken {

        
        _;
    }

    constructor(address RHYME, uint amount) {
        RHYME = IERC20(stakingToken);

    }

    function stake(address sender, uint amount) external returns (bool) {
        balance[account] = balance(msg.sender) + amount;
        totalSupply = totalSupply + amount;

        bool success = RHYME.transferFrom(msg.sender, address(this), amount);

        if(!success){
            revert error Staking__TransferFailed();
        }

        return Staked;
    }

    function withdraw(address sender, uint amount) external returns (uint) {
        balance[account] = balance(msg.sender) - amount;
        totalSupply = totalSupply - amount;

        bool success = RHYME.transfer(address(this), amount);

        if(!success){
            revert error Staking__TransferFailed();
        }

        return Withdraw;
    }

    function claimReward() public returns 
}