import mongoose, { Schema, model } from "mongoose";
import { IParentAccount, IParentAccountModel } from "./parents_account.interface";


const transactionSchema = new Schema({
  type: { type: String, enum: ["DEBIT", "CREDIT","ElIMINATED"], required: true }, 
  // DEBIT = Amount parent has to pay (fee, purchases)
  // CREDIT = Amount parent paid (payment received)

  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const parentAccountSchema = new Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "StudentRecord", required: true },

  totalDebit: { type: Number, default: 0 },   // total fee or purchases
  totalCredit: { type: Number, default: 0 },  // total paid by parent
  balance: { type: Number, default: 0 }, // totalDebit - totalCredit

  transactions: [transactionSchema]
}, { timestamps: true });

export default model<IParentAccount, IParentAccountModel>("ParentAccount", parentAccountSchema);
