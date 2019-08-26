// Models
// Third Party
import { Document, Schema, Model, model} from "mongoose";
// Local
import { IUser } from "../interfaces/user";

enum role{
    ADMIN,
    REGULAR_USER
}

export const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    role: role // ADMIN/REGULAR_USER
});

export interface IUserModel extends IUser, Document {}
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);