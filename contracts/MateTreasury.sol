// SPDX-License-Identifier: MIT
// Mainnet
pragma solidity ^0.8.17;

contract MateTreasure {
    // Event to emit when a deposit is made
    event Deposit(address indexed sender, uint amount);
    // Event to emit when a withdrawal is made
    event Withdrawal(address indexed receiver, uint amount);

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Withdraw funds from the contract
    function withdraw(uint amount) external {
        // await for the contract validation
        require(
            amount <= address(this).balance,
            "Insufficient balance in the contract"
        );
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
