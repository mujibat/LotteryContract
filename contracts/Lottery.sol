// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Lottery {
   
    
    address private winningticket;
    uint private profitAmount;
    address manager;

    struct LotteryUser {
        address[] ticketbuyers;
        address owner;
        uint deadline;
        bool lotteryActive;
        string name;
    }
    uint _ID;

    constructor() {
         manager = msg.sender;
    }
    // id to balance
    mapping(uint => uint) lotteryBalance;
    mapping(uint => LotteryUser) public loter;
    mapping(uint => mapping(address => uint)) public ticketbuyer;
     mapping(uint => mapping(address => bool)) public hasBoughtTicket;

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager");
        _;
    }

    function createLottery(uint _durationTime, string memory _name) external payable {
        _ID++;
        LotteryUser storage lottery =  loter[_ID];
       lottery.deadline = _durationTime +  block.timestamp;
       lottery.lotteryActive = true;
       lottery.owner = msg.sender;
       lottery.name = _name;
    }

    function buyLotteryTicket(uint ID) external payable {
        LotteryUser storage lottery =  loter[ID];
        if(msg.sender == address(0)) {
            payable(manager).transfer(msg.value);
        }
        ticketbuyer[ID][msg.sender] += msg.value;
        lotteryBalance[ID] += msg.value;
        // winAmount += msg.value;
         require(lottery.deadline >= block.timestamp, "Lottery Ended");
        require(msg.value > 0, "Input higher amount");
        if (!hasBoughtTicket[ID][msg.sender]) {
           lottery.ticketbuyers.push(msg.sender); 
        hasBoughtTicket[ID][msg.sender] = true;
        }
    }
    
      function random(uint ID) internal view returns(uint randomNumber) {
        LotteryUser storage lottery =  loter[ID];
        randomNumber = (uint(keccak256(abi.encodePacked( block.timestamp, lottery.ticketbuyers))) % lottery.ticketbuyers.length) + 1;
    }

    function getWinner(uint ID) external payable onlyManager returns(address) {
        LotteryUser storage lottery =  loter[ID];
        require(lottery.ticketbuyers.length > 2, "Need more participants");
        require(block.timestamp > lottery.deadline, "Lottery ended");
        lottery.lotteryActive = false;
        uint winningnumber = random(ID);
        winningticket = lottery.ticketbuyers[winningnumber];
        uint winAmount = lotteryBalance[ID] * 95 /100;
        profitAmount = lotteryBalance[ID] * 5 / 100;
        payable(winningticket).transfer( winAmount);
        payable(manager).transfer(profitAmount);
        return winningticket;
    }

    function getProfit() internal view returns (uint profit) {
        profit = (address(this).balance * 5) / 100;
    }
    function balanceOfLotteryHouse() public view returns (uint balance) {
         balance = address(this).balance;
    }
    
 
    function getTicketBuyers(uint ID) external view returns(address [] memory){
        LotteryUser storage lottery =  loter[ID];
        return lottery.ticketbuyers;
    }

    
   
}
