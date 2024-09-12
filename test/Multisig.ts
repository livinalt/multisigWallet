import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

// describe("Multisig", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function MultisigFixture() {
    
//     // Contracts are deployed using the first signer/account by default
//     const [owner, addr1, addr2, addr3, addr4, recepient, otherAccount] = await hre.ethers.getSigners();

//     const quorum = 5;
//     const amount = ethers.parseUnits("5", 2);

//     // const validSignersAddress = [
//     //   {owner:"0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b",
//     //   addr1:"0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
//     //   addr2:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//     //   addr3: "0xA9A59Bf849a1581658DeF926C6f12b83EfdF0DB3",
//     //   addr4: "0x2e900bAdc3580fdA7ce20bf5f3A12b1C2A565817"}
//     // ];

//     const TokenAddress = await hre.ethers.getContractFactory("TokenAddress");
//     const tokenAddress = await TokenAddress.deploy();


//     const validSigners = [owner.address, addr1.address, addr2.address, addr3.address, addr4.address];

//     const addressZero = "0x0000000000000000000000000000000000000000";

//     const Multisig = await hre.ethers.getContractFactory("Multisig");
//     const multisig = await Multisig.deploy(quorum, [owner, addr1, addr2, addr3, addr4,]);

//     return { multisig, amount, addressZero, validSigners, quorum, tokenAddress, recepient, otherAccount, owner, addr1, addr2, addr3, addr4};
//   }


//   describe("Deployment", function () {
//     it("Should check the length of valid signers", async function () {
//       const { validSigners } = await loadFixture(MultisigFixture);

//       const length = validSigners.length;

//       expect(length).to.be.greaterThan(1);

//     });
    
//     it("Should check if the number of quorum is too small", async function () {
//       const {multisig, quorum } = await loadFixture(MultisigFixture);
//       const newQuorum = 1;
//       expect(await multisig.quorum()).to.be.greaterThan(newQuorum);
//     });
    
//   //     it("Should check for address zero", async function () {
//   //   const {addr1, addressZero} = await loadFixture(MultisigFixture);
//   //   expect(addr1.address).to.not.be.eq(addressZero);
//   // });


// //     it("Should set the valid signers", async function () {
// //    const {owner, addr1, validSigners, addressZero, otherAccount } = await loadFixture(MultisigFixture);

// //   //  expect(signer).to.equal("0x92fF7b7a0D32CA77130eb71a2d50A1389f04A98b");
// //   //  expect(signer).not.to.be.equal(addressZero);
// //    expect(signer).not.to.be.equal(validSigners);

// // });

//   });


// //   describe("Transfer", function () {
// //     describe("Validations", function () {

// //       it("Should check that sender is not address zero", async function () {
// //       const {owner, addressZero} = await loadFixture(MultisigFixture);
// //       expect(owner).to.not.be.eq(addressZero);
// //     });
      
    
// //     it("Should check that a valid Signer owner(msg.sender) is valid", async function () {
// //       const {owner,validSigners} = await loadFixture(MultisigFixture);
// //       expect(validSigners.includes(owner.address)).to.be.true;
// //     });


// //       it("Should check for address zero", async function () {
// //     const {addr1, addressZero} = await loadFixture(MultisigFixture);
// //     expect(addr1.address).to.not.be.eq(addressZero);
// //   });

// //       it("amount should be more than zero", async function () {
// //         const { amount } = await loadFixture(
// //           MultisigFixture);
// //           expect(amount).to.be.greaterThan(0);
// //     });

// //      it("Should transfer the funds to the receipient", async function () {
// //         const { multisig, recepient, amount, owner, tokenAddress } = await loadFixture(
// //           MultisigFixture
// //         );
      
    
// //     it("Should transfer the funds to the recipient", async function () {
// //         const { multisig, recepient, amount, owner, tokenAddress, otherAccount } = await loadFixture(MultisigFixture);

// //         const token = await ethers.getContractAt("IERC20", tokenAddress);

// //         // Mint or transfer tokens to the multisig contract before transferring
// //         await token.transfer(multisig.address, amount);

// //         // Perform the multisig transfer
// //         await expect(multisig.transfer(amount, recepient.address, tokenAddress))
// //           .to.emit(multisig, 'Transfer') // Emit a custom event if implemented, else omit this
// //           .to.changeTokenBalances(
// //             token,
// //             [multisig, recepient],
// //             [-amount, amount]
// //           );
// //       });



// //       it("Should approve transaction and complete transfer when quorum is reached", async function () {
// //   const { multisig, recepient, amount, tokenAddress, addr1, addr2, owner } = await loadFixture(MultisigFixture);

// //   const token = await ethers.getContractAt("IERC20", tokenAddress);

// //   // Transfer tokens to the contract
// //   await token.transfer(multisig.address, amount);

// //   // Initiate a transaction
// //   await multisig.connect(owner).transfer(amount, recepient.address, tokenAddress);

// //   // Approve the transaction by other signers
// //   await multisig.connect(addr1).approveTx(1); // Approve transaction 1
// //   await multisig.connect(addr2).approveTx(1); // Approve transaction 1

// //   // Verify the transaction has completed
// //   expect((await multisig.transactions(1)).isCompleted).to.be.true;
// // });



// //         await expect(multisig.transfer(amount, recepient, tokenAddress)).to.changeTokenBalance(
// //           [owner, multisig],
// //           [amount]
// //         );
// //       });
// //     });

// //     });


// });




describe("Multisig", function () {
  // Load fixture for the test setup
  async function MultisigFixture() {
    const [owner, addr1, addr2, addr3, addr4, recipient, otherAccount] = await hre.ethers.getSigners();

    const quorum = 4;  // Minimum number of approvals required
    const Token = await hre.ethers.getContractFactory("Web3");
    const token = await Token.deploy();  // Deploy ERC20 token for testing

    const Multisig = await hre.ethers.getContractFactory("Multisig");
    const validSigners = [addr1, addr2, addr3, addr4];

    const addressZero = "0x0000000000000000000000000000000000000000";

    const multisig = await Multisig.deploy(quorum, validSigners);  // Deploy multisig contract

    return { multisig, validSigners, token, owner, addr1, addr2, addr3, addr4, recipient, addressZero, otherAccount, quorum};
  }

  describe("Deployment", function () {
    it("Should set valid signers and quorum correctly", async function () {
      const { multisig, validSigners } = await loadFixture(MultisigFixture);

      // Check the number of valid signers
      const signerCount = validSigners.length;
      expect(await multisig.quorum()).to.equal(signerCount);

  });
    
  it("Should check that quorum is greater than 1", async function () {
      const { multisig } = await loadFixture(MultisigFixture);
      const newQuorum = 1;

      expect(await multisig.quorum()).to.be.greaterThan(newQuorum);
      // expect(await multisig.quorum()).to.be.lessThan(newQuorum);

  });
 
  it("Should check for address Zero", async function () {
      const { validSigners, addressZero } = await loadFixture(MultisigFixture);
      
      expect(validSigners[0]).not.be.equal(addressZero);
      expect(validSigners[1]).not.be.equal(addressZero);
      expect(validSigners[2]).not.be.equal(addressZero);
      expect(validSigners[3]).not.be.equal(addressZero);

  });
  
  it("Revert Error if Address Zero is detected", async function () {
      const { addressZero } = await loadFixture(MultisigFixture);
      
      expect(addressZero).to.be.revertedWith("zero address not allowed");

  });

  describe("Transaction Validation", function () {
    it("Should check that valid signers are correctly recognized", async function () {
      const { multisig, addr1, addr2, addr3, addr4, otherAccount } = await loadFixture(MultisigFixture);

      // Owner should be a valid signer
      expect(await multisig.isValidSigner(addr1)).to.be.true;
      expect(await multisig.isValidSigner(addr2)).to.be.true;
      expect(await multisig.isValidSigner(addr3)).to.be.true;
      expect(await multisig.isValidSigner(addr4)).to.be.true;

      // OtherAccount should not be a valid signer
      expect(await multisig.isValidSigner(otherAccount)).not.be.true;

      // Alternatively, OtherAccount should not be a valid signer
      expect(await multisig.isValidSigner(otherAccount.address)).to.be.false;
    });

    it("Should allow valid signers to initiate a transaction", async function () {
      const { multisig, owner, recipient, token } = await loadFixture(MultisigFixture);

      const amount = ethers.parseUnits("10", 18);  // Amount to transfer

      // Transfer tokens to the multisig contract for the transaction
      await token.transfer(multisig.address, amount);

      // Owner initiates the transaction
      await multisig.connect(owner).createTransaction(amount, recipient.address, token.address);

      // Check the transaction is recorded
      const tx = await multisig.transactions(1);  // Get transaction with id = 1
      expect(tx.recipient).to.equal(recipient.address);
      expect(tx.amount).to.equal(amount);
    });
  });

  describe("Transaction Approval", function () {
    it("Should allow valid signers to approve transactions and complete it when quorum is reached", async function () {
      const { multisig, owner, addr1, addr2, recipient, token } = await loadFixture(MultisigFixture);

      const amount = ethers.utils.parseUnits("10", 18);  // Amount to transfer

      // Transfer tokens to the multisig contract for the transaction
      await token.transfer(multisig.address, amount);

      // Owner initiates the transaction
      await multisig.connect(owner).createTransaction(amount, recipient.address, token.address);

      // Approve the transaction by other valid signers
      await multisig.connect(addr1).approveTransaction(1);  // Approve transaction with id 1
      await multisig.connect(addr2).approveTransaction(1);  // Approve transaction with id 1

      // Check if the transaction is completed (after reaching quorum)
      const tx = await multisig.transactions(1);
      expect(tx.isCompleted).to.be.true;

      // Check recipient received the funds
      const recipientBalance = await token.balanceOf(recipient.address);
      expect(recipientBalance).to.equal(amount);
    });

    it("Should not complete the transaction without reaching the quorum", async function () {
      const { multisig, owner, addr1, recipient, token } = await loadFixture(MultisigFixture);

      const amount = ethers.utils.parseUnits("10", 18);  // Amount to transfer

      // Transfer tokens to the multisig contract for the transaction
      await token.transfer(multisig.address, amount);

      // Owner initiates the transaction
      await multisig.connect(owner).createTransaction(amount, recipient.address, token.address);

      // Only one signer approves, not enough for quorum
      await multisig.connect(addr1).approveTransaction(1);

      // Check the transaction is not completed yet
      const tx = await multisig.transactions(1);
      expect(tx.isCompleted).to.be.false;

      // Recipient should not receive the funds
      const recipientBalance = await token.balanceOf(recipient.address);
      expect(recipientBalance).to.equal(0);
    });
  });

  describe("Quorum Updates", function () {
    it("Should allow updating the quorum with enough approvals", async function () {
      const { multisig, owner, addr1, addr2 } = await loadFixture(MultisigFixture);

      // Owner initiates a quorum update to set the new quorum to 4
      await multisig.connect(owner).proposeQuorumUpdate(4);

      // Approve the quorum update by other valid signers
      await multisig.connect(addr1).approveQuorumUpdate(1);  // Approve quorum update with id 1
      await multisig.connect(addr2).approveQuorumUpdate(1);  // Approve quorum update with id 1

      // Check if the quorum is updated
      const newQuorum = await multisig.quorum();
      expect(newQuorum).to.equal(4);
    });

    it("Should not update the quorum without enough approvals", async function () {
      const { multisig, owner, addr1 } = await loadFixture(MultisigFixture);

      // Owner initiates a quorum update to set the new quorum to 4
      await multisig.connect(owner).proposeQuorumUpdate(4);

      // Only one signer approves, not enough for quorum
      await multisig.connect(addr1).approveQuorumUpdate(1);

      // Check if the quorum remains unchanged
      const currentQuorum = await multisig.quorum();
      expect(currentQuorum).to.not.equal(4);  // Still the old quorum
    });
  });
});
});