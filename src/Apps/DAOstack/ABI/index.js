export const VotingABI =
  [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "parameters",
      "outputs": [
        {
          "name": "precReq",
          "type": "uint256"
        },
        {
          "name": "voteOnBehalf",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "proposalsCnt",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "name": "organizationId",
          "type": "bytes32"
        },
        {
          "name": "open",
          "type": "bool"
        },
        {
          "name": "callbacks",
          "type": "address"
        },
        {
          "name": "numOfChoices",
          "type": "uint256"
        },
        {
          "name": "paramsHash",
          "type": "bytes32"
        },
        {
          "name": "totalVotes",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MAX_NUM_OF_CHOICES",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "organizations",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "_isProxyVote",
          "type": "bool"
        }
      ],
      "name": "AVVoteProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "_organization",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_numOfChoices",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "_proposer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_paramsHash",
          "type": "bytes32"
        }
      ],
      "name": "NewProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "_organization",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_decision",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "_totalReputation",
          "type": "uint256"
        }
      ],
      "name": "ExecuteProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "_organization",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_voter",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_vote",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "_reputation",
          "type": "uint256"
        }
      ],
      "name": "VoteProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "_organization",
          "type": "address"
        }
      ],
      "name": "CancelProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "name": "_organization",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "CancelVoting",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_numOfChoices",
          "type": "uint256"
        },
        {
          "name": "_paramsHash",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "_organization",
          "type": "address"
        }
      ],
      "name": "propose",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "name": "_vote",
          "type": "uint256"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "vote",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        }
      ],
      "name": "cancelVote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        }
      ],
      "name": "execute",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        }
      ],
      "name": "getNumberOfChoices",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voteInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        },
        {
          "name": "_choice",
          "type": "uint256"
        }
      ],
      "name": "voteStatus",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_proposalId",
          "type": "bytes32"
        }
      ],
      "name": "isVotable",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isAbstainAllow",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllowedRangeOfChoices",
      "outputs": [
        {
          "name": "min",
          "type": "uint256"
        },
        {
          "name": "max",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_precReq",
          "type": "uint256"
        },
        {
          "name": "_voteOnBehalf",
          "type": "address"
        }
      ],
      "name": "setParameters",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_precReq",
          "type": "uint256"
        },
        {
          "name": "_voteOnBehalf",
          "type": "address"
        }
      ],
      "name": "getParametersHash",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ]

export const ContributionRewardSchemeABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_intVoteInterface",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_descriptionHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "_reputationChange",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint256[5]",
        "name": "_rewards",
        "type": "uint256[5]"
      },
      {
        "indexed": false,
        "internalType": "contract IERC20",
        "name": "_externalToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      }
    ],
    "name": "NewContributionProposal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "_param",
        "type": "int256"
      }
    ],
    "name": "ProposalExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RedeemEther",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RedeemExternalToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RedeemNativeToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "_amount",
        "type": "int256"
      }
    ],
    "name": "RedeemReputation",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_stakingToken",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      }
    ],
    "name": "balanceOfStakingToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      }
    ],
    "name": "burnReputation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      }
    ],
    "name": "getTotalReputationSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      }
    ],
    "name": "mintReputation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "organizationsProposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "nativeTokenReward",
        "type": "uint256"
      },
      {
        "internalType": "int256",
        "name": "reputationChange",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "ethReward",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC20",
        "name": "externalToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "externalTokenReward",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "beneficiary",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "periodLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numberOfPeriods",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "executionTime",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "parameters",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "voteApproveParams",
        "type": "bytes32"
      },
      {
        "internalType": "contract IntVoteInterface",
        "name": "intVote",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "proposalsInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "contract Avatar",
        "name": "avatar",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      }
    ],
    "name": "reputationOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_stakingToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      }
    ],
    "name": "stakingTokenTransfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "int256",
        "name": "_param",
        "type": "int256"
      }
    ],
    "name": "executeProposal",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_voteApproveParams",
        "type": "bytes32"
      },
      {
        "internalType": "contract IntVoteInterface",
        "name": "_intVote",
        "type": "address"
      }
    ],
    "name": "setParameters",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract Avatar",
        "name": "_avatar",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_descriptionHash",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_reputationChange",
        "type": "int256"
      },
      {
        "internalType": "uint256[5]",
        "name": "_rewards",
        "type": "uint256[5]"
      },
      {
        "internalType": "contract IERC20",
        "name": "_externalToken",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "_beneficiary",
        "type": "address"
      }
    ],
    "name": "proposeContributionReward",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "contract Avatar",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "redeemReputation",
    "outputs": [
      {
        "internalType": "int256",
        "name": "reputation",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "contract Avatar",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "redeemNativeToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "contract Avatar",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "redeemEther",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "contract Avatar",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "redeemExternalToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "contract Avatar",
        "name": "_avatar",
        "type": "address"
      },
      {
        "internalType": "bool[4]",
        "name": "_whatToRedeem",
        "type": "bool[4]"
      }
    ],
    "name": "redeem",
    "outputs": [
      {
        "internalType": "int256",
        "name": "reputationReward",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "nativeTokenReward",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "etherReward",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "externalTokenReward",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_redeemType",
        "type": "uint256"
      }
    ],
    "name": "getPeriodsToPay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_redeemType",
        "type": "uint256"
      }
    ],
    "name": "getRedeemedPeriods",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "getProposalEthReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "getProposalExternalTokenReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "getProposalExternalToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_proposalId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_avatar",
        "type": "address"
      }
    ],
    "name": "getProposalExecutionTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_voteApproveParams",
        "type": "bytes32"
      },
      {
        "internalType": "contract IntVoteInterface",
        "name": "_intVote",
        "type": "address"
      }
    ],
    "name": "getParametersHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }
]
