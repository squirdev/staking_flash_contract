// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FlashToken is ERC20{
    constructor() ERC20("FlashToken", "FS"){
        _mint(msg.sender,10000000000*10**18);
    }
}