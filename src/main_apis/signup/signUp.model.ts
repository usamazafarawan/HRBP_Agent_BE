import { Schema, model } from 'mongoose';
import { ISignUp } from './signUp.interface';


let signUpSchema: Schema<ISignUp> = new Schema({

        name: { type: String, required: true },
        password: { type: String, required: true},
        email: { type: String, required: true},
        isSchoolAuthority: { type: Boolean, required: true , default:true},

    
});

//@ts-ignore
export = model<ISignUp, ISignUpModel>('users', signUpSchema);
