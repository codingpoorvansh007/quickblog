
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(
            process.env.MONGODB_URI,
            {
                dbName: "quickblog",
                maxPoolSize: 10
            }
        ).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB Connected");
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;
