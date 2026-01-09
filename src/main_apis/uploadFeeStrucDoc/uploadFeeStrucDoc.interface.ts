import { Model, Schema ,Document } from "mongoose";

export interface IFeeStructureDocument extends Document {
        name:string;
        fileEncrypt:string;
}

export interface IFeeStructureDocumentModel extends Model<IFeeStructureDocument>{}