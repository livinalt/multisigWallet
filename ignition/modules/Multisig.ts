import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const quorum = 5;
const addresses = [
  "0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b",
  "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0xA9A59Bf849a1581658DeF926C6f12b83EfdF0DB3",
  "0x2e900bAdc3580fdA7ce20bf5f3A12b1C2A565817"
];




const MultisigModule = buildModule("MultisigModule", (m) => {
  const multisig = m.contract("Multisig", [quorum, addresses]);

  return { multisig };
});

export default MultisigModule;
