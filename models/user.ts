// Models
// Third Party
import { Document, Schema, Model, model} from "mongoose";
// Local
import { IUser } from "../interfaces/user";

var userSchema: Schema = new Schema({
    username: String,
    password: String,
    role: Number // ADMIN=0/REGULAR_USER=1
});
userSchema.index({"username": 1 }, { unique: true});
export interface IUserModel extends IUser, Document {}
export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);