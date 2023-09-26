// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Lottery {
   
    bool lotteryOpen;
    uint deadline;
    uint public WinAmount;
    address[] ticketbuyers;
    address manager;


    constructor() {
         manager = msg.sender;
    }
    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager");
        _;
    }


    function createLottery( uint _durationTime) external payable onlyManager{
       deadline = _durationTime +  block.timestamp;
       lotteryOpen = true;
    }

    function buyLotteryTicket() external payable {
         require(deadline >= block.timestamp, "Lottery Ended");
        require(msg.value >= 2, "Input higher amount");
        ticketbuyers.push(msg.sender);
    }
    
      function random() internal view returns(uint randomNumber) {
        randomNumber = (uint(keccak256(abi.encodePacked( block.timestamp, ticketbuyers))) % ticketbuyers.length) + 1;
    }

    function winningAddress() external view returns (address winningticket) {
        require(block.timestamp > deadline, "Lottery ended");
        uint winningnumber = random();
        winningticket = ticketbuyers[winningnumber];
    }
    function balanceOfLotteryHouse() public view returns (uint balance) {
         balance = address(this).balance;
    }
    
    function transferWinAmount() external onlyManager{
        require(block.timestamp > deadline, "Lottery In Session");
        WinAmount = address(this).balance * 95 /100;
        address winner = ticketbuyers[random()];
        payable(winner).transfer( WinAmount);
        ticketbuyers = new address[](0);
        lotteryOpen = false;
    }
    function withdrawProfit() external onlyManager{
        uint profit = address(this).balance * 5 / 100;
        payable(manager).transfer(profit);
    }
    function getPlayers() external view returns(uint){
        return ticketbuyers.length;
    }

    
}
