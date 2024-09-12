import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Web3Module = buildModule("Web3Module", (m) => {

    const erc20 = m.contract("Web3");

    return { erc20 };
});

export default Web3Module;
