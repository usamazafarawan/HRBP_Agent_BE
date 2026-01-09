import { Model, Schema ,Document } from "mongoose";

export interface IStudentAccountRecord extends Document {
        studentName: string;
        studentId: string;
        studentRollNo: string;
        class: number;
        totalDues:number ;
        PendingDues:number;
        Submitted:number;
        finalFeePerMonth :number;
        schoolFee_HavingAcademy:number;
        havingAcademy:boolean;
        academyFee_HavingAcademy:number;
        admissionFee:number;
        details:PaymentDetail[];

      
}

export interface IStudentAccountRecordModel extends Model<IStudentAccountRecord>{}




export interface PaymentDetail{
        description ?: string;
        currentDate?: string;
        amount ?: number;
        status?: boolean;
}