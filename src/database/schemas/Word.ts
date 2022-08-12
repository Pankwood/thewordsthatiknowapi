import mongoose from "mongoose";

const Word = new mongoose.Schema(
    {
        wordName: {
            type: String,
            require: true,
            lowercase: true,
        },
        createAt: {
            type: Date,
            default: Date.now,
        }
    }
)

export default mongoose.model("Word", Word);