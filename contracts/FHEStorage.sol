// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/FHEOps.sol";
import "@fhenixprotocol/contracts/BaseFHE.sol";

contract FHEStorage is BaseFHE {
    mapping(address => euint32) private encryptedData;

    function storeEncrypted(bytes calldata encryptedValue) external {
        euint32 value = FHE.asEuint32(encryptedValue);
        encryptedData[msg.sender] = value;
    }

    function retrieveEncrypted() external view returns (bytes memory) {
        return FHE.reencrypt(encryptedData[msg.sender], msg.sender);
    }
}
