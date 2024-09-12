import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MTXTokenModule = buildModule("MTXTokenModule", (m) => {

    const erc20 = m.contract("MTXToken");

    return { erc20 };
});

export default MTXTokenModule;
