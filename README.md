The contract is implemented in Solidity version 0.8.19.

Contract Overview
Manager: The address responsible for managing the contract, typically the contract's creator.

lotteryOpen: A boolean flag indicating whether the lottery is currently open for ticket purchases.

deadline: The timestamp after which the lottery will end, and a winner will be selected.

WinAmount: The total amount of Ether to be awarded to the lottery winner.

ticketbuyers: An array containing the addresses of participants who have purchased tickets.

Contract Manager
The contract manager is the Ethereum address that deployed the lottery contract. The manager has special privileges, including the ability to initiate lotteries and perform certain actions.

Modifier: onlyManager
The onlyManager modifier ensures that only the manager can execute specific functions within the contract.

Lottery Lifecycle
The lottery follows a structured lifecycle:

Constructor: Initializes the manager as the contract's deployer.

Create Lottery: The createLottery function starts a new lottery round with a specified duration. Only the manager can initiate a new lottery, and this function can only be called when no previous lottery is in progress.

Buy Lottery Ticket: Users can participate in the lottery by calling buyLotteryTicket and sending at least 2 Ether. This function can only be called while the lottery is open, and the participant's address is added to the ticketbuyers array.

Winning Address: After the lottery deadline has passed, the manager can call winningAddress to randomly select the winning address from the list of participants.

Transfer Win Amount: Once the winner is determined, the manager can call transferWinAmount to transfer 95% of the contract's balance to the winner. The remaining 5% is considered profit.

Payout and Profit
The winning amount is calculated as 95% of the contract's balance and is transferred to the lottery winner.

The manager can withdraw the 5% profit by calling withdrawProfit.

Getting Started
To use this Lottery smart contract:

Deploy the contract on the Ethereum blockchain, specifying the manager's address.

As the manager, start a new lottery round using the createLottery function, specifying the duration of the lottery.

Users can participate in the lottery by calling buyLotteryTicket and sending at least 2 Ether.

After the lottery deadline has passed, the manager can call winningAddress to determine the winner.

Finally, the manager can call transferWinAmount to distribute the winnings and withdrawProfit to collect the profit.

Remember to interact with the contract using a suitable Ethereum wallet or a DApp interface.


