import {Document, Schema, Model, model} from "mongoose";
​
import { IJob } from "../interfaces/job";
​
export const JobSchema: Schema = new Schema ({
    jobCode : String,
    description : String,
    hourlyRate : Number,
    maxHoursPerDay: Number
});
​
export interface IJobModel extends IJob, Document {}
export const Job: Model<IJobModel> = model<IJobModel>("Job", JobSchema);