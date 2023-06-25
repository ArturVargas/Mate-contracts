// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./DataAsserter.sol";

contract MateBook {
    mapping(address => uint) public balances;
    DataAsserter public dataAsserter;

    constructor(address _defaultCurrency, address _optimisticOracleV3) {
        dataAsserter = new DataAsserter(_defaultCurrency, _optimisticOracleV3);
    }

    function checkDeposit(
        bytes32 dataId,
        bytes32 data,
        address asserter
    ) public returns (bytes32 assertionId) {
        //ask to uma oracle if deposit exists and update
        return dataAsserter.assertDataFor(dataId, data, asserter);
    }

    function updateDeposit(bytes32 assertionId, uint amount) public {
        (bool result, bytes32 data) = dataAsserter.getData(assertionId);
        require(result, "Error");
        balances[msg.sender] += amount;
    }

    function checkBalance(
        bytes32 dataId,
        bytes32 data,
        address asserter
    ) public returns (bytes32 assertionId) {
        //ask to uma oracle if balance was updated
        return dataAsserter.assertDataFor(dataId, data, asserter);
    }

    function updateBalance(
        bytes32 assertionId,
        uint amount,
        address to
    ) public {
        (bool result, ) = dataAsserter.getData(assertionId);
        require(result, "Error");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
