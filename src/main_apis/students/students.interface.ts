import { Model, Schema ,Document } from "mongoose";


export interface IStudent {
  name: string;
  class: string;
  gender: string;
  image?: string | null;
  hasAcademy: boolean;
  monthlyFee: number;
  admissionFee: number;
  academyFee?: number;
  totalFee: number;
  createdAt?: Date; // ✅ Added this line
  updatedAt?: Date;
  rollNo?: string;
  hasLeftSchool?: boolean;
  isDeleted?:boolean;
  
}

export interface IParent {
  name: string;
  phone: string;
  secondary_phone?: string;
  cnic: string;
  address?: string;
  isDeleted?:boolean;
  occupation?: string;
}

export interface IStudentRecord extends Document {
  parent: IParent;
  students: IStudent[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStudentRecordModel extends Model<IStudentRecord> {}



