import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Multisig", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function MultisigFixture() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2, addr3, addr4, otherAccount] = await hre.ethers.getSigners();

    const quorum = 5;
    const validSigners = [
      "0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b",
      "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "0xA9A59Bf849a1581658DeF926C6f12b83EfdF0DB3",
      "0x2e900bAdc3580fdA7ce20bf5f3A12b1C2A565817"
    ];

    const addressZero = "0x0000000000000000000000000000000000000000";

    const Multisig = await hre.ethers.getContractFactory("Multisig");
    const multisig = await Multisig.deploy("Multisig", validSigners);

    return { multisig, validSigners, quorum, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the quorum", async function () {
      const { multisig, quorum } = await loadFixture(MultisigFixture);

      const signers = 5;

      expect(await multisig.quorum()).to.equal(signers);
    });

    it("Should set the valid signers", async function () {
      const { multisig, validSigners } = await loadFixture(MultisigFixture);
      const signers = 5;

      const newSigners = [
        "0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b",
        "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0xA9A59Bf849a1581658DeF926C6f12b83EfdF0DB3",
        "0x2e900bAdc3580fdA7ce20bf5f3A12b1C2A565817"
      ];

      // Use deep.equal to compare array contents, not references
      expect(await multisig.getValidSigners(signers)).to.deep.equal(newSigners);
    });

  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(MultisigFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         MultisigFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         MultisigFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         MultisigFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         MultisigFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
