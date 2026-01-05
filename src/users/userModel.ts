import mongoose from "mongoose";
import type { IUser } from "./userTypes.js";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        requiredd: true,
        minlength: [3, "Name minimum 3 character longer"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user",
        required:true,
    }
}, { timestamps: true });

//create model 
export default mongoose.model<IUser>('User', userSchema);