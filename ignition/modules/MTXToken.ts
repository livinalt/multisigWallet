import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MTXTokenModule = buildModule("MTXTokenModule", (m) => {

    const mtx = m.contract("MTXToken");

    return { mtx };
});

export default MTXTokenModule;
