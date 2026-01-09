import { Model, Schema ,Document,Types  } from "mongoose";


export interface IExpenses extends Document {
  amount: number;            
  description: string;           
  paidBy: string;  
  date: string;            
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExpensesModel extends Model<IExpenses> {}



