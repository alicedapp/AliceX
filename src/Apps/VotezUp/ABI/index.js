export const FoodContractABI = [{"constant":false,"inputs":[{"name":"_foodItem","type":"string"},{"name":"_name","type":"string"}],"name":"setOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOrder","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderStatus","type":"string"}],"name":"setOrderStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"cookingOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"foodItem","type":"string"},{"indexed":false,"name":"name","type":"string"}],"name":"FoodFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"foodItem","type":"string"},{"indexed":false,"name":"name","type":"string"}],"name":"OrderReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderStatus","type":"string"}],"name":"OrderStatus","type":"event"}];
export const WETHABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];
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
