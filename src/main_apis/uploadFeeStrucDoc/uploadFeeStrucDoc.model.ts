import { Schema, model } from 'mongoose';
import { IFeeStructureDocument } from './uploadFeeStrucDoc.interface';


let imageSchema : Schema<IFeeStructureDocument> = new Schema({

        name: { type: String },
        fileEncrypt: { type: String },

    
});

//@ts-ignore
export = model<IFeeStructureDocument, IFeeStructureDocumentModel>('feeStructureDoc', imageSchema);



///////////////////////
