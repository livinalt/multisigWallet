import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const quorum = 5;
const addresses = [0x000000001, 0x0000000002, 0x00000000002, 0x00000000003, 0x00000000004, 0x00000000005]

const MultisigModule = buildModule("MultisigModule", (m) => {
  
  const multisig = m.contract("Multisig", [quorum, addresses]);

  return { multisig };
});

export default MultisigModule;
