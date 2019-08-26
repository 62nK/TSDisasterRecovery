// Models
// Third Party
import { Document, Schema, Model, model} from "mongoose";
// Local
import { IMachineCode } from "../interfaces/machinecode";

export const MachineCodeSchema: Schema = new Schema({
    code: String,
    description: String,
    hourlyRent: Number,
    maxDailyHours: Number
});

export interface IMachineCodeModel extends IMachineCode, Document {}
export const MachineCode: Model<IMachineCodeModel> = model<IMachineCodeModel>("MachineCode", MachineCodeSchema);