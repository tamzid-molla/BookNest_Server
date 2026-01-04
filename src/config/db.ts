import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('database connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.log('Canceled to database connection', err);
        });

        await mongoose.connect(config.mongoDb_uri as string);
    } catch (error) {
        console.log("Failed to connect database", error);
        process.exit(1)
    }
}

export default connectDB;