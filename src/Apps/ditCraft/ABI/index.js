export const ditCoordinatorABI = [
  {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": "KNWVoteID"}],
  "name": "getKNWVoteIDFromProposalID",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "uint256", "name": "_proposalID"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": "currentProposalID"}],
  "name": "getCurrentProposalID",
  "inputs": [{"type": "bytes32", "name": "_repository"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "openVoteOnProposal",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "uint256", "name": "_proposalID"}, {
    "type": "uint256",
    "name": "_voteOption"
  }, {"type": "uint256", "name": "_voteSalt"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "isKYCValidator",
  "inputs": [{"type": "address", "name": ""}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": ""}],
  "name": "MAX_VOTE_DURATION",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "string", "name": "name"}, {"type": "uint256", "name": "currentProposalID"}, {
    "type": "uint256",
    "name": "votingMajority"
  }],
  "name": "repositories",
  "inputs": [{"type": "bytes32", "name": ""}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "replaceManager",
  "inputs": [{"type": "address", "name": "_newManager"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "finalizeVote",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "uint256", "name": "_proposalID"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "revokeKYC",
  "inputs": [{"type": "address", "name": "_address"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "string", "name": "description"}, {"type": "string", "name": "identifier"}, {
    "type": "uint256",
    "name": "KNWVoteID"
  }, {"type": "uint256", "name": "knowledgeID"}, {"type": "address", "name": "proposer"}, {
    "type": "bool",
    "name": "isFinalized"
  }, {"type": "bool", "name": "proposalAccepted"}, {"type": "uint256", "name": "individualStake"}, {
    "type": "uint256",
    "name": "totalStake"
  }],
  "name": "proposalsOfRepository",
  "inputs": [{"type": "bytes32", "name": ""}, {"type": "uint256", "name": ""}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": ""}],
  "name": "MIN_VOTE_DURATION",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": "votingMajority"}],
  "name": "getVotingMajority",
  "inputs": [{"type": "bytes32", "name": "_repository"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "address", "name": ""}],
  "name": "manager",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": "individualStake"}],
  "name": "getIndividualStake",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "uint256", "name": "_proposalID"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "initRepository",
  "inputs": [{"type": "string", "name": "_repository"}, {
    "type": "uint256[]",
    "name": "_knowledgeIDs"
  }, {"type": "uint256", "name": "_votingMajority"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "removeKYCValidator",
  "inputs": [{"type": "address", "name": "_address"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "bool", "name": "hasPassed"}],
  "name": "proposalHasPassed",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "uint256", "name": "_proposalID"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "address", "name": ""}],
  "name": "KNWTokenAddress",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "address", "name": ""}],
  "name": "nextDitCoordinator",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "voteOnProposal",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "uint256", "name": "_proposalID"}, {
    "type": "bytes32",
    "name": "_voteHash"
  }, {"type": "uint256", "name": "_numberOfKNW"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "allowedKnowledgeIDs",
  "inputs": [{"type": "bytes32", "name": ""}, {"type": "uint256", "name": ""}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": ""}],
  "name": "BURNING_METHOD",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "passedKYC",
  "inputs": [{"type": "address", "name": ""}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "address", "name": ""}],
  "name": "xDitTokenAddress",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "addKYCValidator",
  "inputs": [{"type": "address", "name": "_address"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "address", "name": ""}],
  "name": "lastDitCoordinator",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256[]", "name": "knowledgeIDs"}],
  "name": "getKnowledgeIDs",
  "inputs": [{"type": "bytes32", "name": "_repository"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "repositoryIsInitialized",
  "inputs": [{"type": "bytes32", "name": "_repository"}],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "upgradeContract",
  "inputs": [{"type": "address", "name": "_address"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "address", "name": ""}],
  "name": "KNWVotingAddress",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "passKYC",
  "inputs": [{"type": "address", "name": "_address"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "view",
  "payable": false,
  "outputs": [{"type": "uint256", "name": ""}],
  "name": "MINTING_METHOD",
  "inputs": [],
  "constant": true
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "bool", "name": ""}],
  "name": "migrateRepository",
  "inputs": [{"type": "string", "name": "_repository"}],
  "constant": false
}, {
  "type": "function",
  "stateMutability": "nonpayable",
  "payable": false,
  "outputs": [{"type": "uint256", "name": "proposalID"}],
  "name": "proposeCommit",
  "inputs": [{"type": "bytes32", "name": "_repository"}, {"type": "string", "name": "_description"}, {
    "type": "string",
    "name": "_identifier"
  }, {"type": "uint256", "name": "_knowledgeID"}, {"type": "uint256", "name": "_numberOfKNW"}, {
    "type": "uint256",
    "name": "_voteDuration"
  }, {"type": "uint256", "name": "_amountOfTokens"}],
  "constant": false
}, {
  "type": "constructor",
  "stateMutability": "nonpayable",
  "payable": false,
  "inputs": [{"type": "address", "name": "_KNWTokenAddress"}, {
    "type": "address",
    "name": "_KNWVotingAddress"
  }, {"type": "address", "name": "_lastDitCoordinator"}, {"type": "address", "name": "_xDitTokenAddress"}]
}, {
  "type": "event",
  "name": "InitializeRepository",
  "inputs": [{"type": "bytes32", "name": "repository", "indexed": true}, {
    "type": "address",
    "name": "who",
    "indexed": true
  }],
  "anonymous": false
}, {
  "type": "event",
  "name": "ProposeCommit",
  "inputs": [{"type": "bytes32", "name": "repository", "indexed": true}, {
    "type": "uint256",
    "name": "proposal",
    "indexed": true
  }, {"type": "address", "name": "who", "indexed": true}, {
    "type": "uint256",
    "name": "knowledgeID",
    "indexed": false
  }, {"type": "uint256", "name": "numberOfKNW", "indexed": false}],
  "anonymous": false
}, {
  "type": "event",
  "name": "CommitVote",
  "inputs": [{"type": "bytes32", "name": "repository", "indexed": true}, {
    "type": "uint256",
    "name": "proposal",
    "indexed": true
  }, {"type": "address", "name": "who", "indexed": true}, {
    "type": "uint256",
    "name": "knowledgeID",
    "indexed": false
  }, {"type": "uint256", "name": "stake", "indexed": false}, {
    "type": "uint256",
    "name": "numberOfKNW",
    "indexed": false
  }, {"type": "uint256", "name": "numberOfVotes", "indexed": false}],
  "anonymous": false
}, {
  "type": "event",
  "name": "OpenVote",
  "inputs": [{"type": "bytes32", "name": "repository", "indexed": true}, {
    "type": "uint256",
    "name": "proposal",
    "indexed": true
  }, {"type": "address", "name": "who", "indexed": true}, {
    "type": "uint256",
    "name": "knowledgeID",
    "indexed": false
  }, {"type": "bool", "name": "accept", "indexed": false}, {
    "type": "uint256",
    "name": "numberOfVotes",
    "indexed": false
  }],
  "anonymous": false
}, {
  "type": "event",
  "name": "FinalizeVote",
  "inputs": [{"type": "bytes32", "name": "repository", "indexed": true}, {
    "type": "uint256",
    "name": "proposal",
    "indexed": true
  }, {"type": "address", "name": "who", "indexed": true}, {
    "type": "uint256",
    "name": "knowledgeID",
    "indexed": false
  }, {"type": "bool", "name": "votedRight", "indexed": false}, {
    "type": "uint256",
    "name": "numberOfKNW",
    "indexed": false
  }],
  "anonymous": false
}, {
  "type": "event",
  "name": "FinalizeProposal",
  "inputs": [{"type": "bytes32", "name": "repository", "indexed": true}, {
    "type": "uint256",
    "name": "proposal",
    "indexed": true
  }, {"type": "uint256", "name": "knowledgeID", "indexed": false}, {
    "type": "bool",
    "name": "accepted",
    "indexed": false
  }],
  "anonymous": false
}]
