import { Model, Schema ,Document,Types  } from "mongoose";

export interface ITransaction {
  type: "DEBIT" | "CREDIT" | "ElIMINATED";  
  description: string;
  amount: number;
  date?: Date;
}


export interface IParentAccount extends Document {
  parentId: Types.ObjectId;      // Reference to StudentRecord
  totalDebit: number;            // Total fee + purchases
  totalCredit: number;           // Total amount paid
  balance: number;               // totalDebit - totalCredit
  transactions: ITransaction[];  // Ledger of all transactions
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IParentAccountModel extends Model<IParentAccount> {}



