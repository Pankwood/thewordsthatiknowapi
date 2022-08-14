import mongoose from "mongoose";

const Language = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            require: true,
            lowercase: true,
            trim: true,
        },
        language: {
            type: String,
            unique: true,
            require: true,
            trim: true,
        }
    }
)

export default mongoose.model("Language", Language);