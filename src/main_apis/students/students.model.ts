import mongoose, { Schema, model } from "mongoose";
import { IStudentRecord,IStudentRecordModel  } from "./students.interface";

const studentSchema = new Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  gender: { type: String, required: true, default: "boy" },
  image: { type: String, default: null },
  hasAcademy: { type: Boolean, default: false },
  monthlyFee: { type: Number, required: true },
  admissionFee: { type: Number, required: true },
  academyFee: { type: Number, default: 0 },
  totalFee: { type: Number, required: true },
  rollNo: { type: String, unique: true }, // ✅ new field
  isDeleted: { type: Boolean, default: false },
  hasLeftSchool:{ type: Boolean, default: false },
},
  { timestamps: true } // ✅ this automatically adds createdAt & updatedAt
);


// Auto-generate roll number before saving
studentSchema.pre("save", async function (next) {
  if (!this.rollNo) {
    const prefix = this.class?.substring(0, 3).toUpperCase() || "STD";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.rollNo = `${prefix}-${randomNum}`;
  }
  next();
});

const parentSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  secondary_phone: { type: String },
  cnic: { type: String, required: true },
  address: { type: String },
  occupation: { type: String },
  isDeleted: { type: Boolean, default: false },
});

const studentRecordSchema = new Schema<IStudentRecord>(
  {
    parent: { type: parentSchema, required: true },
    students: { type: [studentSchema], required: true }
  },
  { timestamps: true } // timestamps for whole record too
);

export default model<IStudentRecord,IStudentRecordModel>("StudentRecord", studentRecordSchema);
