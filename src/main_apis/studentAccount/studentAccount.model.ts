import { Schema, model } from 'mongoose';
import { IStudentAccountRecord, IStudentAccountRecordModel } from './studentAccount.interface';


let studentAccountRecordSchema: Schema<IStudentAccountRecord> = new Schema({

       

        studentName: { type: String, required: true },
        studentId: { type: String, required: true },
        studentRollNo: { type: String, required: true },
        class:  { type: Number, required: true },
        totalDues:  { type: Number, required: true },
        PendingDues: { type: Number, required: true },
        Submitted: { type: Number, required: true },
        finalFeePerMonth: { type: Number, required: true },
        admissionFee: { type: Number, required: true },
        schoolFee_HavingAcademy:{ type: Number, required: true },
        havingAcademy:  { type: Boolean, required: true },
        academyFee_HavingAcademy:{ type: Number, required: true },
        


        details: [{
                description:{ type: String, trim: true, default: "" },
                amount:{ type: Number, default: 0 },
                type:{ type: String, default: '' },
                currentDate:{ type: String, default: "" },
                }
            ],
});

//@ts-ignore
export = model<IStudentAccountRecord, IStudentAccountRecordModel>('studentsAccountRecord', studentAccountRecordSchema);
