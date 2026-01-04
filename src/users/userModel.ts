import mongoose from "mongoose";
import type { IUser } from "./userTypes.js";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        require: true,
        minlength: [3, "Name minimum 3 character longer"]
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
}, { timestamps: true });

//create model 
export default mongoose.model<IUser>('User', userSchema);