
import ParentAccount from './parents_account.model';
import StudentRecord from '../students/students.model';



export const addPurchase = async (req, res) => {
  try {
    const { parentId, amount, description } = req.body;

    const account = await ParentAccount.findOne({ parentId });

    account.totalDebit += amount;
    account.balance = account.totalDebit - account.totalCredit;

    account.transactions.push({
      type: "DEBIT",
      amount,
      description: description || "Purchased Item"
    });

    await account.save();

    res.status(200).json({ message: "Purchase added", account });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const addPayment = async (req, res) => {
  try {
    const { parentId, amount, description, type } = req.body;

    const account = await ParentAccount.findOne({ parentId });

    account.totalCredit += amount;
    account.balance = account.totalDebit - account.totalCredit;

    account.transactions.push({
      type: type || "CREDIT",
      amount,
      description: description || "Payment Received"
    });

    await account.save();

    res.status(200).json({ message: "Payment added", account });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getParentAccountDetails = async (req, res) => {
  try {
    const parentId = req.params.parentId;

    if (!parentId) {
      return res.status(400).json({ message: "Parent ID is required" });
    }

    // Fetch account
    const account = await ParentAccount.findOne({ parentId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Fetch parent + children info
    const record = await StudentRecord.findById(parentId);

    return res.status(200).json({
      message: "Parent account fetched successfully",
      parent: record.parent,
      students: record.students,
      account: account
    });

  } catch (error) {
    console.error("Error fetching parent account:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTransactionRecord = async (req, res) => {
  try {
    const { _id, amount, description, parentId } = req.body;

    if (!_id || !parentId) {
      return res.status(400).json({ message: "Transaction ID and parentId are required" });
    }

    // STEP 1: Fetch parent account
    const account = await ParentAccount.findOne({ parentId: parentId });
    console.log('account: ', account);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // STEP 2: Update the specific transaction
    await ParentAccount.updateOne(
      { parentId: parentId, "transactions._id": _id },
      {
        $set: {
          "transactions.$.description": description,
          "transactions.$.amount": amount
        }
      }
    );

    // STEP 3: Fetch updated account
    const updatedAccount = await ParentAccount.findOne({ parentId: parentId });
    let totalDebit = 0;
    let totalCredit = 0;

    updatedAccount.transactions.forEach(t => {
      if (t.type === "DEBIT") totalDebit += t.amount;
      if (t.type === "CREDIT") totalCredit += t.amount;
      if (t.type === "ElIMINATED") totalCredit += t.amount;
    });

    updatedAccount.totalDebit = totalDebit;
    updatedAccount.totalCredit = totalCredit;
    updatedAccount.balance = totalDebit - totalCredit;

    await updatedAccount.save();

    return res.status(200).json({
      message: "Transaction updated successfully",
      account: updatedAccount
    });

  } catch (error) {
    console.error("Error updating transaction:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const deleteTransactionRecord = async (req, res) => {
  try {
    const { _id, parentId } = req.body;

    if (!_id || !parentId) {
      return res.status(400).json({ message: "Transaction ID and parentId are required" });
    }

    // STEP 1: Fetch parent account by parentId
    const account = await ParentAccount.findOne({ parentId: parentId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // STEP 2: Remove the transaction from the transactions array
    const transactionIndex = account.transactions.findIndex(
      (t: any) => t._id.toString() === _id
    );

    if (transactionIndex === -1) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Remove the transaction
    account.transactions.splice(transactionIndex, 1);

    // STEP 3: Recalculate totals
    let totalDebit = 0;
    let totalCredit = 0;

    account.transactions.forEach(t => {
      if (t.type === "DEBIT") totalDebit += t.amount;
      if (t.type === "CREDIT") totalCredit += t.amount;
      if (t.type === "ElIMINATED") totalCredit += t.amount; // treat as credit if needed
    });

    account.totalDebit = totalDebit;
    account.totalCredit = totalCredit;
    account.balance = totalDebit - totalCredit;

    // STEP 4: Save the updated account
    await account.save();

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ message: error.message });
  }
};



