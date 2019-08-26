// Models
// Third Party
import { Document, Schema, Model, model} from "mongoose";
// Local
import { IUser } from "../interfaces/user";

export const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    role: Number // ADMIN=0/REGULAR_USER=1
});

export interface IUserModel extends IUser, Document {}
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);