import { Model, Schema ,Document } from "mongoose";

export interface IStudentAdmissionInfo extends Document {
        studentName: string;
        studentFatherName: string;
        fatherOccuption: string;
        address: string;
        studentPicture: string;
        dateOfBirth: string;
        placeOfBirth: string;
        Religion: string;
        cast: string;
        motherTongue: number;
        class: number;
        havingAcademy: boolean;
        havingSiblings: boolean;
        schoolFee_HavingAcademy: number;
        academyFee_HavingAcademy: number;
        totalFee_HavingAcademy: number;
        feePerMonth: number;
        finalFeePerMonth:number;
        rollNumber: string;
        addmissionDate: string;
        admissionFee:number;
        // selectedSiblings:siblingsDetails[];
        selectedSiblings:string[];

}

export interface IStudentAdmissionInfoModel extends Model<IStudentAdmissionInfo>{}

// export interface siblingsDetails{
//         class ?: number;
//         className?: string;
//         studentFatherName ?: string;
//         studentName?: string;
//         _id?: string;
//         rollNumber?:string;
// }