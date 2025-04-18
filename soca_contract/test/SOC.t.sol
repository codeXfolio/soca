// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;

import "forge-std/Test.sol";
import {SOC} from "../src/SOC.sol"; // Replace with the actual path to your ERC20 token contract

contract test_SOC is Test {
    SOC public token;

    // It looks like you may not have tests set up in this repository yet.

    function setUp() public {
        // Deploy your ERC20 (SOC) token contract.
        token = new SOC(1000000e18);
    }

    function testInitialSupply() public view {
        // Verify the deployer gets the entire initial supply.
        uint256 totalSupply = token.totalSupply();
        uint256 deployerBalance = token.balanceOf(address(this));
        assertEq(
            deployerBalance,
            totalSupply,
            "Deployer should hold the full initial supply"
        );
    }

    function testTransfer() public {
        // Test a basic transfer operation.
        address recipient = address(0x1);
        uint256 transferAmount = 100 * 10 ** 18; // adjust decimals if needed

        uint256 initialSenderBalance = token.balanceOf(address(this));
        bool success = token.transfer(recipient, transferAmount);
        require(success, "Transfer failed");

        assertEq(
            token.balanceOf(recipient),
            transferAmount,
            "Recipient did not receive correct amount"
        );
        assertEq(
            token.balanceOf(address(this)),
            initialSenderBalance - transferAmount,
            "Sender's balance did not decrease correctly"
        );
    }

    function testApproveAndTransferFrom() public {
        // Test ERC20 approval and transferFrom functionality.
        address spender = address(0x2);
        address recipient = address(0x3);
        uint256 approveAmount = 50 * 10 ** 18; // adjust decimals if needed

        bool approvalSuccess = token.approve(spender, approveAmount);
        require(approvalSuccess, "Approval failed");

        // Simulate the spender using transferFrom.
        vm.prank(spender);
        bool transferFromSuccess = token.transferFrom(
            address(this),
            recipient,
            approveAmount
        );
        require(transferFromSuccess, "transferFrom failed");

        assertEq(
            token.balanceOf(recipient),
            approveAmount,
            "Recipient did not receive tokens via transferFrom"
        );
        assertEq(
            token.allowance(address(this), spender),
            0,
            "Allowance was not fully used"
        );
    }
}
