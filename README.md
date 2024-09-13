# multisig Wallet

This project is an implementation of a multisig wallet contract along with an ERC20 token contract (`MTXToken`). It also includes a factory contract to create instances of the multisig contract.

## Contracts Overview


### 1. **MTXToken.sol**

This is a simple ERC20 token contract using OpenZeppelin's ERC20 standard implementation. It includes basic minting functionality with a capped supply, allowing only the owner to mint tokens.

- **Token Name**: Multi Token
- **Symbol**: MTX
- **Initial Supply**: 100,000 MTX tokens
- **Key Functions**:
  - `mint(uint _amount)`: The mint function allows the owner to mint additional tokens.

#### Usage:

```solidity
const mtxToken = await ethers.getContractFactory("MTXToken");
const token = await mtxToken.deploy();
await token.deployed();

// Minting additional tokens
await token.mint(1000); // mints 1000 MTX tokens
```

### 2. **Multisig.sol**

This contract allows multiple signers to approve token transfers, requiring a quorum of approvals before executing transactions.

- **Key Variables**:
  - `quorum`: Minimum number of signers required to approve a transaction.
  - `validSigners`: List of approved addresses that can sign transactions.
  - `transactions`: Mapping of transaction details (amount, recipient, etc.).
  - `quorumUpdates`: Mapping of proposed quorum changes, pending approval.

- **Key Functions**:
  - `transfer(uint256 _amount, address _recipient, address _tokenAddress)`: Propose a new token transfer.
  - `approveTx(uint8 _txId)`: Approve a transaction and execute it if quorum is reached.
  - `updateQuorum(uint8 _newQuorum)`: Propose a change to the quorum.
  - `approveQuorumUpdate(uint256 updateQuorumTxId)`: Approve quorum update proposals.

#### Usage:

```solidity
const multisig = await ethers.getContractFactory("Multisig");
const wallet = await multisig.deploy(3, [signer1.address, signer2.address, signer3.address]);
await wallet.deployed();

await wallet.transfer(500, recipient.address, mtxToken.address);

await wallet.approveTx(1);
```

### 3. **MultisigFactory.sol**

This factory contract allows for the creation of new multisig wallet instances with a customizable quorum and list of signers.

- **Key Functions**:
  - `createMultisigClone(uint8 _quorum, address[] _validSigners)`: Creates a new multisig wallet instance.
  - `getMultisigClones()`: Returns all created multisig wallets.

#### Example Usage:
```solidity
const factory = await ethers.getContractFactory("MultisigFactory");
const multisigFactory = await factory.deploy();
await multisigFactory.deployed();

// Create a new multisig wallet instance
await multisigFactory.createMultisigClone(3, [signer1.address, signer2.address, signer3.address]);

// Get all created multisig wallet clones
const multisigClones = await multisigFactory.getMultisigClones();
```

### 4. **Deployment Modules (Hardhat Ignition)**

The deployment process for the contracts is managed using the Hardhat Ignition tool. This allows for structured, module-based deployment of the contracts.

- **MTXTokenModule.ts**: Deploys the `MTXToken` contract.
- **MultisigModule.ts**: Deploys the `Multisig` contract with a set quorum and valid signers.
- **MultisigFactoryModule.ts**: Deploys the `MultisigFactory` contract.

#### Example Usage:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// MTXToken Deployment
const MTXTokenModule = buildModule("MTXTokenModule", (m) => {
  const mtx = m.contract("MTXToken");
  return { mtx };
});

// Multisig Wallet Deployment
const MultisigModule = buildModule("MultisigModule", (m) => {
  const multisig = m.contract("Multisig", [quorum, addresses]);
  return { multisig };
});

// MultisigFactory Deployment
const MultisigFactoryModule = buildModule("MultisigFactoryModule", (m) => {
  const multisigFactory = m.contract("MultisigFactory");
  return { multisigFactory };
});
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/livinalt/multisigWallet
   cd multisig
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the contracts:
   ```bash
   npx hardhat compile
   ```

4. Run tests:
   ```bash
   npx hardhat test
   ```

5. Deploy using Hardhat Ignition:
   ```bash
   npx hardhat run scripts/deploy.js --network yourNetwork
   ```

## Tests

Test coverage includes validation of quorum checks, token transfers, approval processes, and transaction execution. Ensure that all signers follow the process of proposing and approving transactions before execution.

## License

This project is licensed under the MIT License.
