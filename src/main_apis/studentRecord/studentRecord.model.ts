import { Schema, model } from 'mongoose';
import { IStudentAdmissionInfo, IStudentAdmissionInfoModel } from './studentRecord.interface';


let studentAdmissionRecordSchema: Schema<IStudentAdmissionInfo> = new Schema({

        studentName: { type: String, required: true },
        studentFatherName: { type: String, required: true},
        fatherOccuption: { type: String, required: true},
        address: { type: String, required: true },
        studentPicture: { type: String },
        dateOfBirth: { type: String, required: true},
        placeOfBirth: { type: String, required: true },
        Religion: { type: String, required: true},
        cast: { type: String, required: true},
        motherTongue: { type: Number, required: true },
        class: { type: Number, required: true},
        havingAcademy: { type: Boolean, required: true},
        havingSiblings: { type: Boolean, required: true},
        schoolFee_HavingAcademy: { type: Number, required: true },
        academyFee_HavingAcademy: { type: Number, required: true},
        finalFeePerMonth: { type: Number, required: true},
        totalFee_HavingAcademy: { type: Number, required: true},
        feePerMonth: { type: Number, required: true },
        rollNumber: { type: String, required: true},
        addmissionDate: { type: String, required: true},
        admissionFee: { type: Number, required: true },
        // selectedSiblings: [{
        //         className:{ type: String, trim: true, default: "" },
        //         class:{ type: Number, default: 0 },
        //         studentFatherName:{ type: String, default: '' },
        //         studentName:{ type: String, default: "" },
        //         _id:{ type: String, default: '' },
        //         rollNumber:{ type: String, default: '' },

        //         }
        //     ],
        selectedSiblings:[{
                type: String
            }]

});

//@ts-ignore
export = model<IStudentAdmissionInfo, IStudentAdmissionInfoModel>('studentAdmissionRecord', studentAdmissionRecordSchema);
