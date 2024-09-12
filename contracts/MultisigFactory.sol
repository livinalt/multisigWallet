// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Multisig.sol";

contract MultisigFactory {

    Multisig[] public multisigClones;

    function createMultisigClone(uint8 _quorum, address[] memory _validSigners) external returns(Multisig _newMultisig, uint256 _length){
        _newMultisig = new Multisig(_quorum, _validSigners);
        multisigClones.push(_newMultisig);
        _length = multisigClones.length;
        return(newMultisig, _length);
    }

    function getMultisigClones() external view returns(Multisig[] memory){
        return multisigClones;
    }

}