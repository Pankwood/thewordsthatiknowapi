import mongoose from "mongoose";

var currentDate = new Date();
const timeStampFromTheServer = new Date(Date.UTC(currentDate.getFullYear(),
    currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(),
    currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()));

const Word = new mongoose.Schema(
    {
        wordName: {
            type: String,
            require: true,
            lowercase: true,
            trim: true,
        },
        userId: {
            type: Number,
            require: true,
            trim: true,
        },
        languageId: {
            type: String,
            require: true,
            default: 'en',
        },
        createAt: {
            type: Date,
            default: timeStampFromTheServer,
        }
    }
)

export default mongoose.model("Word", Word);