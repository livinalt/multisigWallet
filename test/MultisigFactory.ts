import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("MultisigFactory", function () {
  async function MultisigFactoryFixture() {
    const [owner, addr1, addr2, addr3, addr4, recipient, otherAccount] = await hre.ethers.getSigners();

    const quorum = 4;  // Minimum number of approvals required
    const amount = ethers.parseUnits("5", 2);
    const Token = await hre.ethers.getContractFactory("MTXToken");
    const token = await Token.deploy();  // Deploy ERC20 token for testing

    const Multisig = await hre.ethers.getContractFactory("Multisig");
    const validSigners = [addr1.address, addr2.address, addr3.address, addr4.address];

    const MultisigFactory = await hre.ethers.getContractFactory("MultisigFactory");
    const multisigFactory = await MultisigFactory.deploy();

    return { multisigFactory, owner, addr1, addr2, addr3, addr4, recipient, otherAccount, quorum, validSigners };
  }

  describe("Create Multisig clones", function () {
    it("Should create clones", async function () {
      const { multisigFactory, owner, quorum, validSigners } = await loadFixture(MultisigFactoryFixture);

        const result = await multisigFactory.createMultisigClone(quorum, validSigners);
        // const result = await multisigFactory.connect(owner).createMultisigClone(quorum, validSigners);
        
        const newClone = await multisigFactory.getMultisigClones();
        expect(newClone.length).to.be.equal(1);
     
    });

  
  });
});
