import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: true,
        },
    }
)

export default mongoose.model("User", User);