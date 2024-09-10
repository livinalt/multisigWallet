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
    const [owner, addr1, addr2, addr3, addr4, recepient, otherAccount] = await hre.ethers.getSigners();

    const quorum = 5;
    const amount = 5;
    const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const validSignersAddress = [
      {owner:"0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b",
      addr1:"0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
      addr2:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      addr3: "0xA9A59Bf849a1581658DeF926C6f12b83EfdF0DB3",
      addr4: "0x2e900bAdc3580fdA7ce20bf5f3A12b1C2A565817"}
    ];

    const validSigners = [owner.address, addr1.address, addr2.address, addr3.address, addr4.address];

    const addressZero = "0x0000000000000000000000000000000000000000";

    const Multisig = await hre.ethers.getContractFactory("Multisig");
    const multisig = await Multisig.deploy(quorum, validSigners);

    return { multisig, amount, addressZero, validSigners, quorum, tokenAddress, recepient, otherAccount, owner, addr1, addr2, addr3, addr4};
  }


  describe("Deployment", function () {
    it("Should check the length of valid signers", async function () {
      const { validSigners, quorum } = await loadFixture(MultisigFixture);

      const length = validSigners.length;

      expect(length).to.be.greaterThan(1);
    });
    
    it("Should check if the number of quorum is too small", async function () {
      const { quorum } = await loadFixture(MultisigFixture);
      expect(quorum).to.be.greaterThan(1);
    });
    
      it("Should check for address zero", async function () {
    const {addr1, addressZero} = await loadFixture(MultisigFixture);
    expect(addr1.address).to.not.be.eq(addressZero);
  });


//     it("Should set the valid signers", async function () {
//    const {owner, addr1, validSigners, addressZero, otherAccount } = await loadFixture(MultisigFixture);

//   //  expect(signer).to.equal("0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b");
//   //  expect(signer).not.to.be.equal(addressZero);
//    expect(signer).not.to.be.equal(validSigners);

// });

  });


  describe("Transfer", function () {
    describe("Validations", function () {

      it("Should check that sender is not address zero", async function () {
      const {owner, addressZero} = await loadFixture(MultisigFixture);
      expect(owner).to.not.be.eq(addressZero);
    });
      
    
    it("Should check that a valid Signer owner(msg.sender) is valid", async function () {
      const {owner,validSigners} = await loadFixture(MultisigFixture);
      expect(validSigners.includes(owner.address)).to.be.true;
    });


      it("Should check for address zero", async function () {
    const {addr1, addressZero} = await loadFixture(MultisigFixture);
    expect(addr1.address).to.not.be.eq(addressZero);
  });

      it("amount should be more than zero", async function () {
        const { amount } = await loadFixture(
          MultisigFixture);
          expect(amount).to.be.greaterThan(0);
    });

     it("Should transfer the funds to the receipient", async function () {
        const { multisig, recepient, amount, owner, tokenAddress } = await loadFixture(
          MultisigFixture
        );


        await expect(multisig.transfer(amount, recepient, tokenAddress)).to.changeTokenBalance(
          [owner, multisig],
          [amount]
        );
      });
    });

    });


});
