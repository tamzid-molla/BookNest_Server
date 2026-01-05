import mongoose from "mongoose";
import type { IBook } from "./bookTypes.js";


const bookSchema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: [true, "Book title must be required"]
    },
    author: {
        type: String,
        required: [true, "Book author must be required"]
    },
    category: {
        type: String,
        required: [true, "Book category must be required"]
    },
    image: {
        type: String,
        required: [true, "Book image must be required"]
    },
    description: {
        type: String,
        required: [true, "Book description must be required"],
    },
    reviewCount: {
        type: Number,
        required: true,
        default: 0,
    },
    avgRating: {
        type: Number,
        required: true,
        default: 0,
    },
    addedBy: {
        name: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required:true
        }
    }
}, { timestamps: true });

//create book model 
export default mongoose.model<IBook>("Book", bookSchema);