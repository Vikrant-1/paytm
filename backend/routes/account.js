const express = require("express");
const { authMiddleware } = require("../middleware");
const { Accounts } = require("../db/accounts.db");
const { User } = require("../db/users.db");
const { mongo, default: mongoose } = require("mongoose");
const router = express.Router();

// get user balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = (new mongoose.Types.ObjectId(req.userId))._id;
    const account = await Accounts.findOne({ userId });    

    res.status(200).json({
      message: "Succesfully get the balance",
      balance: account.balance,
    });
  } catch (error) {
    res.status(401).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// An endpoint for user to transfer money to another account

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { to, amount } = req.body;
    const userId = req.userId;
    // Validate amount
    if (amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid transfer amount",
      });
    }

    // check user bank balance
    const myAccount = await Accounts.findOne({ userId }).session(session);

    if (!myAccount || myAccount.balance < amount) {
     await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // check if to Account exist ot not
    const toAccount = await Accounts.findOne({ userId: to }).session(session);

    if (!toAccount) {
     await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }
    // update user balnace
    await Accounts.updateOne(
      { userId: userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    // update to Account balance
    await Accounts.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

   await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
   await session.abortTransaction();
  } finally {
   await session.endSession();
  }
});

module.exports = router;
