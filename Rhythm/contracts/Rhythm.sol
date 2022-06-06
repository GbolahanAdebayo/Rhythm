// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// @author Rhythm Protocol
// @title A Decentralized Insurance Protocol

//error TransferFailed();
contract Rhthym {
    string public name;
    //uint requiredStake = 2 RHYME;
    address public owner;

    constructor () {
        owner = msg.sender;
    }

    using Counters for Counters.Counter;

    // @notice: total number of policies ever uploaded on the protocol
    // @dev: counts the number of policies in the state variable `_policyIds`
    Counters.Counter private _policyIds;

    // @notice: total number of policies made public by the admin
    // @dev: counts the number of policies in the state variable `_publicPolicy`
    Counters.Counter private _publicPolicy;

    //@notice: total number of insurance registrant's information submitted during application
    //@dev: counts the number of background infomations of registrants
    Counters.Counter private _backgIds;

    //@notice: total number of report messages made by insurance assesors
    //@dev: counts the number of reports by assessors
    Counters.Counter private _reportIds;
    
    struct RegistrantInfo {
        uint backgId;
        string backgInfo;
        address registrant;
        bool hasbeenAssessed
    }

    struct PolicyHolder {
        address policyHolder,
        bool isActive
    }

    struct InsurancePolicy {
        string policyName;
        string policydocHash;
        string policyType;
        string policydocSize;
        string policyDescription;
        uint policyId;
        bool isPrivate;
        address underWriter
        //uint policyCount;
    }

    struct Assesor {
        //uint voteIndex;
        uint voteWeight;
        uint voteTime;
        bool usedStake;
        bool voted,
        address assesorAddr
    }

    struct Report {
        string reportMessage;
        uint reportId;
        uint voteCount;
        uint reportTime;
        address assessorAddr
    }

    //@dev: Not sure if we need this much mappings but first instincts
    mapping(uint => InsurancePolicy) public AllPolicies;
    mapping(address => Assessor) public allAssessors;
    mapping(address => bool) public usedStake;
    mapping(address => bool) public voted;
    mapping(uint => Report) public AllReports;
    mapping(address => policyHolder) policyHolders;
    mapping(uint => RegistrantInfo) AllRegistrantInfo;


    function addPolicy(
        string policyName,
        string policydocHash,
        string memory policyType, 
        string memory policydocSize, 
        string memory policyDescription, 
        uint memory policyId,
        bool _isPrivate
        )

        public returns {
        // @dev Make sure the file hash exists
        require(bytes(_policydocHash).length > 0);

        // @dev Make sure file type exists
        require(bytes(_policydocSize).length > 0);

        // @dev Make sure file description exists
        require(bytes(_policyDescription).length > 0);

        // @dev Make sure file fileName exists
        require(bytes(_policyName).length > 0);

        // @dev Make sure uploader address exists
        require(msg.sender != address(0));

        // @dev Make sure file size is more than 0
        require(bytes(_policydocSize).length > 0);


        //Increment policies
        policyIds.increment();
        uint currentpolicyId = policyId.current();


        AllPolicies[currentpolicyId] = InsurancePolicy(
            currentpolicyId,            // @dev: Records a unique ID for every policy added 
            policydocHash,              // @dev: Records policy file hash
            policyType,                 // @dev: Records policy type
            policydocSize,              // @dev: Records attached document size
            policyDescription,          // @dev: Records policy description
            msg.sender,
            block.timestamp,
            isPrivate            
        );
      
        //emits event of the policy added
        emit AddedPolicy(
            currentpolicyId,
            policydocHash, 
            policyType,
            policydocSize,
            policyDescription,
            msg.sender, 
            block.timestamp, 
            isPrivate
        );

    }

    // @notice: Only the policy admin can change public file visibility to public
    // @dev: file visibility can be changed when file is not blacklisted
    function makePolicyPublic(uint policyId)
        public
        onlypolicyMod
        isNotBlacklisted {
        
        // @notice: ensure that only the policy moderators can change file visibility
        // @dev: Check to ensure that the person changing visibility of the file is the policy moderators
        require(
            onlypolicyMod == msg.sender,
            "only policy moderators can change the status of policy visibility"
        );

        // @notice: makes policy public
        Allpolicies[policyId].isPrivate = false;

        // @dev: increases the count of policies made public
        _publicPolicy.increment();

        // @notice: emits an event when a policy moderator makes a policy uploaded by an underwriter public
        emit madePublic(policyId);
    }

    // @notice: Only the policy moderators can change a public policy visibility to private
    // @dev: policy file visibility can be changed by only policy moderators 
    function makePolicyPrivate(uint policyId)
        public 
        onlypolicyMod {
        
        // @notice: ensures that only a policy moderator can change policy file visibility
        // @dev: Check to ensure that the person changing visibility of the file is a policy moderator
        require(
            onlypolicyMod == msg.sender,
            "only a policy moderator change the status of policy visibility"
        );

        // @notice: makes the current public policy private
        Allpolicies[policyId].isPrivate = true;

        // @dev: increase the count of private policy docs
        _policyId.increment();

        // @notice: emits an event when a policy moderator changes a public policy file to private
        emit madePrivate(policyId);
    }

    // @notice: Allows users to view all policies offered by the protocol
    // @dev: Fetches all public policies visible to everyone on the protocol
    function fetchPublicPolicy()
        external
        view
        isNotBlacklisted
        returns (InsurancePolicy[] memory) {

        // @notice: total number of policies present on the protocol
        // @return: list of all uploads
        uint totalPolicies = policyIds.current();

        // @dev: total number of policy files without private files
        uint publicPolicyId = _policyIds.current() - Allpolicies[policyId].isPrivate //_policyPublic.current();
        uint currentIndex = 0;

        InsurancePolicy[] memory policies = new InsurancePolicy[](publicPolicyId);

        // @notice: Loops through all policies present on the protocol
        for (
            uint i = 0;
            i < totalPolicies;
            i++) {
            
            // @notice: Gets only the public policies
            if (AllPolicies[i + 1].isPrivate == false) {
                uint currentId = AllPolicies[i + 1].policyId;
                InsurancePolicy storage currentPolicy = AllPolicies[currentpolicyId];
                publicPolicies[currentIndex] = currentPolicy;
                currentIndex += 1;
            }
        }
        return publicPolicies;
    }
 
    function register(string backgInfo, bool notbeenAssessed) public returns {

        // @dev: Increment registrants info
        backgIds.increment();
        uint currentbackgId = backgId.current();

        AllRegistrantInfo(currentbackgId) = RegistrantInfo(
            currentbackgId,             // @dev: Records a unique ID for every policy added 
            backgInfo,                  // @dev: Records registrant's background info
            msg.sender, 
            block.timestamp, 
            notbeenAssessed
        );

        // @notice: emits events for insurance application received by the protocol
        emit ApplicationReceived(
            currentbackgId, 
            backgInfo, 
            msg.sender, 
            block.timestamp, 
            notbeenAssessed
        );
    }

   // function setPremiums (string name, uint amount)
    
    // @notice: Allows only the admin to update a fixed stake amount for assessment
    // @dev: Only takes in the Rhythm governance token - RHYME, as the only acceptable value input
    function requiredStake(uint amount) public onlyAdmin returns {
        require(amount == IERC20[RHYME] && > 0);

        amount = _requiredStake;

        emit RequiredStakeUpdated(amount, msg.sender);
    } 

    function useStake() internal returns {
        require(isAssessor == msg.sender);
        
        uint assessmentStake = _requiredStake;

        bool sent = transferFrom(IStakeBank.stakerId, IStakePool, assessmentStake));

        allAssessors[msg.sender].usedStake = true;
        
        // @notice: Increments the number of accessors
        stakedAssessor++

        emit Staked;
    } 

 /*    function getSeekerInfo() public view returns(uint memory AllSeekerInfo)

    function assessSeekerInfo(uint backgId, string reportMessage) external returns(string) {
       require(isAssesor == msg.sender);
       require(!allAssessors[msg.sender].usedStake = true, "You have to stake to assess policybuyer")
       
       _useStake();

       reportId++;
       AllReports[reportId] = Report(reportMessage, backgId, reportId, voteCount, block.timestamp, msg.sender
       
       bool notbeenAssessed = false;

       emit AssessmentSuccessful(reportMessage, backgId, reportId, voteCount, block.timestamp, msg.sender)
    }

    function voteAssessment(uint reportId) external {

        // @dev: checks that the voting time hasn't passed
        require(
            block.timestamp < deadline
            );
                
        require (
            !allAssessors[msg.sender].usedStake = true, 
            "You have to stake before you vote"
            );

        // @dev: allows voter that has not voted before
        require (
            !allAssessors[msg.sender].voted, 
            "You can't vote twice"
            );

        // @dev: records the vote so the voter can only vote once
        allAssessors[msg.sender].voted = true;
        allAssessors[msg.sender].reportId = reportId;


       /** require (
            voteIndex >= 0 && voteIndex <= candidateCount-1
            );
        */
    /*
     // @notice: Increments votes    
        allReports[reportId].voteCount++;

        //emits voting event
        emit votedEvent(reportId);
    }


    function fetchVoteResult() external view returns(string memory, uint memory) {
        
        string memory assessmentMessage = new string[](policyId);
        string memory assessmentVoteCount = new string[](policyId);

          // @dev: loops through all candidates to fetch their names and vote counts
          for (uint i = 0; i < reportId; i++) {  
              asssessmentMessage[i] = AllReports[i].reportMessage;
              assessmentVoteCounts[i] = AllReports[i].voteCount;
            }
        return (assessmentMessage, assessmentVoteCounts);
    }

    function endVoteCall() internal 

    function buyInsurance(string policyId, uint amount) public returns (bool) {
        require(votedAssessment == amount)
        require(bool notbeenAssessed = false, "You have not been Assessed!");
    }

    function cancelInsurance() public return {
        require(msg.sender == policyHolder);


    } 
}   */





