import mongoose, { Schema, model } from "mongoose";
import { IExpenses, IExpensesModel } from "./expenses.interface";

const expensesSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  paidBy: {
    type: String,
  },
  date:{
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

export default model<IExpenses, IExpensesModel>("schoolExpenses", expensesSchema);
