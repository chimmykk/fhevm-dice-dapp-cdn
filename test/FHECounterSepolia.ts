import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { FHEDiceGame } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("FHEDiceGameSepolia", function () {
  let signers: Signers;
  let fheDiceGameContract: FHEDiceGame;
  let fheDiceGameContractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const FHEDiceGameDeployment = await deployments.get("FHEDiceGame");
      fheDiceGameContractAddress = FHEDiceGameDeployment.address;
      fheDiceGameContract = await ethers.getContractAt("FHEDiceGame", FHEDiceGameDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("should play dice game with encrypted seed and guess", async function () {
    steps = 12;
    this.timeout(4 * 40000);

    // Check initial balance
    const initialBalance = await ethers.provider.getBalance(signers.alice.address);
    progress(`Initial balance: ${ethers.formatEther(initialBalance)} ETH`);

    // Encrypt seed value
    progress("Encrypting seed value...");
    const seedValue = Math.floor(Math.random() * 1000000) + 1;
    const encryptedSeed = await fhevm
      .createEncryptedInput(fheDiceGameContractAddress, signers.alice.address)
      .add32(seedValue)
      .encrypt();

    // Encrypt guess value (1-6)
    progress("Encrypting guess value...");
    const guessValue = Math.floor(Math.random() * 6) + 1;
    const encryptedGuess = await fhevm
      .createEncryptedInput(fheDiceGameContractAddress, signers.alice.address)
      .add32(guessValue)
      .encrypt();

    progress(
      `Playing dice game with seed=${seedValue}, guess=${guessValue}, contract=${fheDiceGameContractAddress}...`,
    );

    // Play the dice game
    const entryFee = ethers.parseEther("0.0002");
    const tx = await fheDiceGameContract
      .connect(signers.alice)
      .playDice(
        encryptedSeed.handles[0],
        encryptedSeed.inputProof,
        encryptedGuess.handles[0],
        encryptedGuess.inputProof,
        { value: entryFee },
      );
    await tx.wait();

    progress("Game played successfully!");

    // Get the last dice roll
    progress("Getting last dice roll...");
    const encryptedDiceRoll = await fheDiceGameContract.getLastDiceRoll();
    expect(encryptedDiceRoll).to.not.eq(ethers.ZeroHash);

    progress(`Decrypting dice roll=${encryptedDiceRoll}...`);
    const clearDiceRoll = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedDiceRoll,
      fheDiceGameContractAddress,
      signers.alice,
    );
    progress(`Clear dice roll=${clearDiceRoll}`);

    // Get the player's guess
    progress("Getting player guess...");
    const encryptedPlayerGuess = await fheDiceGameContract.getPlayerGuess();
    expect(encryptedPlayerGuess).to.not.eq(ethers.ZeroHash);

    progress(`Decrypting player guess=${encryptedPlayerGuess}...`);
    const clearPlayerGuess = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedPlayerGuess,
      fheDiceGameContractAddress,
      signers.alice,
    );
    progress(`Clear player guess=${clearPlayerGuess}`);

    // Verify dice roll is between 1 and 6
    expect(clearDiceRoll).to.be.greaterThanOrEqual(1);
    expect(clearDiceRoll).to.be.lessThanOrEqual(6);

    // Verify player guess matches what we sent
    expect(clearPlayerGuess).to.eq(guessValue);

    progress("Test completed successfully!");
  });

  it("should revert with incorrect entry fee", async function () {
    steps = 3;
    this.timeout(2 * 40000);

    progress("Encrypting seed and guess values...");
    const seedValue = 12345;
    const guessValue = 3;

    const encryptedSeed = await fhevm
      .createEncryptedInput(fheDiceGameContractAddress, signers.alice.address)
      .add32(seedValue)
      .encrypt();

    const encryptedGuess = await fhevm
      .createEncryptedInput(fheDiceGameContractAddress, signers.alice.address)
      .add32(guessValue)
      .encrypt();

    progress("Attempting to play with incorrect entry fee...");
    const incorrectFee = ethers.parseEther("0.0001"); // Less than required 0.0002

    await expect(
      fheDiceGameContract
        .connect(signers.alice)
        .playDice(
          encryptedSeed.handles[0],
          encryptedSeed.inputProof,
          encryptedGuess.handles[0],
          encryptedGuess.inputProof,
          { value: incorrectFee },
        ),
    ).to.be.revertedWithCustomError(fheDiceGameContract, "IncorrectEntryFee");

    progress("Correctly reverted with IncorrectEntryFee!");
  });
});
