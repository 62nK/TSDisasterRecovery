// Models
// Third Party
import { Document, Schema, Model, model} from "mongoose";
// Local
import { Ientry } from "../interfaces/entry";

export const EntrySchema: Schema = new Schema({
    code: String,
    hrsWorked: Number,
    total: Number,
    type: String 
});

export interface IEntryModel extends Ientry, Document {}
export const MachineCode: Model<IEntryModel> = model<IEntryModel>("Entry", EntrySchema);