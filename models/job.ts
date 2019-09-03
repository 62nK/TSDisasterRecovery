import {Document, Schema, Model, model} from "mongoose";
​
import { IJob } from "../interfaces/job";
​
export const JobSchema: Schema = new Schema ({
    code : String,
    description : String,
    hourlyRate : Number,
    maxDailyHours: Number
});
​
export interface IJobModel extends IJob, Document {}
export const Job: Model<IJobModel> = model("Job", JobSchema);