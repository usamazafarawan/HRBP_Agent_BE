import { Model, Schema ,Document } from "mongoose";

export interface ISignUp extends Document {
        isSchoolAuthority:boolean;
        password:string;
        name:string;
        email:string;
}

export interface ISignUpModel extends Model<ISignUp>{}