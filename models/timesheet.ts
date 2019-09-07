// Models
// Third Party
import { Document, Schema, Model, model, Types} from "mongoose";
// Local
import { ITCEntry } from "../interfaces/entry";
import { ITimesheet } from "../interfaces/timesheet";

export const TCEntrySchema: Schema = new Schema({
    code: String,
    hours: Number,
    total: Number,
    type: String,
});
export interface TCEntryModel extends ITCEntry, Document {}
export const TCEntry: Model<TCEntryModel> = model("Entry", TCEntrySchema);

export const TimeSheetSchema: Schema = new Schema({
    code: String,
    contractorName: String,
    date: Date,
    entries: [TCEntrySchema],
    approved: Boolean,
    hours: Number,
    total: Number,
});

export interface ITimesheetModel extends ITimesheet, Document {}
export const TimeSheet: Model<ITimesheetModel> = model("TimeSheet", TimeSheetSchema);