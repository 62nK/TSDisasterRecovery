// Models
// Third Party
import { Document, Schema, Model, model} from "mongoose";
// Local
import { ITimesheet } from "../interfaces/timesheet";

export const TimeSheetSchema: Schema = new Schema({

    siteCode: Number,
    contractorName: String,
    date: Date
});

export interface ITimesheetModel extends ITimesheet, Document {}
export const MachineCode: Model<ITimesheetModel> = model<ITimesheetModel>("TimeSheet", TimeSheetSchema);